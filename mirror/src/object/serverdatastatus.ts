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

import { SerializedAppActivityItem } from '../model/appactivity.js'
import { SerializedInstalledApp } from '../model/installedapp.js'
import { NewPermissionStatus } from '../model/newpermissionstatus.js'
import { ProtectionLevel } from '../model/protectionlevel.js'
import { RuntimePermissionStatus } from '../model/runtimepermissionstatus.js'

export interface ServerDataStatus {
  devices?: ServerDeviceList  // newDeviceList
  devices2?: Array<ServerExtendedDeviceData> // updatedExtendedDeviceData
  apps?: Array<ServerInstalledAppsData> // newInstalledApps
  rmCategories?: Array<string> // removedCategories
  categoryBase?: Array<ServerUpdatedCategoryBaseData>  // newCategoryBaseData
  categoryApp?: Array<ServerUpdatedCategoryAssignedApps>  // newCategoryAssignedApps
  usedTimes?: Array<ServerUpdatedCategoryUsedTimes>  // newCategoryUsedTimes
  rules?: Array<ServerUpdatedTimeLimitRules> // newOrUpdatedTimeLimitRules
  tasks?: Array<ServerUpdatedCategoryTasks> // newOrUpdatedTasks
  users?: ServerUserList  // newUserList
  krq?: Array<ServerKeyRequest> // pendingKeyRequests
  kr?: Array<ServerKeyResponse> // keyResponses
  pings?: Array<ServerPing>
  dh?: ServerDhKey // Diffie Hellman
  u2f?: U2fData
  fullVersion: number     // fullVersionUntil
  message?: string
  apiLevel: number
}

export interface ServerDeviceList {
  version: string
  data: Array<ServerDeviceData>
}

export interface ServerUserList {
  version: string
  data: Array<ServerUserEntry>
}

export interface ServerUserEntry {
  id: string
  name: string
  password: string
  secondPasswordSalt: string
  type: 'parent' | 'child'
  timeZone: string
  disableLimitsUntil: number
  mail: string
  currentDevice: string
  categoryForNotAssignedApps: string
  relaxPrimaryDevice: boolean
  mailNotificationFlags: number
  blockedTimes: string
  flags: number
  llc?: string  // limit login category
  pbd?: number  // pre block duration, default is zero
}

export interface ServerDeviceData {
  deviceId: string
  name: string
  model: string
  addedAt: number
  currentUserId: string
  networkTime: 'disabled' | 'if possible' | 'enabled'
  cProtectionLevel: ProtectionLevel
  hProtectionLevel: ProtectionLevel
  cUsageStats: RuntimePermissionStatus
  hUsageStats: RuntimePermissionStatus
  cNotificationAccess: NewPermissionStatus
  hNotificationAccess: NewPermissionStatus
  cAppVersion: number
  hAppVersion: number
  tDisablingAdmin: boolean
  reboot: boolean
  hadManipulation: boolean
  hadManipulationFlags: number
  reportUninstall: boolean
  isUserKeptSignedIn: boolean
  showDeviceConnected: boolean
  defUser: string
  defUserTimeout: number
  rebootIsManipulation: boolean
  cOverlay: RuntimePermissionStatus
  hOverlay: RuntimePermissionStatus
  asEnabled: boolean
  wasAsEnabled: boolean
  activityLevelBlocking: boolean
  qOrLater: boolean
  mFlags: number  // manipulation flags
  pk?: string     // public key
  pType?: string
  pLevel: number
}

export interface ServerUpdatedCategoryBaseData {
  categoryId: string
  childId: string
  title: string
  blockedTimes: string  // blockedMinutesInWeek
  extraTime: number
  extraTimeDay: number
  tempBlocked: boolean
  tempBlockTime: number
  version: string
  parentCategoryId: string
  blockAllNotifications: boolean
  timeWarnings: number
  // mbl = minimum battery level
  mblCharging: number
  mblMobile: number
  sort: number
  networks: Array<ServerCategoryNetworkId>
  // disable limits until
  dlu: number
  flags: number
  blockNotificationDelay: number
  // atw = additionalTimeWarnings
  atw: Array<number>
}

export interface ServerCategoryNetworkId {
  itemId: string
  hashedNetworkId: string
}

export interface ServerUpdatedCategoryAssignedApps {
  categoryId: string
  apps: Array<string>
  version: string
}

export interface ServerUpdatedCategoryUsedTimes {
  categoryId: string
  times: Array<ServerUsedTimeItem>
  sessionDurations: Array<ServerSessionDurationItem>
  version: string
}

export interface ServerUsedTimeItem {
  day: number // day of epoch
  time: number  // in milliseconds
  start: number
  end: number
}

export interface ServerSessionDurationItem {
  /**
   * the maximum duration of a session (maxSessionDuration)
   */
  md: number
  /**
   * the pause duration after a session (sessionPauseDuration)
   */
  spd: number
  /**
   * the start minute of the day of the session/ the rule
   * which created this session (startMinuteOfDay)
   */
  sm: number
  /**
   * the end minute of the day of the session/ the rule
   * which created this session (endMinuteOfDay)
   */
  em: number
  /**
   * the timestamp of the last usage of this session (lastUsage)
   */
  l: number
  /**
   * the duration of the last/ current session (lastSessionDuration)
   */
  d: number
}

export interface ServerUpdatedTimeLimitRules {
  categoryId: string
  version: string
  rules: Array<ServerTimeLimitRule>
}

export interface ServerTimeLimitRule {
  id: string
  extraTime: boolean  // applyToExtraTimeUsage
  dayMask: number     // as binary bitmask
  maxTime: number     // maximumTimeInMillis
  start: number       // startMinuteOfDay
  end: number         // endMinuteOfDay
  session: number     // maximum session duration
  pause: number       // session pause duration
  perDay: boolean
}

export interface ServerUpdatedCategoryTasks {
  categoryId: string
  version: string
  tasks: Array<ServerUpdatedCategoryTask>
}

export interface ServerUpdatedCategoryTask {
  i: string // taskId
  t: string // taskTitle
  d: number // extraTimeDuration
  p: boolean  // pendingRequest
  l: number   // lastGrantTimestamp
}

export interface ServerInstalledAppsData {
  deviceId: string
  version: string
  apps: Array<SerializedInstalledApp>
  activities: Array<SerializedAppActivityItem>
}

export interface ServerExtendedDeviceData {
  deviceId: string
  appsBase?: ServerCryptContainer
  appsDiff?: ServerCryptContainer
}

export interface ServerCryptContainer {
  version: string
  data: string
}

export interface ServerKeyRequest {
  srvSeq: number
  senId: string
  senSeq: number
  deviceId?: string
  categoryId?: string
  type: number
  tempKey: string
  signature: string
}

export interface ServerKeyResponse {
  srvSeq: number
  sender: string
  rqSeq: number
  tempKey: string,
  cryptKey: string,
  signature: string
}

export interface ServerPing {
  deviceId: string
  token: string
  type: 'ping' | 'pong'
}

export interface ServerDhKey {
  v: string // version
  k: string // key, base64
}

export interface U2fData {
  v: string // version
  d: Array<U2fItem> // data
}

export interface U2fItem {
  u: string // userId
  a: number // addedAt
  h: string // key handle, base64
  p: string // public key, base64
}
