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

import { CreateCategoryAction } from '../../../../action/index.js'
import { generateVersionId } from '../../../../util/token.js'
import { Cache } from '../cache.js'
import { MissingUserException } from '../exception/missing-item.js'
import { CanNotModifyOtherUsersBySelfLimitationException } from '../exception/self-limit.js'

export async function dispatchCreateCategory ({ action, cache, fromChildSelfLimitAddChildUserId }: {
  action: CreateCategoryAction
  cache: Cache
  fromChildSelfLimitAddChildUserId: string | null
}) {
  if (fromChildSelfLimitAddChildUserId !== null) {
    if (fromChildSelfLimitAddChildUserId !== action.childId) {
      throw new CanNotModifyOtherUsersBySelfLimitationException()
    }
  }

  // check that the child exists
  const childEntry = await cache.transaction.legacy.database.user.findOne({
    where: {
      familyId: cache.familyId,
      userId: action.childId,
      type: 'child'
    },
    transaction: cache.transaction.legacy.transaction
  })

  if (!childEntry) {
    throw new MissingUserException()
  }

  const oldMaxSort: number = await cache.transaction.legacy.database.category.max('sort', {
    transaction: cache.transaction.legacy.transaction,
    where: {
      familyId: cache.familyId,
      childId: action.childId
    }
  })

  // if there are no categories, then this is not a number
  const sort = Number.isSafeInteger(oldMaxSort + 1) ? (oldMaxSort + 1) : 0

  // no version number needs to be updated
  await cache.transaction.legacy.database.category.create({
    familyId: cache.familyId,
    categoryId: action.categoryId,
    childId: action.childId,
    title: action.title,
    blockedMinutesInWeek: '',
    temporarilyBlocked: false,
    temporarilyBlockedEndTime: '0',
    extraTimeInMillis: 0,
    extraTimeDay: -1,
    timeLimitRulesVersion: generateVersionId(),
    baseVersion: generateVersionId(),
    assignedAppsVersion: generateVersionId(),
    usedTimesVersion: generateVersionId(),
    parentCategoryId: '',
    blockAllNotifications: false,
    timeWarningFlags: 0,
    sort,
    disableLimitsUntil: '0',
    taskListVersion: generateVersionId(),
    minBatteryCharging: 0,
    minBatteryMobile: 0,
    flags: '0',
    blockNotificationDelay: '0'
  }, { transaction: cache.transaction.legacy.transaction })

  // update the cache
  cache.doesCategoryExist.cache.set(action.categoryId, true)
  cache.incrementTriggeredSyncLevel(1)
}
