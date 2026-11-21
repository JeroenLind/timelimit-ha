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

import { SimpleDatabaseTransaction } from '../../database/simple/index.js'

export async function deleteFamilies ({ transaction, familiyIds }: {
  transaction: SimpleDatabaseTransaction
  familiyIds: Array<string>
}) {
  if (familiyIds.length === 0) {
    return
  }

  // category
  await transaction.category.destroyByFamilyIds(familiyIds)

  // categoryapp
  await transaction.categoryApp.destroyByFamilyIds(familiyIds)

  // purchase
  await transaction.purchase.destroyByFamilyIds(familiyIds)

  // timelimitrule
  await transaction.timelimitRule.destroyByFamilyIds(familiyIds)

  // usedtime
  await transaction.usedTime.destroyByFamilyIds(familiyIds)

  // session durations
  await transaction.sessionDuration.destroyByFamilyIds(familiyIds)

  // user
  await transaction.user.destroyByFamilyIds(familiyIds)

  // device
  const oldDeviceAuthTokens = await transaction.device.destroyByFamilyIdsReturningAuthTokens(familiyIds)

  // olddevice
  if (oldDeviceAuthTokens.length > 0) {
    await transaction.oldDevice.insertMissingTokens(oldDeviceAuthTokens)
  }

  // family
  await transaction.family.destroyByFamilyIds(familiyIds)
}
