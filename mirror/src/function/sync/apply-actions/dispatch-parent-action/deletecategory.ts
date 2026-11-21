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

import { DeleteCategoryAction } from '../../../../action/index.js'
import { Cache } from '../cache.js'
import { MissingCategoryException } from '../exception/missing-item.js'

export async function dispatchDeleteCategory ({ action, cache }: {
  action: DeleteCategoryAction
  cache: Cache
}) {
  const { familyId } = cache
  const { categoryId } = action

  const categoryEntry = await cache.transaction.legacy.database.category.findOne({
    where: {
      familyId,
      categoryId
    },
    transaction: cache.transaction.legacy.transaction
  })

  if (!categoryEntry) { throw new MissingCategoryException() }

  await cache.transaction.legacy.database.timelimitRule.destroy({
    where: {
      familyId,
      categoryId
    },
    transaction: cache.transaction.legacy.transaction
  })

  await cache.transaction.legacy.database.usedTime.destroy({
    where: {
      familyId,
      categoryId
    },
    transaction: cache.transaction.legacy.transaction
  })

  await cache.transaction.legacy.database.categoryApp.destroy({
    where: {
      familyId,
      categoryId
    },
    transaction: cache.transaction.legacy.transaction
  })

  const [affectedUserRows] = await cache.transaction.legacy.database.user.update({
    categoryForNotAssignedApps: ''
  }, {
    where: {
      familyId,
      categoryForNotAssignedApps: categoryId
    },
    transaction: cache.transaction.legacy.transaction
  })

  await cache.transaction.legacy.database.category.destroy({
    where: {
      familyId,
      categoryId
    },
    transaction: cache.transaction.legacy.transaction
  })

  // update the cache
  cache.doesCategoryExist.cache.set(action.categoryId, false)
  cache.incrementTriggeredSyncLevel(2)

  if (affectedUserRows !== 0) {
    cache.invalidiateUserList = true
  }

  // no version number needs to be updated
}
