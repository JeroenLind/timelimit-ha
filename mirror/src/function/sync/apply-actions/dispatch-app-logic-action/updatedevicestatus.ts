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

import { UpdateDeviceStatusAction } from '../../../../action/index.js'
import { DeviceHadManipulationFlags, DeviceManipulationFlags, hasDeviceManipulation } from '../../../../database/device.js'
import { newPermissionStatusValues } from '../../../../model/newpermissionstatus.js'
import { protetionLevels } from '../../../../model/protectionlevel.js'
import { runtimePermissionStatusValues } from '../../../../model/runtimepermissionstatus.js'
import { enumMax } from '../../../../util/enum.js'
import { sendManipulationWarnings } from '../../../warningmail/manipulation.js'
import { Cache } from '../cache.js'
import { SourceDeviceNotFoundException } from '../exception/illegal-state.js'

export async function dispatchUpdateDeviceStatus ({ deviceId, action, cache }: {
  deviceId: string
  action: UpdateDeviceStatusAction
  cache: Cache
}) {
  const deviceEntry = await cache.transaction.legacy.database.device.findOne({
    where: {
      familyId: cache.familyId,
      deviceId
    },
    transaction: cache.transaction.legacy.transaction
  })

  if (!deviceEntry) {
    throw new SourceDeviceNotFoundException()
  }

  const hadManipulationBefore = hasDeviceManipulation(deviceEntry)

  if (action.newProtetionLevel) {
    const hasChanged = deviceEntry.currentProtectionLevel !== action.newProtetionLevel

    deviceEntry.currentProtectionLevel = action.newProtetionLevel

    deviceEntry.highestProtectionLevel = enumMax(
      deviceEntry.currentProtectionLevel,
      deviceEntry.highestProtectionLevel,
      protetionLevels
    )

    if (hasChanged && (deviceEntry.currentProtectionLevel !== deviceEntry.highestProtectionLevel)) {
      deviceEntry.hadManipulation = true
      deviceEntry.hadManipulationFlags |= DeviceHadManipulationFlags.ProtectionLevel
    }
  }

  if (action.newUsageStatsPermissionStatus) {
    const hasChanged = deviceEntry.currentUsageStatsPermission !== action.newUsageStatsPermissionStatus

    deviceEntry.currentUsageStatsPermission = action.newUsageStatsPermissionStatus

    deviceEntry.highestUsageStatsPermission = enumMax(
      deviceEntry.currentUsageStatsPermission,
      deviceEntry.highestUsageStatsPermission,
      runtimePermissionStatusValues
    )

    if (hasChanged && (deviceEntry.currentUsageStatsPermission !== deviceEntry.highestUsageStatsPermission)) {
      deviceEntry.hadManipulation = true
      deviceEntry.hadManipulationFlags |= DeviceHadManipulationFlags.UsageStatsAccess
    }
  }

  if (action.newNotificationAccessPermission) {
    const hasChanged = deviceEntry.currentNotificationAccessPermission !== action.newNotificationAccessPermission

    deviceEntry.currentNotificationAccessPermission = action.newNotificationAccessPermission

    deviceEntry.highestNotificationAccessPermission = enumMax(
      deviceEntry.currentNotificationAccessPermission,
      deviceEntry.highestNotificationAccessPermission,
      newPermissionStatusValues
    )

    if (hasChanged && (deviceEntry.currentNotificationAccessPermission !== deviceEntry.highestNotificationAccessPermission)) {
      deviceEntry.hadManipulation = true
      deviceEntry.hadManipulationFlags |= DeviceHadManipulationFlags.NotificationAccess
    }
  }

  if (action.newOverlayPermission) {
    const hasChanged = deviceEntry.currentOverlayPermission !== action.newOverlayPermission

    deviceEntry.currentOverlayPermission = action.newOverlayPermission

    deviceEntry.highestOverlayPermission = enumMax(
      deviceEntry.currentOverlayPermission,
      deviceEntry.highestOverlayPermission,
      runtimePermissionStatusValues
    )

    if (hasChanged && (deviceEntry.currentOverlayPermission !== deviceEntry.highestOverlayPermission)) {
      deviceEntry.hadManipulation = true
      deviceEntry.hadManipulationFlags |= DeviceHadManipulationFlags.OverlayPermission
    }
  }

  if (action.newAccessibilityServiceEnabled !== undefined) {
    const hasChanged = deviceEntry.asEnabled !== action.newAccessibilityServiceEnabled

    deviceEntry.asEnabled = action.newAccessibilityServiceEnabled

    if (action.newAccessibilityServiceEnabled) {
      deviceEntry.wasAsEnabled = true
    }

    if (hasChanged && (deviceEntry.asEnabled !== deviceEntry.wasAsEnabled)) {
      deviceEntry.hadManipulation = true
      deviceEntry.hadManipulationFlags |= DeviceHadManipulationFlags.AccessibiityService
    }
  }

  if (action.newAppVersion !== undefined) {
    const hasChanged = deviceEntry.currentAppVersion !== action.newAppVersion

    deviceEntry.currentAppVersion = action.newAppVersion

    deviceEntry.highestAppVersion = Math.max(
      deviceEntry.currentAppVersion,
      deviceEntry.highestAppVersion
    )

    if (hasChanged && (deviceEntry.currentAppVersion !== deviceEntry.highestAppVersion)) {
      deviceEntry.hadManipulation = true
      deviceEntry.hadManipulationFlags |= DeviceHadManipulationFlags.AppVersion
    }
  }

  if (action.didReboot) {
    deviceEntry.didReboot = true
  }

  if (action.isQOrLaterNow) {
    const hasChanged = deviceEntry.isQorLater === false

    if (hasChanged) {
      deviceEntry.isQorLater = true
    }
  }

  if (action.platformType !== undefined) {
    if (action.platformType !== deviceEntry.platformType) {
      deviceEntry.platformType = action.platformType
    }
  }

  if (action.platformLevel !== undefined) {
    if (action.platformLevel !== deviceEntry.platformLevel) {
      deviceEntry.platformLevel = action.platformLevel
    }
  }

  {
    const effectiveManipulationFlags = action.addedManipulationFlags & DeviceManipulationFlags.ALL

    if (effectiveManipulationFlags !== 0) {
      deviceEntry.manipulationFlags = deviceEntry.manipulationFlags | effectiveManipulationFlags
    }
  }

  await deviceEntry.save({ transaction: cache.transaction.legacy.transaction })

  if (hasDeviceManipulation(deviceEntry)) {
    if (!hadManipulationBefore) {
      await sendManipulationWarnings({
        transaction: cache.transaction,
        deviceName: deviceEntry.name,
        familyId: cache.familyId,
        mailTransport: cache.mailTransport,
      })
    }
  }

  cache.invalidiateDeviceList = true
  cache.incrementTriggeredSyncLevel(1)
}
