/*
 * server component for the TimeLimit App
 * Copyright (C) 2019 - 2022 Jonas Lochmann
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

export interface ClientDataStatus {
  devices: string // deviceListVersion
  apps: ClientDataStatusApps
  categories: ClientDataStatusCategories
  users: string // userListVersion
  clientLevel?: number
  devicesDetail?: ClientDataStatusDevicesExtended
  kri?: number  // last key request index
  kr?: number   // last key response index
  dh?: string   // last Diffie Hellman key version
  u2f?: string  // last u2f list version
}

export function createEmptyClientDataStatus({ clientLevel }: {
  clientLevel: number | null
}): ClientDataStatus {
  return {
    devices: '',
    apps: {},
    categories: {},
    users: '',
    clientLevel: clientLevel || undefined
  }
}

export type ClientDataStatusApps = {[key: string]: string} // installedAppsVersionsByDeviceId
export type ClientDataStatusCategories = {[key: string]: CategoryDataStatus}
export type ClientDataStatusDevicesExtended = {[key: string]: DeviceDataStatus}

export interface CategoryDataStatus {
  base: string  // baseVersion
  apps: string  // assignedAppsVersion
  rules: string  // timeLimitRulesVersion
  usedTime: string  // usedTimeItemsVersion
  tasks?: string   // taskListVersion
}

export interface DeviceDataStatus {
  appsB?: string   // encrypted app list base version
  appsD?: string   // encrypted app list diff version
}
