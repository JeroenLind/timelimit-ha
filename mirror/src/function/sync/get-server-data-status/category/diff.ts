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

import difference from 'lodash/difference.js'
import intersection from 'lodash/intersection.js'
import { SimpleDatabaseTransaction } from '../../../../database/simple/index.js'
import { ClientDataStatusCategories } from '../../../../object/clientdatastatus.js'
import { GetServerDataStatusIllegalStateException } from '../exception.js'
import { FamilyEntry } from '../family-entry.js'

export async function getCategoryDataToSync ({ transaction, familyEntry, categoriesStatus }: {
  transaction: SimpleDatabaseTransaction
  familyEntry: FamilyEntry
  categoriesStatus: ClientDataStatusCategories
}): Promise<GetCategoryDataToSyncResult> {
  const serverCategoriesVersions: Array<ServerCategoryVersion> = (await transaction.legacy.database.category.findAll({
    where: {
      familyId: familyEntry.familyId
    },
    attributes: [
      'categoryId',
      'baseVersion',
      'assignedAppsVersion',
      'timeLimitRulesVersion',
      'usedTimesVersion',
      'taskListVersion'
    ],
    transaction: transaction.legacy.transaction
  })).map((item) => ({
    categoryId: item.categoryId,
    baseVersion: item.baseVersion,
    assignedAppsVersion: item.assignedAppsVersion,
    timeLimitRulesVersion: item.timeLimitRulesVersion,
    usedTimesVersion: item.usedTimesVersion,
    taskListVersion: item.taskListVersion
  }))

  const serverCategoryIds = serverCategoriesVersions.map((item) => item.categoryId)
  const clientCategoryIds = Object.keys(categoriesStatus)

  const removedCategoryIds = difference(clientCategoryIds, serverCategoryIds)

  const addedCategoryIds = difference(serverCategoryIds, clientCategoryIds)
  const categoryIdsOfClientAndServer = intersection(serverCategoryIds, clientCategoryIds)

  const categoryIdsToSyncBaseData = [...addedCategoryIds]
  const categoryIdsToSyncAssignedApps = [...addedCategoryIds]
  const categoryIdsToSyncRules = [...addedCategoryIds]
  const categoryIdsToSyncUsedTimes = [...addedCategoryIds]
  const categoryIdsToSyncTasks = [...addedCategoryIds]

  categoryIdsOfClientAndServer.forEach((categoryId) => {
    const serverEntry = serverCategoriesVersions.find((item) => item.categoryId === categoryId)
    const clientEntry = categoriesStatus[categoryId]

    if ((!serverEntry) || (!clientEntry)) {
      throw new GetServerDataStatusIllegalStateException({ staticMessage: 'could not find category overview item again' })
    }

    if (serverEntry.baseVersion !== clientEntry.base) {
      categoryIdsToSyncBaseData.push(categoryId)
    }

    if (serverEntry.assignedAppsVersion !== clientEntry.apps) {
      categoryIdsToSyncAssignedApps.push(categoryId)
    }

    if (serverEntry.timeLimitRulesVersion !== clientEntry.rules) {
      categoryIdsToSyncRules.push(categoryId)
    }

    if (serverEntry.usedTimesVersion !== clientEntry.usedTime) {
      categoryIdsToSyncUsedTimes.push(categoryId)
    }

    if (serverEntry.taskListVersion !== clientEntry.tasks) {
      categoryIdsToSyncTasks.push(categoryId)
    }
  })

  const serverCategoriesVersionsMap = new Map<string, ServerCategoryVersion>()

  serverCategoriesVersions.forEach((item) => serverCategoriesVersionsMap.set(item.categoryId, item))

  return {
    removedCategoryIds,
    categoryIdsToSyncBaseData,
    categoryIdsToSyncAssignedApps,
    categoryIdsToSyncRules,
    categoryIdsToSyncUsedTimes,
    categoryIdsToSyncTasks,
    serverCategoriesVersions: {
      list: serverCategoriesVersions,
      requireByCategoryId: (categoryId) => {
        const item = serverCategoriesVersionsMap.get(categoryId)

        if (!item) {
          throw new GetServerDataStatusIllegalStateException({ staticMessage: 'could not find category entry' })
        }

        return item
      }
    }
  }
}

export interface GetCategoryDataToSyncResult {
  removedCategoryIds: Array<string>
  categoryIdsToSyncBaseData: Array<string>
  categoryIdsToSyncAssignedApps: Array<string>
  categoryIdsToSyncRules: Array<string>
  categoryIdsToSyncUsedTimes: Array<string>
  categoryIdsToSyncTasks: Array<string>
  serverCategoriesVersions: ServerCategoryVersions
}

export interface ServerCategoryVersions {
  list: Array<ServerCategoryVersion>
  requireByCategoryId: (categoryId: string) => ServerCategoryVersion
}

export interface ServerCategoryVersion {
  categoryId: string
  baseVersion: string
  assignedAppsVersion: string
  timeLimitRulesVersion: string
  usedTimesVersion: string
  taskListVersion: string
}
