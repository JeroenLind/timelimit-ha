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
import { ServerUpdatedCategoryAssignedApps } from '../../../../object/serverdatastatus.js'
import { FamilyEntry } from '../family-entry.js'
import { ServerCategoryVersions } from './diff.js'

export async function getCategoryAssignedApps ({
  transaction, categoryIdsToSyncAssignedApps, familyEntry, serverCategoriesVersions
}: {
  transaction: SimpleDatabaseTransaction
  categoryIdsToSyncAssignedApps: Array<string>
  familyEntry: FamilyEntry
  serverCategoriesVersions: ServerCategoryVersions
}): Promise<Array<ServerUpdatedCategoryAssignedApps>> {
  const dataForSyncing = (await transaction.legacy.database.categoryApp.findAll({
    where: {
      familyId: familyEntry.familyId,
      categoryId: {
        [Sequelize.Op.in]: categoryIdsToSyncAssignedApps
      }
    },
    attributes: ['categoryId', 'packageName'],
    transaction: transaction.legacy.transaction
  })).map((item) => ({
    categoryId: item.categoryId,
    packageName: item.packageName
  }))

  const getCategoryAssingedAppsVersion = (categoryId: string) => (
    serverCategoriesVersions.requireByCategoryId(categoryId).assignedAppsVersion
  )

  return categoryIdsToSyncAssignedApps.map((categoryId): ServerUpdatedCategoryAssignedApps => ({
    categoryId,
    apps: dataForSyncing.filter((item) => item.categoryId === categoryId).map((item) => item.packageName),
    version: getCategoryAssingedAppsVersion(categoryId)
  }))
}
