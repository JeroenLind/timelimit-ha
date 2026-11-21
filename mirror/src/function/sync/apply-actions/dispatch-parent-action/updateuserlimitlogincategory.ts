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

import { UpdateUserLimitLoginCategory } from '../../../../action/index.js'
import { Cache } from '../cache.js'
import { ApplyActionException } from '../exception/index.js'
import { MissingCategoryException, MissingUserException } from '../exception/missing-item.js'

export async function dispatchUpdateUserLimitLoginCategoryAction ({ action, cache, parentUserId }: {
  action: UpdateUserLimitLoginCategory
  cache: Cache
  parentUserId: string
}) {
  const userEntry = await cache.transaction.legacy.database.user.findOne({
    where: {
      familyId: cache.familyId,
      userId: action.userId,
      type: 'parent'
    },
    transaction: cache.transaction.legacy.transaction
  })

  if (!userEntry) {
    throw new MissingUserException()
  }

  if (action.categoryId !== undefined && parentUserId !== action.userId) {
    throw new ApplyActionException({
      staticMessage: 'only the parent user itself can add a limit login category'
    })
  }

  await cache.transaction.legacy.database.userLimitLoginCategory.destroy({
    where: {
      familyId: cache.familyId,
      userId: action.userId
    },
    transaction: cache.transaction.legacy.transaction
  })

  if (action.categoryId !== undefined) {
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

    await cache.transaction.legacy.database.userLimitLoginCategory.create({
      familyId: cache.familyId,
      userId: action.userId,
      categoryId: action.categoryId,
      preBlockDuration: 0
    }, {
      transaction: cache.transaction.legacy.transaction
    })
  }

  cache.invalidiateUserList = true
  cache.incrementTriggeredSyncLevel(2)
}
