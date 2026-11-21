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

import { ReviewChildTaskAction } from '../../../../action/index.js'
import { Cache } from '../cache.js'
import { IllegalStateException } from '../exception/illegal-state.js'
import { MissingTaskException } from '../exception/missing-item.js'
import { PremiumVersionMissingException } from '../exception/premium.js'

export async function dispatchReviewChildTaskAction ({ action, cache }: {
  action: ReviewChildTaskAction
  cache: Cache
}) {
  if (action.ok && cache.hasFullVersion === false) {
    throw new PremiumVersionMissingException()
  }

  const taskInfo = await cache.transaction.legacy.database.childTask.findOne({
    where: {
      familyId: cache.familyId,
      taskId: action.taskId
    },
    transaction: cache.transaction.legacy.transaction
  })

  if (taskInfo === null) throw new MissingTaskException()

  if (taskInfo.pendingRequest === 0) throw new IllegalStateException({ staticMessage: 'no task review pending' })

  if (action.ok) {
    const categoryInfoUnsafe = await cache.transaction.legacy.database.category.findOne({
      where: {
        familyId: cache.familyId,
        categoryId: taskInfo.categoryId
      },
      attributes: ['extraTimeInMillis', 'extraTimeDay'],
      transaction: cache.transaction.legacy.transaction
    })

    if (categoryInfoUnsafe === null) {
      throw new IllegalStateException({ staticMessage: 'category referenced from task not found' })
    }

    const categoryInfo = {
      extraTimeInMillis: categoryInfoUnsafe.extraTimeInMillis,
      extraTimeDay: categoryInfoUnsafe.extraTimeDay
    }

    const resetDayBoundExtraTime = categoryInfo.extraTimeDay !== -1 &&
      action.day !== undefined && categoryInfo.extraTimeDay !== action.day

    if (resetDayBoundExtraTime) {
      await cache.transaction.legacy.database.category.update({
        extraTimeInMillis: taskInfo.extraTimeDuration,
        extraTimeDay: -1
      }, {
        where: {
          familyId: cache.familyId,
          categoryId: taskInfo.categoryId
        },
        transaction: cache.transaction.legacy.transaction
      })
    } else {
      await cache.transaction.legacy.database.category.update({
        extraTimeInMillis: categoryInfo.extraTimeInMillis + taskInfo.extraTimeDuration
      }, {
        where: {
          familyId: cache.familyId,
          categoryId: taskInfo.categoryId
        },
        transaction: cache.transaction.legacy.transaction
      })
    }

    cache.categoriesWithModifiedBaseData.add(taskInfo.categoryId)

    await cache.transaction.legacy.database.childTask.update({
      pendingRequest: 0,
      lastGrantTimestamp: action.time.toString(10)
    }, {
      where: {
        familyId: cache.familyId,
        taskId: action.taskId
      },
      transaction: cache.transaction.legacy.transaction
    })

    cache.incrementTriggeredSyncLevel(2)
  } else {
    await cache.transaction.legacy.database.childTask.update({
      pendingRequest: 0
    }, {
      where: {
        familyId: cache.familyId,
        taskId: action.taskId
      },
      transaction: cache.transaction.legacy.transaction
    })
  }

  cache.categoriesWithModifiedTasks.add(taskInfo.categoryId)
  cache.incrementTriggeredSyncLevel(1)
}
