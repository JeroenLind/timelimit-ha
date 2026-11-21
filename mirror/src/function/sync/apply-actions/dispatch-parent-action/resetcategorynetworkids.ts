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

import { ResetCategoryNetworkIdsAction } from '../../../../action/index.js'
import { Cache } from '../cache.js'
import { MissingCategoryException } from '../exception/missing-item.js'

export async function dispatchResetCategoryNetworkIds ({ action, cache }: {
  action: ResetCategoryNetworkIdsAction
  cache: Cache
}) {
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

  await cache.transaction.legacy.database.categoryNetworkId.destroy({
    where: {
      familyId: cache.familyId,
      categoryId: action.categoryId
    },
    transaction: cache.transaction.legacy.transaction
  })

  cache.categoriesWithModifiedBaseData.add(action.categoryId)
  cache.incrementTriggeredSyncLevel(2)
}
