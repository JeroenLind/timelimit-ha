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

import { UpdateCategoryDisableLimitsAction } from '../../../../action/index.js'
import { Cache } from '../cache.js'
import { MissingCategoryException } from '../exception/missing-item.js'
import { PremiumVersionMissingException } from '../exception/premium.js'
import { CanNotModifyOtherUsersBySelfLimitationException, SelfLimitationException } from '../exception/self-limit.js'

export async function dispatchUpdateCategoryDisableLimits ({ action, cache, fromChildSelfLimitAddChildUserId }: {
  action: UpdateCategoryDisableLimitsAction
  cache: Cache
  fromChildSelfLimitAddChildUserId: string | null
}) {
  if (action.endTime !== 0) {
    if (!cache.hasFullVersion) {
      throw new PremiumVersionMissingException()
    }

    if (fromChildSelfLimitAddChildUserId !== null) {
      throw new SelfLimitationException({ staticMessage: 'the child may only disable the disabling of the limitations' })
    }
  }

  const categoryEntryUnsafe = await cache.transaction.legacy.database.category.findOne({
    where: {
      familyId: cache.familyId,
      categoryId: action.categoryId
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

  if (fromChildSelfLimitAddChildUserId !== null) {
    if (fromChildSelfLimitAddChildUserId !== categoryEntry.childId) {
      throw new CanNotModifyOtherUsersBySelfLimitationException()
    }
  }

  const [affectedRows] = await cache.transaction.legacy.database.category.update({
    disableLimitsUntil: action.endTime.toString(10)
  }, {
    where: {
      familyId: cache.familyId,
      categoryId: action.categoryId
    },
    transaction: cache.transaction.legacy.transaction
  })

  if (affectedRows !== 0) {
    cache.categoriesWithModifiedBaseData.add(action.categoryId)
    cache.incrementTriggeredSyncLevel(2)
  }
}
