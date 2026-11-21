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

import { UpdateCategoryTemporarilyBlockedAction } from '../../../../action/index.js'
import { Cache } from '../cache.js'
import { MissingCategoryException } from '../exception/missing-item.js'
import { PremiumVersionMissingException } from '../exception/premium.js'
import { CanNotModifyOtherUsersBySelfLimitationException, SelfLimitationException } from '../exception/self-limit.js'

export async function dispatchUpdateCategoryTemporarilyBlocked ({ action, cache, fromChildSelfLimitAddChildUserId }: {
  action: UpdateCategoryTemporarilyBlockedAction
  cache: Cache
  fromChildSelfLimitAddChildUserId: string | null
}) {
  if (action.blocked === true) {
    if (!cache.hasFullVersion) {
      throw new PremiumVersionMissingException()
    }
  }

  const categoryEntryUnsafe = await cache.transaction.legacy.database.category.findOne({
    where: {
      familyId: cache.familyId,
      categoryId: action.categoryId
    },
    transaction: cache.transaction.legacy.transaction,
    attributes: ['childId', 'temporarilyBlocked', 'temporarilyBlockedEndTime']
  })

  if (!categoryEntryUnsafe) {
    throw new MissingCategoryException()
  }

  const categoryEntry = {
    childId: categoryEntryUnsafe.childId,
    temporarilyBlocked: categoryEntryUnsafe.temporarilyBlocked,
    temporarilyBlockedEndTime: parseInt(categoryEntryUnsafe.temporarilyBlockedEndTime, 10)
  }

  if (fromChildSelfLimitAddChildUserId !== null) {
    if (fromChildSelfLimitAddChildUserId !== categoryEntry.childId) {
      throw new CanNotModifyOtherUsersBySelfLimitationException()
    }

    if (action.endTime === undefined || !action.blocked) {
      throw new SelfLimitationException({ staticMessage: 'the child may only enable a temporarily blocking' })
    }

    if (categoryEntry.temporarilyBlocked) {
      if (action.endTime < categoryEntry.temporarilyBlockedEndTime || categoryEntry.temporarilyBlockedEndTime === 0) {
        throw new SelfLimitationException({ staticMessage: 'the child may not reduce the temporarily blocking' })
      }
    }
  }

  const [affectedRows] = await cache.transaction.legacy.database.category.update({
    temporarilyBlocked: action.blocked,
    temporarilyBlockedEndTime: action.blocked ? (action.endTime ?? 0).toString(10) : '0'
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
