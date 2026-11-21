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

import { UpdateChildTaskAction } from '../../../../action/index.js'
import { Cache } from '../cache.js'
import { IllegalStateException } from '../exception/illegal-state.js'
import { MissingCategoryException, MissingTaskException } from '../exception/missing-item.js'

export async function dispatchUpdateChildTaskAction ({ action, cache }: {
  action: UpdateChildTaskAction
  cache: Cache
}) {
  const categoryInfoUnsafe = await cache.transaction.legacy.database.category.findOne({
    where: {
      familyId: cache.familyId,
      categoryId: action.categoryId
    },
    attributes: ['childId'],
    transaction: cache.transaction.legacy.transaction
  })

  if (categoryInfoUnsafe === null) throw new MissingCategoryException()

  const taskInfo = await cache.transaction.legacy.database.childTask.findOne({
    where: {
      familyId: cache.familyId,
      taskId: action.taskId
    },
    transaction: cache.transaction.legacy.transaction
  })

  const notFound = taskInfo === null

  if (notFound !== action.isNew) {
    if (action.isNew) {
      throw new IllegalStateException({
        staticMessage: 'can not create task which exists already'
      })
    } else {
      throw new MissingTaskException()
    }
  }

  if (taskInfo === null) {
    await cache.transaction.legacy.database.childTask.create({
      familyId: cache.familyId,
      taskId: action.taskId,
      categoryId: action.categoryId,
      taskTitle: action.taskTitle,
      extraTimeDuration: action.extraTimeDuration,
      pendingRequest: 0,
      lastGrantTimestamp: '0'
    }, {
      transaction: cache.transaction.legacy.transaction
    })

    cache.categoriesWithModifiedTasks.add(action.categoryId)
  } else {
    await cache.transaction.legacy.database.childTask.update({
      taskTitle: action.taskTitle,
      categoryId: action.categoryId,
      extraTimeDuration: action.extraTimeDuration
    }, {
      where: {
        familyId: cache.familyId,
        taskId: action.taskId
      },
      transaction: cache.transaction.legacy.transaction
    })

    cache.categoriesWithModifiedTasks.add(taskInfo.categoryId)
    cache.categoriesWithModifiedTasks.add(action.categoryId)
    cache.incrementTriggeredSyncLevel(1)
  }
}
