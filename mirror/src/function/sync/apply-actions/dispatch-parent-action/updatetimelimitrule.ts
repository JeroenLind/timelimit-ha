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

import { UpdateTimelimitRuleAction } from '../../../../action/index.js'
import { Cache } from '../cache.js'
import { MissingRuleException, MissingCategoryException } from '../exception/missing-item.js'
import {
  CanNotModifyOtherUsersBySelfLimitationException, CanNotRelaxRestrictionsSelfLimitException
} from '../exception/self-limit.js'

export async function dispatchUpdateTimelimitRule ({
  action, cache, fromChildSelfLimitAddChildUserId
}: {
  action: UpdateTimelimitRuleAction
  cache: Cache
  fromChildSelfLimitAddChildUserId: string | null
}) {
  const ruleEntry = await cache.transaction.legacy.database.timelimitRule.findOne({
    where: {
      familyId: cache.familyId,
      ruleId: action.ruleId
    },
    transaction: cache.transaction.legacy.transaction
  })

  if (!ruleEntry) {
    throw new MissingRuleException()
  }

  if (fromChildSelfLimitAddChildUserId != null) {
    const categoryEntryUnsafe = await cache.transaction.legacy.database.category.findOne({
      where: {
        familyId: cache.familyId,
        categoryId: ruleEntry.categoryId
      },
      transaction: cache.transaction.legacy.transaction,
      attributes: ['childId']
    })

    if (!categoryEntryUnsafe) {
      throw new MissingCategoryException()
    }

    const categoryEntry = {
      childId: categoryEntryUnsafe.childId
    }


    if (fromChildSelfLimitAddChildUserId !== categoryEntry.childId) {
      throw new CanNotModifyOtherUsersBySelfLimitationException()
    }

    const wasSessionDurationLimitationEnabled =
      ruleEntry.sessionPauseMilliseconds > 0 && ruleEntry.sessionDurationMilliseconds > 0

    const isSessionDurationLimitationEnabled =
      action.sessionPauseMilliseconds > 0 && action.sessionDurationMilliseconds > 0

    const countOldAffectedDays = Array(7)
      .fill(0)
      .reduce((sum, _, index) => sum + ((ruleEntry.dayMaskAsBitmask >> index) & 1), 0)

    const isAtLeastAsStrictAsPreviously =
      action.maximumTimeInMillis <= ruleEntry.maximumTimeInMillis &&
      (action.dayMask & ruleEntry.dayMaskAsBitmask) === ruleEntry.dayMaskAsBitmask &&
      (action.applyToExtraTimeUsage || !ruleEntry.applyToExtraTimeUsage) &&
      action.start <= ruleEntry.startMinuteOfDay &&
      action.end >= ruleEntry.endMinuteOfDay &&
      (!wasSessionDurationLimitationEnabled || (
          isSessionDurationLimitationEnabled &&
          action.sessionDurationMilliseconds <= ruleEntry.sessionDurationMilliseconds &&
          action.sessionPauseMilliseconds >= ruleEntry.sessionPauseMilliseconds
      )) &&
      (!action.perDay || ruleEntry.perDay || countOldAffectedDays <= 1) &&
      (action.expiresAt === undefined || (ruleEntry.expiresAt !== null && action.expiresAt >= parseInt(ruleEntry.expiresAt, 10)))

    if (!isAtLeastAsStrictAsPreviously) {
      throw new CanNotRelaxRestrictionsSelfLimitException()
    }
  }

  ruleEntry.applyToExtraTimeUsage = action.applyToExtraTimeUsage
  ruleEntry.dayMaskAsBitmask = action.dayMask
  ruleEntry.maximumTimeInMillis = action.maximumTimeInMillis
  ruleEntry.startMinuteOfDay = action.start
  ruleEntry.endMinuteOfDay = action.end
  ruleEntry.sessionDurationMilliseconds = action.sessionDurationMilliseconds
  ruleEntry.sessionPauseMilliseconds = action.sessionPauseMilliseconds
  ruleEntry.perDay = action.perDay ? 1 : 0
  ruleEntry.expiresAt = action.expiresAt ? action.expiresAt.toString() : null

  await ruleEntry.save({ transaction: cache.transaction.legacy.transaction })

  cache.categoriesWithModifiedTimeLimitRules.add(ruleEntry.categoryId)
  cache.incrementTriggeredSyncLevel(2)
}
