/*
 * server component for the TimeLimit App
 * Copyright (C) 2019 - 2026 Jonas Lochmann
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, version 3 of the License.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import * as Sequelize from 'sequelize'
import { AddUsedTimeActionVersion2 } from '../../../../action/index.js'
import { EventHandler } from '../../../../monitoring/eventhandler.js'
import { MinuteOfDay } from '../../../../util/minuteofday.js'
import { Cache } from '../cache.js'
import { IllegalStateException, SourceDeviceNotFoundException } from '../exception/illegal-state.js'
import { getRoundedTimestamp as getRoundedTimestampForUsedTime } from './addusedtime.js'

const tolerance = 5 * 1000  // 5 seconds

export const getRoundedTimestampForSessionDuration = () => {
  const now = Date.now()

  return now - (now % (1000 * 60 * 60 * 12 /* 12 hours */))
}

export async function dispatchAddUsedTimeVersion2 ({ deviceId, action, cache, eventHandler }: {
  deviceId: string
  action: AddUsedTimeActionVersion2
  cache: Cache
  eventHandler: EventHandler
}) {
  const deviceEntryUnsafe = await cache.transaction.legacy.database.device.findOne({
    where: {
      familyId: cache.familyId,
      deviceId: deviceId
    },
    attributes: ['currentUserId'],
    transaction: cache.transaction.legacy.transaction
  })

  if (!deviceEntryUnsafe) {
    throw new SourceDeviceNotFoundException()
  }

  const deviceEntry = {
    currentUserId: deviceEntryUnsafe.currentUserId
  }

  const roundedTimestampForUsedTime = getRoundedTimestampForUsedTime().toString(10)
  const roundedTimestampForSessionDuration = getRoundedTimestampForSessionDuration().toString(10)

  let addUsedTimeForADifferentUserThanTheCurrentUserOfTheDevice = false

  for (const item of action.items) {
    const categoryEntryUnsafe = await cache.transaction.legacy.database.category.findOne({
      where: {
        familyId: cache.familyId,
        categoryId: item.categoryId
      },
      transaction: cache.transaction.legacy.transaction,
      attributes: [
        'childId',
        'extraTimeInMillis'
      ]
    })

    // verify that the category exists
    if (!categoryEntryUnsafe) {
      eventHandler.countEvent('add used time category to add time for not found')
      cache.requireSenderFullSync()

      continue
    }

    const categoryEntry = {
      childId: categoryEntryUnsafe.childId,
      extraTimeInMillis: categoryEntryUnsafe.extraTimeInMillis
    }

    if (categoryEntry.childId !== deviceEntry.currentUserId) {
      addUsedTimeForADifferentUserThanTheCurrentUserOfTheDevice = true
    }

    async function handle (start: number, end: number) {
      const lengthInMinutes = (end - start) + 1
      const lengthInMs = lengthInMinutes * 1000 * 60

      const oldItem = await cache.transaction.legacy.database.usedTime.findOne({
        where: {
          familyId: cache.familyId,
          categoryId: item.categoryId,
          dayOfEpoch: action.dayOfEpoch,
          startMinuteOfDay: start,
          endMinuteOfDay: end
        },
        transaction: cache.transaction.legacy.transaction
      })

      if (oldItem) {
        const oldUsedTime = oldItem.usedTime
        const newUsedTime = Math.max(0, Math.min(oldUsedTime + item.timeToAdd, lengthInMs))

        const oldLastUpdate = parseInt(oldItem.lastUpdate, 10)
        const newLastUpdate = parseInt(roundedTimestampForUsedTime, 10)

        if (oldUsedTime !== newUsedTime || oldLastUpdate !== newLastUpdate) {
          const [updatedRows] = await cache.transaction.legacy.database.usedTime.update({
            usedTime: newUsedTime,
            lastUpdate: newLastUpdate.toString(10)
          }, {
            where: {
              familyId: cache.familyId,
              categoryId: item.categoryId,
              dayOfEpoch: action.dayOfEpoch,
              startMinuteOfDay: start,
              endMinuteOfDay: end
            },
            transaction: cache.transaction.legacy.transaction
          })

          if (updatedRows === 0) {
            throw new IllegalStateException({ staticMessage: 'could not update fetched row' })
          }
        }
      } else {
        const oldTime: number | null = await cache.transaction.legacy.database.usedTime.aggregate(
          'usedTime',
          'MAX',
          {
            where: {
              familyId: cache.familyId,
              categoryId: item.categoryId,
              dayOfEpoch: action.dayOfEpoch,
              startMinuteOfDay: {
                [Sequelize.Op.gte]: start
              },
              endMinuteOfDay: {
                [Sequelize.Op.lte]: end
              }
            },
            transaction: cache.transaction.legacy.transaction
          }
        ) || 0

        if (oldTime !== null && typeof oldTime !== 'number') throw new Error()

        await cache.transaction.legacy.database.usedTime.create({
          familyId: cache.familyId,
          categoryId: item.categoryId,
          dayOfEpoch: action.dayOfEpoch,
          usedTime: Math.max(0, Math.min(oldTime + item.timeToAdd, lengthInMs)),
          lastUpdate: roundedTimestampForUsedTime,
          startMinuteOfDay: start,
          endMinuteOfDay: end
        }, {
          transaction: cache.transaction.legacy.transaction
        })
      }
    }

    await handle(MinuteOfDay.MIN, MinuteOfDay.MAX)

    for (let j = 0; j < item.additionalCountingSlots.length; j++) {
      const slot = item.additionalCountingSlots[j]

      await handle(slot.start, slot.end)
    }

    const hasTrustedTimestamp = action.trustedTimestamp !== 0

    for (let j = 0; j < item.sessionDurationLimits.length; j++) {
      const limit = item.sessionDurationLimits[j]

      const oldItem = await cache.transaction.legacy.database.sessionDuration.findOne({
        where: {
          familyId: cache.familyId,
          categoryId: item.categoryId,
          maxSessionDuration: limit.duration,
          sessionPauseDuration: limit.pause,
          startMinuteOfDay: limit.start,
          endMinuteOfDay: limit.end
        },
        transaction: cache.transaction.legacy.transaction
      })

      const oldDuration: () => Promise<number> = async () => {
        const fittingDurationItems = await cache.transaction.legacy.database.sessionDuration.findAll({
          where: {
            familyId: cache.familyId,
            categoryId: item.categoryId,
            startMinuteOfDay: {
              [Sequelize.Op.gte]: limit.start
            },
            endMinuteOfDay: {
              [Sequelize.Op.lte]: limit.end
            },
            maxSessionDuration: {
              [Sequelize.Op.gte]: limit.duration
            },
            sessionPauseDuration: {
              [Sequelize.Op.lte]: limit.pause
            }
          },
          transaction: cache.transaction.legacy.transaction
        })

        const fittingDurationItemsLastUsageFiltered =
          hasTrustedTimestamp ?
          fittingDurationItems.filter((it) => (
            action.trustedTimestamp - item.timeToAdd <=
            parseInt(it.lastUsage, 10) + it.sessionPauseDuration - tolerance
          )) : fittingDurationItems

        return fittingDurationItemsLastUsageFiltered
          .map((it) => it.lastSessionDuration)
          .reduce((a, b) => Math.max(a, b), 0)
      }

      if (oldItem) {
        let extendSession: boolean

        if (!hasTrustedTimestamp) {
          extendSession = true
        } else {
          /*
           * Why the tolerance?
           *
           * The main loop is executed in some interval and it assumes
           * at the end of the interval that the same application was used during
           * the previous phase.
           *
           * Now, if the session duration limit ends during this phase and the application is
           * launched again, then it extends the session (because it is assumed to be running
           * before the session ended) and blocks again.
           *
           * Due to this, a session is reset if it would be over in a few seconds, too.
           */

          const timeWhenStartingCurrentUsage = action.trustedTimestamp - item.timeToAdd
          const nextSessionStart = parseInt(oldItem.lastUsage, 10) + oldItem.sessionPauseDuration - tolerance

          extendSession = timeWhenStartingCurrentUsage <= nextSessionStart
        }

        oldItem.lastSessionDuration = extendSession ? oldItem.lastSessionDuration + item.timeToAdd : await oldDuration() + item.timeToAdd
        oldItem.roundedLastUpdate = roundedTimestampForSessionDuration

        if (hasTrustedTimestamp) {
          if (parseInt(oldItem.lastUsage, 10) < action.trustedTimestamp) {
            oldItem.lastUsage = action.trustedTimestamp.toString(10)
          }
        }

        await oldItem.save({ transaction: cache.transaction.legacy.transaction })
      } else {
        await cache.transaction.legacy.database.sessionDuration.create({
          familyId: cache.familyId,
          categoryId: item.categoryId,
          maxSessionDuration: limit.duration,
          sessionPauseDuration: limit.pause,
          startMinuteOfDay: limit.start,
          endMinuteOfDay: limit.end,
          // end of primary key
          lastUsage: action.trustedTimestamp.toString(10),
          lastSessionDuration: await oldDuration() + item.timeToAdd,
          roundedLastUpdate: roundedTimestampForSessionDuration
        }, { transaction: cache.transaction.legacy.transaction })
      }
    }

    cache.categoriesWithModifiedUsedTimes.add(item.categoryId)

    if (item.extraTimeToSubtract !== 0) {
      await cache.transaction.legacy.database.category.update({
        extraTimeInMillis: Math.max(0, categoryEntry.extraTimeInMillis - item.extraTimeToSubtract)
      }, {
        where: {
          familyId: cache.familyId,
          categoryId: item.categoryId
        },
        transaction: cache.transaction.legacy.transaction
      })

      cache.categoriesWithModifiedBaseData.add(item.categoryId)
    }

    if (addUsedTimeForADifferentUserThanTheCurrentUserOfTheDevice) {
      // there are two possible causes for this:
      // - a device user was changed remotely while it was used by this user for
      //   limited Apps (rarely)
      // - a parent added time manually (rarely)
      //
      // For the second case, it's important to sync this change.
      // As it should occur not too often, a full sync should be no problem.
      // To keep an eye on it, it is counted.

      cache.incrementTriggeredSyncLevel(2)

      eventHandler.countEvent('add used time for a different user than the current user of the device')
    }
  }

  cache.incrementTriggeredSyncLevel(1)
}
