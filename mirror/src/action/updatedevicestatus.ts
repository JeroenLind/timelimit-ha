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

import { minPlatformLevel, maxPlatformLevel, minPlatformTypeLength, maxPlatformTypeLength } from '../database/device.js'
import { NewPermissionStatus } from '../model/newpermissionstatus.js'
import { ProtectionLevel } from '../model/protectionlevel.js'
import { RuntimePermissionStatus } from '../model/runtimepermissionstatus.js'
import { AppLogicAction } from './basetypes.js'
import { assertSafeInteger, throwOutOfRange } from './meta/util.js'

const actionType = 'UpdateDeviceStatusAction'

export class UpdateDeviceStatusAction extends AppLogicAction {
  readonly newProtetionLevel?: ProtectionLevel
  readonly newUsageStatsPermissionStatus?: RuntimePermissionStatus
  readonly newNotificationAccessPermission?: NewPermissionStatus
  readonly newOverlayPermission?: RuntimePermissionStatus
  readonly newAccessibilityServiceEnabled?: boolean
  readonly newAppVersion?: number
  readonly didReboot: boolean
  readonly isQOrLaterNow: boolean
  readonly addedManipulationFlags: number
  readonly platformType?: string
  readonly platformLevel?: number

  constructor ({
    newProtetionLevel,
    newUsageStatsPermissionStatus,
    newNotificationAccessPermission,
    newOverlayPermission,
    newAccessibilityServiceEnabled,
    newAppVersion,
    didReboot,
    isQOrLaterNow,
    addedManipulationFlags,
    platformType,
    platformLevel
  }: {
    newProtetionLevel?: ProtectionLevel
    newUsageStatsPermissionStatus?: RuntimePermissionStatus
    newNotificationAccessPermission?: NewPermissionStatus
    newOverlayPermission?: RuntimePermissionStatus
    newAccessibilityServiceEnabled?: boolean
    newAppVersion?: number
    didReboot: boolean
    isQOrLaterNow: boolean
    addedManipulationFlags: number
    platformType?: string
    platformLevel?: number
  }) {
    super()

    if (newAppVersion !== undefined) {
      assertSafeInteger({ actionType, field: 'newAppVersion', value: newAppVersion })

      if (newAppVersion < 0) {
        throwOutOfRange({ actionType, field: 'newAppVersion', value: newAppVersion })
      }
    }

    assertSafeInteger({ actionType, field: 'addedManipulationFlags', value: addedManipulationFlags })

    if (platformType !== undefined) {
      if (platformType.length < minPlatformTypeLength || platformType.length > maxPlatformTypeLength) {
        throwOutOfRange({ actionType, field: 'platformType.length', value: platformType.length })
      }
    }

    if (platformLevel !== undefined) {
      assertSafeInteger({ actionType, field: 'platformLevel', value: platformLevel })

      if (platformLevel < minPlatformLevel || platformLevel > maxPlatformLevel) {
        throwOutOfRange({ actionType, field: 'platformLevel', value: platformLevel })
      }
    }

    this.newProtetionLevel = newProtetionLevel
    this.newUsageStatsPermissionStatus = newUsageStatsPermissionStatus
    this.newNotificationAccessPermission = newNotificationAccessPermission
    this.newOverlayPermission = newOverlayPermission
    this.newAccessibilityServiceEnabled = newAccessibilityServiceEnabled
    this.newAppVersion = newAppVersion
    this.didReboot = didReboot
    this.isQOrLaterNow = isQOrLaterNow
    this.addedManipulationFlags = addedManipulationFlags
    this.platformType = platformType
    this.platformLevel = platformLevel
  }

  static parse = ({
    protectionLevel,
    usageStats,
    notificationAccess,
    overlayPermission,
    accessibilityServiceEnabled,
    appVersion,
    didReboot,
    isQOrLaterNow,
    addedManipulationFlags,
    platformType,
    platformLevel
  }: SerializedUpdateDeviceStatusAction) => (
    new UpdateDeviceStatusAction({
      newProtetionLevel: protectionLevel,
      newUsageStatsPermissionStatus: usageStats,
      newNotificationAccessPermission: notificationAccess,
      newOverlayPermission: overlayPermission,
      newAccessibilityServiceEnabled: accessibilityServiceEnabled,
      newAppVersion: appVersion,
      didReboot: !!didReboot,
      isQOrLaterNow: !!isQOrLaterNow,
      addedManipulationFlags: addedManipulationFlags || 0,
      platformType: platformType,
      platformLevel: platformLevel
    })
  )
}

export interface SerializedUpdateDeviceStatusAction {
  type: 'UPDATE_DEVICE_STATUS'
  protectionLevel?: ProtectionLevel
  usageStats?: RuntimePermissionStatus
  notificationAccess?: NewPermissionStatus
  overlayPermission?: RuntimePermissionStatus
  accessibilityServiceEnabled?: boolean
  appVersion?: number
  didReboot?: boolean
  isQOrLaterNow?: boolean
  addedManipulationFlags?: number
  platformType?: string
  platformLevel?: number
}
