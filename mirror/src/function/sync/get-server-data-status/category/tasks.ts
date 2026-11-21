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
import { SimpleDatabaseTransaction } from '../../../../database/simple/index.js'
import { ServerUpdatedCategoryTask, ServerUpdatedCategoryTasks } from '../../../../object/serverdatastatus.js'
import { FamilyEntry } from '../family-entry.js'
import { ServerCategoryVersions } from './diff.js'

export async function getTasks ({
  transaction, categoryIdsToSyncTasks, familyEntry,
  serverCategoriesVersions
}: {
  transaction: SimpleDatabaseTransaction
  categoryIdsToSyncTasks: Array<string>
  familyEntry: FamilyEntry
  serverCategoriesVersions: ServerCategoryVersions
}): Promise<Array<ServerUpdatedCategoryTasks>> {
  const dataToSync = (await transaction.legacy.database.childTask.findAll({
    where: {
      familyId: familyEntry.familyId,
      categoryId: {
        [Sequelize.Op.in]: categoryIdsToSyncTasks
      }
    },
    attributes: [
      'taskId',
      'categoryId',
      'taskTitle',
      'extraTimeDuration',
      'pendingRequest',
      'lastGrantTimestamp'
    ],
    transaction: transaction.legacy.transaction
  })).map((item) => ({
    taskId: item.taskId,
    categoryId: item.categoryId,
    taskTitle: item.taskTitle,
    extraTimeDuration: item.extraTimeDuration,
    pendingRequest: item.pendingRequest,
    lastGrantTimestamp: item.lastGrantTimestamp
  }))

  return categoryIdsToSyncTasks.map((categoryId) => ({
    categoryId,
    version: serverCategoriesVersions.requireByCategoryId(categoryId).taskListVersion,
    tasks: dataToSync.filter((item) => item.categoryId === categoryId).map((item): ServerUpdatedCategoryTask => ({
      i: item.taskId,
      t: item.taskTitle,
      d: item.extraTimeDuration,
      p: item.pendingRequest !== 0,
      l: parseInt(item.lastGrantTimestamp, 10)
    }))
  }))
}
