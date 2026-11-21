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
import { createHash } from 'crypto'
import { familyIdColumn, idWithinFamilyColumn, timestampColumn } from './columns.js'
import { SequelizeAttributes } from './types.js'
import { intToBuffer } from '../util/binary-number.js'

export function getU2fKeyId({ keyHandle, publicKey }: {
  keyHandle: Buffer
  publicKey: Buffer
}) {
  return createHash('sha256')
    .update(intToBuffer(keyHandle.length))
    .update(keyHandle)
    .update(intToBuffer(publicKey.length))
    .update(publicKey)
    .digest()
    .slice(0, 6)
    .toString('base64')
}

export interface U2fKeyAttributes {
  familyId: string
  keyId: string
  userId: string
  addedAt: string
  keyHandle: Buffer
  publicKey: Buffer
  nextCounter: string
}

export type U2fKeyModel = Sequelize.Model<U2fKeyAttributes> & U2fKeyAttributes
export type U2fKeyModelStatic = typeof Sequelize.Model & {
  new (values?: object, options?: Sequelize.BuildOptions): U2fKeyModel;
}

export const attributes: SequelizeAttributes<U2fKeyAttributes> = {
  familyId: {
    ...familyIdColumn,
    primaryKey: true
  },
  keyId: {
    type: Sequelize.STRING(8),
    primaryKey: true
  },
  userId: {
    ...idWithinFamilyColumn
  },
  addedAt: {
    ...timestampColumn
  },
  keyHandle: {
    type: Sequelize.BLOB,
    allowNull: false
  },
  publicKey: {
    type: Sequelize.BLOB,
    allowNull: false
  },
  nextCounter: {
    type: Sequelize.BIGINT,
    allowNull: false
  }
}

export const createU2fKeyModel = (sequelize: Sequelize.Sequelize): U2fKeyModelStatic => sequelize.define('U2fKey', attributes) as U2fKeyModelStatic
