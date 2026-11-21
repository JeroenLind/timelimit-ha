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

import { UpdateCategorySortingAction } from '../../../../action/index.js'
import { Cache } from '../cache.js'

export async function dispatchUpdateCategorySorting ({ action, cache }: {
  action: UpdateCategorySortingAction
  cache: Cache
}) {
  // no validation here:
  // - only parents can do it
  // - using it over categories which don't belong together destroys the sorting for both,
  //   but does not cause any trouble

  for (let i = 0; i < action.categoryIds.length; i++) {
    const categoryId = action.categoryIds[i]

    await cache.transaction.legacy.database.category.update({
      sort: i
    }, {
      transaction: cache.transaction.legacy.transaction,
      where: {
        familyId: cache.familyId,
        categoryId
      }
    })

    cache.categoriesWithModifiedBaseData.add(categoryId)
  }

  cache.incrementTriggeredSyncLevel(1)
}
