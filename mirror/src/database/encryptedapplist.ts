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
import { familyIdColumn, idWithinFamilyColumn, versionColumn } from './columns.js'
import { SequelizeAttributes } from './types.js'

export interface EncryptedAppListAttributes {
  familyId: string
  deviceId: string
  type: number
  version: string
  data: Buffer
}

export const types = {
  base: 1,
  diff: 2
}

export type EncryptedAppListModel = Sequelize.Model<EncryptedAppListAttributes> & EncryptedAppListAttributes
export type EncryptedAppListModelStatic = typeof Sequelize.Model & {
  new (values?: object, options?: Sequelize.BuildOptions): EncryptedAppListModel;
}

export const attributes: SequelizeAttributes<EncryptedAppListAttributes> = {
  familyId: {
    ...familyIdColumn,
    primaryKey: true
  },
  deviceId: {
    ...idWithinFamilyColumn,
    primaryKey: true
  },
  type: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    validate: {
      min: 1,
      max: 2
    }
  },
  version: {
    ...versionColumn
  },
  data: {
    type: Sequelize.BLOB,
    allowNull: false
  }
}

export const createEncryptedAppListModel = (sequelize: Sequelize.Sequelize): EncryptedAppListModelStatic => sequelize.define('EncryptedAppList', attributes) as EncryptedAppListModelStatic
