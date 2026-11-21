/*
 * server component for the TimeLimit App
 * Copyright (C) 2019 - 2024 Jonas Lochmann
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
import { familyIdColumn, idWithinFamilyColumn, versionColumn, timestampColumn } from './columns.js'
import { SequelizeAttributes } from './types.js'

export const config = {
  generateNewKeyAfterAge: 1000 * 60 * 60 * 24,
  generationTimeRounding: 1000 * 60 * 60,
  expireDelay: 1000 * 60 * 60 * 2,
  expireTimeRounding: 1000 * 60 * 15
}

export function calculateExpireTime(now: bigint): bigint {
  const expireBaseTime = now + BigInt(config.expireDelay)
  const expireTime = expireBaseTime - expireBaseTime % BigInt(config.expireTimeRounding) + BigInt(config.expireTimeRounding)

  return expireTime
}

interface DeviceDhKeyAttributesVersion1 {
  familyId: string
  deviceId: string
  version: string
  createdAt: string
  expireAt: string | null
  publicKey: Buffer
  privateKey: Buffer
}

interface DeviceDhKeyAttributesVersion2 {
  createdAtSubsequence: number
}

export type DeviceDhKeyAttributes = DeviceDhKeyAttributesVersion1 & DeviceDhKeyAttributesVersion2

export type DeviceDhKeyModel = Sequelize.Model<DeviceDhKeyAttributes> & DeviceDhKeyAttributes
export type DeviceDhKeyModelStatic = typeof Sequelize.Model & {
  new (values?: object, options?: Sequelize.BuildOptions): DeviceDhKeyModel;
}

export const attributesVersion1: SequelizeAttributes<DeviceDhKeyAttributesVersion1> = {
  familyId: {
    ...familyIdColumn,
    primaryKey: true
  },
  deviceId: {
    ...idWithinFamilyColumn,
    primaryKey: true
  },
  version: {
    ...versionColumn,
    primaryKey: true
  },
  createdAt: {
    ...timestampColumn
  },
  expireAt: {
    ...timestampColumn,
    allowNull: true
  },
  publicKey: {
    type: Sequelize.BLOB,
    allowNull: false
  },
  privateKey: {
    type: Sequelize.BLOB,
    allowNull: false
  }
}

export const attributesVersion2: SequelizeAttributes<DeviceDhKeyAttributesVersion2> = {
  createdAtSubsequence: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}

export const attributes: SequelizeAttributes<DeviceDhKeyAttributes> = {
  ...attributesVersion1,
  ...attributesVersion2
}

export const createDeviceDhKey = (sequelize: Sequelize.Sequelize): DeviceDhKeyModelStatic => sequelize.define('DeviceDhKey', attributes) as DeviceDhKeyModelStatic
