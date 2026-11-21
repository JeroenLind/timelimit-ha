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

import { SetParentCategoryAction } from '../../../../action/index.js'
import { getCategoryWithParentCategories, GetParentCategoriesException } from '../../../../util/category.js'
import { Cache } from '../cache.js'
import { ApplyActionException } from '../exception/index.js'
import { MissingCategoryException } from '../exception/missing-item.js'
import { CanNotModifyOtherUsersBySelfLimitationException, SelfLimitationException } from '../exception/self-limit.js'

export async function dispatchSetParentCategory ({ action, cache, fromChildSelfLimitAddChildUserId }: {
  action: SetParentCategoryAction
  cache: Cache
  fromChildSelfLimitAddChildUserId: string | null
}) {
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

  if (fromChildSelfLimitAddChildUserId !== null) {
    if (categoryEntry.childId !== fromChildSelfLimitAddChildUserId) {
      throw new CanNotModifyOtherUsersBySelfLimitationException()
    }
  }

  if (action.parentCategory !== '') {
    const categoriesByUserId = (await cache.transaction.legacy.database.category.findAll({
      where: {
        familyId: cache.familyId,
        childId: categoryEntry.childId
      },
      attributes: ['categoryId', 'parentCategoryId'],
      transaction: cache.transaction.legacy.transaction
    })).map((item) => ({
      categoryId: item.categoryId,
      parentCategoryId: item.parentCategoryId
    }))

    if (categoriesByUserId.find((item) => item.categoryId === action.parentCategory) === undefined) {
      throw new MissingCategoryException()
    }

    const childCategoryIds = new Set<string>()

    {
      const processedCategoryIds = new Set<string>()

      const handle = (currentCategoryId: string) => {
        if (processedCategoryIds.has(currentCategoryId)) return
        processedCategoryIds.add(currentCategoryId)

        const childCategories = categoriesByUserId.filter((item) => item.parentCategoryId === currentCategoryId)

        childCategories.forEach((childCategory) => {
          childCategoryIds.add(childCategory.categoryId)
          handle(childCategory.categoryId)
        })
      }

      handle(action.categoryId)
    }

    if (childCategoryIds.has(action.parentCategory) || action.parentCategory === action.categoryId) {
      throw new ApplyActionException({
        staticMessage: 'can not set a category as parent which is a child of the category'
      })
    }

    if (fromChildSelfLimitAddChildUserId !== null) {
      try {
        const ownParentCategory = categoriesByUserId.find((item) => item.categoryId === categoryEntry.parentCategoryId)
        const enableDueToLimitAddingWhenChild = ownParentCategory === undefined ||
          getCategoryWithParentCategories(categoriesByUserId, action.parentCategory).indexOf(ownParentCategory.categoryId) !== -1

        if (!enableDueToLimitAddingWhenChild) {
          throw new SelfLimitationException({
            staticMessage: 'can not change parent categories in a way which reduces limits'
          })
        }
      } catch (ex) {
        if (ex instanceof GetParentCategoriesException) {
          throw new MissingCategoryException()
        } else throw ex
      }
    }
  }

  await cache.transaction.legacy.database.category.update({
    parentCategoryId: action.parentCategory
  }, {
    where: {
      familyId: cache.familyId,
      categoryId: action.categoryId
    },
    transaction: cache.transaction.legacy.transaction
  })

  cache.categoriesWithModifiedBaseData.add(action.categoryId)
  cache.incrementTriggeredSyncLevel(2)
}
