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
import { familyIdColumn, idWithinFamilyColumn } from './columns.js'
import { SequelizeAttributes } from './types.js'

export interface KeyRequestAttributes {
  familyId: string
  serverSequenceNumber: string
  senderDeviceId: string
  senderSequenceNumber: string
  deviceId: string | null
  categoryId: string | null
  type: number
  tempKey: Buffer
  signature: Buffer
}

export const types = {
  appListBase: 1,
  appListDiff: 2,
  all: [1, 2]
}

export type KeyRequestModel = Sequelize.Model<KeyRequestAttributes> & KeyRequestAttributes
export type KeyRequestModelStatic = typeof Sequelize.Model & {
  new (values?: object, options?: Sequelize.BuildOptions): KeyRequestModel;
}

export const attributes: SequelizeAttributes<KeyRequestAttributes> = {
  familyId: {
    ...familyIdColumn,
    primaryKey: true
  },
  serverSequenceNumber: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    allowNull: false
  },
  senderDeviceId: {
    ...idWithinFamilyColumn
  },
  senderSequenceNumber: {
    type: Sequelize.BIGINT,
    allowNull: false
  },
  deviceId: {
    ...idWithinFamilyColumn,
    allowNull: true
  },
  categoryId: {
    ...idWithinFamilyColumn,
    allowNull: true
  },
  type: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      isIn: [types.all]
    }
  },
  tempKey: {
    type: Sequelize.BLOB,
    allowNull: false
  },
  signature: {
    type: Sequelize.BLOB,
    allowNull: false
  }
}

export const createKeyRequestModel = (sequelize: Sequelize.Sequelize): KeyRequestModelStatic => sequelize.define('KeyRequest', attributes) as KeyRequestModelStatic
