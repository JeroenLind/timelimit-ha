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

import { IncrementCategoryExtraTimeAction } from '../../../../action/index.js'
import { CategoryModel } from '../../../../database/category.js'
import { Cache } from '../cache.js'
import { MissingCategoryException } from '../exception/missing-item.js'
import { PremiumVersionMissingException } from '../exception/premium.js'

export async function dispatchIncrementCategoryExtraTime ({ action, cache }: {
  action: IncrementCategoryExtraTimeAction
  cache: Cache
}) {
  if (!cache.hasFullVersion) {
    throw new PremiumVersionMissingException()
  }

  async function handleCategory (category: CategoryModel) {
    if (action.day === category.extraTimeDay || category.extraTimeDay === -1) {
      category.extraTimeInMillis += action.addedExtraTime
    } else {
      category.extraTimeInMillis = action.addedExtraTime
    }

    category.extraTimeDay = action.day

    await category.save({ transaction: cache.transaction.legacy.transaction })

    cache.categoriesWithModifiedBaseData.add(category.categoryId)
    cache.incrementTriggeredSyncLevel(2)
  }

  const categoryEntry = await cache.transaction.legacy.database.category.findOne({
    where: {
      familyId: cache.familyId,
      categoryId: action.categoryId
    },
    transaction: cache.transaction.legacy.transaction
  })

  if (!categoryEntry) {
    throw new MissingCategoryException()
  }

  await handleCategory(categoryEntry)

  if (categoryEntry.parentCategoryId !== '') {
    const parentCategoryEntry = await cache.transaction.legacy.database.category.findOne({
      where: {
        familyId: cache.familyId,
        categoryId: categoryEntry.parentCategoryId
      },
      transaction: cache.transaction.legacy.transaction
    })

    if (parentCategoryEntry) {
      await handleCategory(parentCategoryEntry)
    }
  }
}
