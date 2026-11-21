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
import { familyIdColumn, idWithinFamilyColumn, labelColumn, timestampColumn } from './columns.js'
import { SequelizeAttributes } from './types.js'

export interface AddDeviceTokenAttributes {
  token: string
  familyId: string
  deviceId: string
  createdAt: string
}

export type AddDeviceTokenModel = Sequelize.Model<AddDeviceTokenAttributes> & AddDeviceTokenAttributes
export type AddDeviceTokenModelStatic = typeof Sequelize.Model & {
  new (values?: object, options?: Sequelize.BuildOptions): AddDeviceTokenModel;
}

export const attributes: SequelizeAttributes<AddDeviceTokenAttributes> = {
  token: {
    ...labelColumn,
    primaryKey: true
  },
  familyId: { ...familyIdColumn },
  deviceId: { ...idWithinFamilyColumn },
  createdAt: { ...timestampColumn }
}

export const createAddDeviceTokenModel = (sequelize: Sequelize.Sequelize): AddDeviceTokenModelStatic => sequelize.define('AddDeviceToken', attributes) as AddDeviceTokenModelStatic
