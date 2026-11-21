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

import { MarkTaskPendingAction } from '../../../../action/index.js'
import { sendTaskDoneMails } from '../../../warningmail/taskdone.js'
import { Cache } from '../cache.js'
import { IllegalStateException, SourceDeviceNotFoundException, SourceUserNotFoundException } from '../exception/illegal-state.js'
import { MissingTaskException } from '../exception/missing-item.js'

export async function dispatchMarkTaskPendingAction ({ action, cache, deviceId }: {
  deviceId: string
  action: MarkTaskPendingAction
  cache: Cache
}) {
  const taskInfoUnsafe = await cache.transaction.legacy.database.childTask.findOne({
    where: {
      familyId: cache.familyId,
      taskId: action.taskId
    },
    transaction: cache.transaction.legacy.transaction,
    attributes: ['categoryId', 'pendingRequest', 'taskTitle']
  })

  if (taskInfoUnsafe === null) throw new MissingTaskException()

  const taskInfo = {
    categoryId: taskInfoUnsafe.categoryId,
    pendingRequest: taskInfoUnsafe.pendingRequest,
    taskTitle: taskInfoUnsafe.taskTitle
  }

  if (taskInfo.pendingRequest !== 0) return // review already requested

  const categoryInfoUnsafe = await cache.transaction.legacy.database.category.findOne({
    where: {
      familyId: cache.familyId,
      categoryId: taskInfo.categoryId
    },
    attributes: ['childId'],
    transaction: cache.transaction.legacy.transaction
  })

  if (categoryInfoUnsafe === null) {
    throw new IllegalStateException({ staticMessage: 'category referenced from task not found' })
  }

  const categoryInfo = { childId: categoryInfoUnsafe.childId }

  const deviceInfoUnsafe = await cache.transaction.legacy.database.device.findOne({
    where: {
      familyId: cache.familyId,
      deviceId
    },
    attributes: ['currentUserId'],
    transaction: cache.transaction.legacy.transaction
  })

  if (deviceInfoUnsafe === null) throw new SourceDeviceNotFoundException()

  const deviceInfo = { currentUserId: deviceInfoUnsafe.currentUserId }

  if (categoryInfo.childId !== deviceInfo.currentUserId) {
    throw new IllegalStateException({ staticMessage: 'Can not mark task pending for other user than the current user' })
  }

  const childInfoUnsafe = await cache.transaction.legacy.database.user.findOne({
    where: {
      familyId: cache.familyId,
      userId: categoryInfo.childId
    },
    attributes: ['name'],
    transaction: cache.transaction.legacy.transaction
  })

  if (childInfoUnsafe === null) throw new SourceUserNotFoundException()

  const childInfo = { name: childInfoUnsafe.name }

  await cache.transaction.legacy.database.childTask.update({ pendingRequest: 1 }, {
    where: {
      familyId: cache.familyId,
      taskId: action.taskId
    },
    transaction: cache.transaction.legacy.transaction
  })

  cache.categoriesWithModifiedTasks.add(taskInfo.categoryId)
  cache.incrementTriggeredSyncLevel(1) // parents are not faster reachable

  await sendTaskDoneMails({
    database: cache.transaction.legacy.database,
    transaction: cache.transaction.legacy.transaction,
    familyId: cache.familyId,
    childName: childInfo.name,
    taskTitle: taskInfo.taskTitle,
    mailTransport: cache.mailTransport,
  })
}
