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

export interface KeyResponseAttributes {
  familyId: string
  receiverDeviceId: string
  requestServerSequenceNumber: string // fk to request table with familyId
  senderDeviceId: string // pk up to this
  replyServerSequenceNumber: string // unique with familyId, receiverDeviceId
  requestClientSequenceNumber: string
  tempKey: Buffer
  encryptedKey: Buffer
  signature: Buffer
}

export type KeyResponseModel = Sequelize.Model<KeyResponseAttributes> & KeyResponseAttributes
export type KeyResponseModelStatic = typeof Sequelize.Model & {
  new (values?: object, options?: Sequelize.BuildOptions): KeyResponseModel;
}

export const attributes: SequelizeAttributes<KeyResponseAttributes> = {
  familyId: {
    ...familyIdColumn,
    primaryKey: true
  },
  receiverDeviceId: {
    ...idWithinFamilyColumn
  },
  requestServerSequenceNumber: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    allowNull: false
  },
  senderDeviceId: {
    ...idWithinFamilyColumn
  },
  replyServerSequenceNumber: {
    type: Sequelize.BIGINT,
    allowNull: false
  },
  requestClientSequenceNumber: {
    type: Sequelize.BIGINT,
    allowNull: false
  },
  tempKey: {
    type: Sequelize.BLOB,
    allowNull: false
  },
  encryptedKey: {
    type: Sequelize.BLOB,
    allowNull: false
  },
  signature: {
    type: Sequelize.BLOB,
    allowNull: false
  }
}

export const createKeyResponseModel = (sequelize: Sequelize.Sequelize): KeyResponseModelStatic => sequelize.define('KeyResponse', attributes) as KeyResponseModelStatic
