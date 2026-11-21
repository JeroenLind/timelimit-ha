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
import { SimpleDatabaseTransaction } from '../../../database/simple/index.js'
import { ClientDataStatusDevicesExtended } from '../../../object/clientdatastatus.js'
import { ServerExtendedDeviceData, ServerCryptContainer } from '../../../object/serverdatastatus.js'
import { FamilyEntry } from './family-entry.js'
import { types } from '../../../database/encryptedapplist.js'

export async function getDeviceDetailList ({ transaction, familyEntry, devicesDetail }: {
  transaction: SimpleDatabaseTransaction
  familyEntry: FamilyEntry
  devicesDetail: ClientDataStatusDevicesExtended
}): Promise<Array<ServerExtendedDeviceData> | null> {
  const serverEncryptedAppsVersions = (await transaction.legacy.database.encryptedAppList.findAll({
    where: {
      familyId: familyEntry.familyId,
    },
    attributes: ['deviceId', 'type', 'version'],
    transaction: transaction.legacy.transaction
  })).map((item) => ({
    deviceId: item.deviceId,
    type: item.type,
    version: item.version
  }))

  const devicesWithChangedBaseApps: Array<string> = []
  const devicesWithChangedDiffApps: Array<string> = []

  serverEncryptedAppsVersions.forEach((item) => {
    if (item.type === types.base) {
      if (!devicesDetail[item.deviceId] || devicesDetail[item.deviceId].appsB !== item.version) {
        devicesWithChangedBaseApps.push(item.deviceId)
      }
    } else if (item.type === types.diff) {
      if (!devicesDetail[item.deviceId] || devicesDetail[item.deviceId].appsD !== item.version) {
        devicesWithChangedDiffApps.push(item.deviceId)
      }
    }
  })

  const updatedDeviceIds = Array.from(new Set([...devicesWithChangedBaseApps, ...devicesWithChangedDiffApps]))

  if (updatedDeviceIds.length === 0) return null

  const updatedBaseApps = devicesWithChangedBaseApps.length === 0 ? [] : (await transaction.legacy.database.encryptedAppList.findAll({
    where: {
      familyId: familyEntry.familyId,
      deviceId: {
        [Sequelize.Op.in]: devicesWithChangedBaseApps
      },
      type: types.base
    },
    attributes: [
      'deviceId',
      'version',
      'data'
    ],
    transaction: transaction.legacy.transaction
  })).map((item) => ({
    deviceId: item.deviceId,
    version: item.version,
    data: item.data
  }))

  const updatedDiffApps = devicesWithChangedDiffApps.length === 0 ? [] : (await transaction.legacy.database.encryptedAppList.findAll({
    where: {
      familyId: familyEntry.familyId,
      deviceId: {
        [Sequelize.Op.in]: devicesWithChangedDiffApps
      },
      type: types.diff
    },
    attributes: [
      'deviceId',
      'version',
      'data'
    ],
    transaction: transaction.legacy.transaction
  })).map((item) => ({
    deviceId: item.deviceId,
    version: item.version,
    data: item.data
  }))

  return updatedDeviceIds.map((deviceId) => {
    const appsBase = updatedBaseApps.find((item) => item.deviceId === deviceId)
    const appsDiff = updatedDiffApps.find((item) => item.deviceId === deviceId)

    return {
      deviceId,
      appsBase: appsBase ? wrapServerCryptContainer(appsBase) : undefined,
      appsDiff: appsDiff ? wrapServerCryptContainer(appsDiff) : undefined
    }
  })
}

function wrapServerCryptContainer({ version, data }: { version: string, data: Buffer }): ServerCryptContainer {
  return {
    version,
    data: data.toString('base64')
  }
}
