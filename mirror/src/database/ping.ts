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

export interface PingAttributes {
  familyId: string
  receiverDeviceId: string
  senderDeviceId: string
  type: number
  token: string
}

export const types = {
  ping: 1,
  pong: 2,
  all: [1, 2]
}

export type PingModel = Sequelize.Model<PingAttributes> & PingAttributes
export type PingModelStatic = typeof Sequelize.Model & {
  new (values?: object, options?: Sequelize.BuildOptions): PingModel;
}

export const attributes: SequelizeAttributes<PingAttributes> = {
  familyId: {
    ...familyIdColumn,
    primaryKey: true
  },
  receiverDeviceId: {
    ...idWithinFamilyColumn,
    primaryKey: true
  },
  senderDeviceId: {
    ...idWithinFamilyColumn,
    primaryKey: true
  },
  type: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      isIn: [types.all]
    },
    primaryKey: true
  },
  token: {
    ...idWithinFamilyColumn
  }
}

export const createPingModel = (sequelize: Sequelize.Sequelize): PingModelStatic => sequelize.define('Ping', attributes) as PingModelStatic
