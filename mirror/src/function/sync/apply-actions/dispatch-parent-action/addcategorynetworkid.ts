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

import { AddCategoryNetworkIdAction } from '../../../../action/index.js'
import { maxNetworkIdsPerCategory } from '../../../../database/categorynetworkid.js'
import { Cache } from '../cache.js'
import { ApplyActionException } from '../exception/index.js'
import { MissingCategoryException } from '../exception/missing-item.js'

export async function dispatchAddCategoryNetworkId ({ action, cache }: {
  action: AddCategoryNetworkIdAction
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

  const count = await cache.transaction.legacy.database.categoryNetworkId.count({
    where: {
      familyId: cache.familyId,
      categoryId: action.categoryId
    },
    transaction: cache.transaction.legacy.transaction
  })

  if (count + 1 > maxNetworkIdsPerCategory) {
    throw new ApplyActionException({
      staticMessage: 'can not add a category network id because the category network limit reached'
    })
  }

  const hasOldItem = (await cache.transaction.legacy.database.categoryNetworkId.count({
    where: {
      familyId: cache.familyId,
      categoryId: action.categoryId,
      networkItemId: action.itemId
    },
    transaction: cache.transaction.legacy.transaction
  })) !== 0

  if (hasOldItem) {
    throw new ApplyActionException({
      staticMessage: 'can not add a category network id because the id is already used'
    })
  }

  await cache.transaction.legacy.database.categoryNetworkId.create({
    familyId: cache.familyId,
    categoryId: action.categoryId,
    networkItemId: action.itemId,
    hashedNetworkId: action.hashedNetworkId
  }, { transaction: cache.transaction.legacy.transaction })

  cache.categoriesWithModifiedBaseData.add(action.categoryId)
  cache.incrementTriggeredSyncLevel(2)
}
