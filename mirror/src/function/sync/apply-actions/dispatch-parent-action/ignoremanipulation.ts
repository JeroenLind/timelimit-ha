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

import { IgnoreManipulationAction } from '../../../../action/index.js'
import { Cache } from '../cache.js'
import { SourceDeviceNotFoundException } from '../exception/illegal-state.js'

export async function dispatchIgnoreManipulation ({ action, cache }: {
  action: IgnoreManipulationAction
  cache: Cache
}) {
  const deviceEntry = await cache.transaction.legacy.database.device.findOne({
    where: {
      familyId: cache.familyId,
      deviceId: action.deviceId
    },
    transaction: cache.transaction.legacy.transaction
  })

  if (deviceEntry === null) {
    throw new SourceDeviceNotFoundException()
  }

  if (action.ignoreDeviceAdminManipulation) {
    deviceEntry.highestProtectionLevel = deviceEntry.currentProtectionLevel
  }

  if (action.ignoreDeviceAdminManipulationAttempt) {
    deviceEntry.triedDisablingDeviceAdmin = false
  }

  if (action.ignoreAppDowngrade) {
    deviceEntry.highestAppVersion = deviceEntry.currentAppVersion
  }

  if (action.ignoreNotificationAccessManipulation) {
    deviceEntry.highestNotificationAccessPermission = deviceEntry.currentNotificationAccessPermission
  }

  if (action.ignoreUsageStatsAccessManipulation) {
    deviceEntry.highestUsageStatsPermission = deviceEntry.currentUsageStatsPermission
  }

  if (action.ignoreOverlayPermissionManipulation) {
    deviceEntry.highestOverlayPermission = deviceEntry.currentOverlayPermission
  }

  if (action.ignoreAccessibilityServiceManipulation) {
    deviceEntry.wasAsEnabled = deviceEntry.asEnabled
  }

  if (action.ignoreDidReboot) {
    deviceEntry.didReboot = false
  }

  if (action.ignoreHadManipulation) {
    deviceEntry.hadManipulation = false
  }

  if (action.ignoreHadManipulationFlags !== 0) {
    const newFlags = deviceEntry.hadManipulationFlags & (~action.ignoreHadManipulationFlags)

    deviceEntry.hadManipulationFlags = newFlags

    if (newFlags === 0) {
      deviceEntry.hadManipulation = false
    }
  }

  if (action.ignoreManipulationFlags !== 0) {
    deviceEntry.manipulationFlags = deviceEntry.manipulationFlags & (~action.ignoreManipulationFlags)
  }

  await deviceEntry.save({ transaction: cache.transaction.legacy.transaction })
  cache.invalidiateDeviceList = true
  cache.incrementTriggeredSyncLevel(1)
  cache.incrementTargetedTriggeredSyncLevel(action.deviceId, 2)
}
