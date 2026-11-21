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

import { SimpleDatabaseTransaction } from '../../../database/simple/index.js'
import { ServerDeviceList } from '../../../object/serverdatastatus.js'
import { FamilyEntry } from './family-entry.js'

export async function getDeviceList ({ transaction, familyEntry }: {
  transaction: SimpleDatabaseTransaction
  familyEntry: FamilyEntry
}): Promise<ServerDeviceList> {
  const devices = (await transaction.legacy.database.device.findAll({
    where: {
      familyId: familyEntry.familyId
    },
    transaction: transaction.legacy.transaction
  }))

  return {
    version: familyEntry.deviceListVersion,
    data: devices.map((item) => ({
      deviceId: item.deviceId,
      name: item.name,
      model: item.model,
      addedAt: parseInt(item.addedAt, 10),
      currentUserId: item.currentUserId,
      networkTime: item.networkTime,
      cProtectionLevel: item.currentProtectionLevel,
      hProtectionLevel: item.highestProtectionLevel,
      cUsageStats: item.currentUsageStatsPermission,
      hUsageStats: item.highestUsageStatsPermission,
      cNotificationAccess: item.currentNotificationAccessPermission,
      hNotificationAccess: item.highestNotificationAccessPermission,
      cAppVersion: item.currentAppVersion,
      hAppVersion: item.highestAppVersion,
      tDisablingAdmin: item.triedDisablingDeviceAdmin,
      reboot: item.didReboot,
      hadManipulation: item.hadManipulation,
      hadManipulationFlags: item.hadManipulationFlags,
      reportUninstall: item.didDeviceReportUninstall,
      isUserKeptSignedIn: item.isUserKeptSignedIn,
      showDeviceConnected: item.showDeviceConnected,
      defUser: item.defaultUserId,
      defUserTimeout: item.defaultUserTimeout,
      rebootIsManipulation: item.considerRebootManipulation,
      cOverlay: item.currentOverlayPermission,
      hOverlay: item.highestOverlayPermission,
      asEnabled: item.asEnabled,
      wasAsEnabled: item.wasAsEnabled,
      activityLevelBlocking: item.activityLevelBlocking,
      qOrLater: item.isQorLater,
      mFlags: item.manipulationFlags,
      pk: item.publicKey ? item.publicKey.toString('base64') : undefined,
      pType: item.platformType || undefined,
      pLevel: item.platformLevel
    }))
  }
}
