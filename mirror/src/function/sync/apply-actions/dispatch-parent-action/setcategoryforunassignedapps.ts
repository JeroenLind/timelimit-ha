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

import { SetCategoryForUnassignedAppsAction } from '../../../../action/index.js'
import { Cache } from '../cache.js'
import { ApplyActionException } from '../exception/index.js'
import { MissingUserException } from '../exception/missing-item.js'

export async function dispatchSetCategoryForUnassignedApps ({ action, cache }: {
  action: SetCategoryForUnassignedAppsAction
  cache: Cache
}) {
  const oldUserEntry = await cache.transaction.legacy.database.user.findOne({
    where: {
      familyId: cache.familyId,
      userId: action.childId,
      type: 'child'
    },
    transaction: cache.transaction.legacy.transaction
  })

  if (!oldUserEntry) {
    throw new MissingUserException()
  }

  if (action.categoryId === '') {
    // nothing to check
  } else {
    const categoryEntryUnsafe = await cache.transaction.legacy.database.category.findOne({
      attributes: ['childId'],
      where: {
        familyId: cache.familyId,
        categoryId: action.categoryId
      },
      transaction: cache.transaction.legacy.transaction
    })

    if (!categoryEntryUnsafe) {
      throw new ApplyActionException({
        staticMessage: 'can not set a category which does not exist as category for unassigned apps'
      })
    }

    const categoryEntry = {
      childId: categoryEntryUnsafe.childId
    }

    if (categoryEntry.childId !== action.childId) {
      throw new ApplyActionException({
        staticMessage: 'can not set a category of one child as category for unassigned apps for an other child'
      })
    }
  }

  await cache.transaction.legacy.database.user.update({
    categoryForNotAssignedApps: action.categoryId
  }, {
    where: {
      familyId: cache.familyId,
      userId: action.childId,
      type: 'child'
    },
    transaction: cache.transaction.legacy.transaction
  })

  cache.invalidiateUserList = true
  cache.incrementTriggeredSyncLevel(2)
}
