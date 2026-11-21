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

import * as Sequelize from 'sequelize'
import { RemoveCategoryAppsAction } from '../../../../action/index.js'
import { Cache } from '../cache.js'
import { MissingItemException } from '../exception/missing-item.js'

export async function dispatchRemoveCategoryApps ({ action, cache }: {
  action: RemoveCategoryAppsAction
  cache: Cache
}) {
  const affectedRows = await cache.transaction.legacy.database.categoryApp.destroy({
    where: {
      familyId: cache.familyId,
      categoryId: action.categoryId,
      packageName: {
        [Sequelize.Op.in]: action.packageNames
      }
    },
    transaction: cache.transaction.legacy.transaction
  })

  if (affectedRows !== action.packageNames.length) {
    throw new MissingItemException({
      staticMessage: 'could not remove all requested category app items'
    })
  }

  cache.categoriesWithModifiedApps.add(action.categoryId)
  cache.incrementTriggeredSyncLevel(2)
}
