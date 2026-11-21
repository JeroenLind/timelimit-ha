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
import { SimpleDatabaseTransaction } from '../../../../database/simple/index.js'
import { ServerUpdatedCategoryUsedTimes } from '../../../../object/serverdatastatus.js'
import { MinuteOfDay } from '../../../../util/minuteofday.js'
import { FamilyEntry } from '../family-entry.js'
import { ServerCategoryVersions } from './diff.js'

export async function getUsedTimes ({
  transaction, categoryIdsToSyncUsedTimes, familyEntry,
  serverCategoriesVersions, clientLevel
}: {
  transaction: SimpleDatabaseTransaction
  categoryIdsToSyncUsedTimes: Array<string>
  familyEntry: FamilyEntry
  serverCategoriesVersions: ServerCategoryVersions
  clientLevel: number | null
}): Promise<Array<ServerUpdatedCategoryUsedTimes>> {
  const usedTimesForSyncing = (await transaction.legacy.database.usedTime.findAll({
    where: {
      familyId: familyEntry.familyId,
      categoryId: {
        [Sequelize.Op.in]: categoryIdsToSyncUsedTimes
      },
      ...(clientLevel === null || clientLevel < 2) ? {
        startMinuteOfDay: MinuteOfDay.MIN,
        endMinuteOfDay: MinuteOfDay.MAX
      } : {}
    },
    attributes: [
      'categoryId', 'dayOfEpoch', 'usedTime', 'startMinuteOfDay', 'endMinuteOfDay'
    ],
    transaction: transaction.legacy.transaction
  })).map((item) => ({
    categoryId: item.categoryId,
    dayOfEpoch: item.dayOfEpoch,
    usedTime: item.usedTime,
    startMinuteOfDay: item.startMinuteOfDay,
    endMinuteOfDay: item.endMinuteOfDay
  }))

  const sessionDurationsForSyncing = (await transaction.legacy.database.sessionDuration.findAll({
    where: {
      familyId: familyEntry.familyId,
      categoryId: {
        [Sequelize.Op.in]: categoryIdsToSyncUsedTimes
      }
    },
    attributes: [
      'categoryId',
      'maxSessionDuration',
      'sessionPauseDuration',
      'startMinuteOfDay',
      'endMinuteOfDay',
      'lastUsage',
      'lastSessionDuration'
    ],
    transaction: transaction.legacy.transaction
  })).map((item) => ({
    categoryId: item.categoryId,
    maxSessionDuration: item.maxSessionDuration,
    sessionPauseDuration: item.sessionPauseDuration,
    startMinuteOfDay: item.startMinuteOfDay,
    endMinuteOfDay: item.endMinuteOfDay,
    lastUsage: item.lastUsage,
    lastSessionDuration: item.lastSessionDuration
  }))

  const getCategoryUsedTimesVersion = (categoryId: string) => (
    serverCategoriesVersions.requireByCategoryId(categoryId).usedTimesVersion
  )

  return categoryIdsToSyncUsedTimes.map((categoryId): ServerUpdatedCategoryUsedTimes => ({
    categoryId,
    times: usedTimesForSyncing.filter((item) => item.categoryId === categoryId).map((item) => ({
      day: item.dayOfEpoch,
      time: item.usedTime,
      start: item.startMinuteOfDay,
      end: item.endMinuteOfDay
    })),
    sessionDurations: sessionDurationsForSyncing.filter((item) => item.categoryId === categoryId).map((item) => ({
      md: item.maxSessionDuration,
      spd: item.sessionPauseDuration,
      sm: item.startMinuteOfDay,
      em: item.endMinuteOfDay,
      l: parseInt(item.lastUsage, 10),
      d: item.lastSessionDuration
    })),
    version: getCategoryUsedTimesVersion(categoryId)
  }))
}
