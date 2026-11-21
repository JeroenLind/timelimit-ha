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
import { SimpleDatabase } from '../../database/simple/index.js'
import { deleteFamilies } from './delete-families.js'

export async function deleteOldFamilies ({ database, now }: {
  database: SimpleDatabase
  now: number
}) {
  const oldFamilyIds = await findOldFamilyIds({ database, now })

  if (oldFamilyIds.length > 0) {
    const familyIdsToDelete = oldFamilyIds.slice(0, 256) /* limit to 256 families per execution */

    await database.transaction(async (transaction) => {
      await deleteFamilies({
        transaction,
        familiyIds: familyIdsToDelete
      })
    })
  }
}

export async function findOldFamilyIds ({ database, now }: {
  database: SimpleDatabase
  now: number
}): Promise<Array<string>> {
  const threeMonthsAgo = now - 1000 * 60 * 60 * 24 * 90 // 90 days

  return database.transaction(async (transaction) => {
    const familyIdsWithExpiredLicenses = await transaction.family.getFamilyIdsWithFullVersionUntilLowerThan(
      threeMonthsAgo
    )

    if (familyIdsWithExpiredLicenses.length === 0) {
      return []
    }

    const recentlyUsedFamilyIds = await transaction.device.getRecentlyConnectedDeviceFamilyIdsByFamilyIds({
      familyIds: familyIdsWithExpiredLicenses,
      lastConnectivityNewerThan: threeMonthsAgo
    })

    return difference(familyIdsWithExpiredLicenses, recentlyUsedFamilyIds)
  })
}
