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
import { authTokenColumn } from './columns.js'
import { SequelizeAttributes } from './types.js'

export interface OldDeviceAttributes {
  deviceAuthToken: string
}

export type OldDeviceModel = Sequelize.Model<OldDeviceAttributes> & OldDeviceAttributes
export type OldDeviceModelStatic = typeof Sequelize.Model & {
  new (values?: object, options?: Sequelize.BuildOptions): OldDeviceModel;
}

export const attributes: SequelizeAttributes<OldDeviceAttributes> = {
  deviceAuthToken: {
    ...authTokenColumn,
    primaryKey: true
  }
}

export const createOldDeviceModel = (sequelize: Sequelize.Sequelize): OldDeviceModelStatic => sequelize.define('OldDevice', attributes) as OldDeviceModelStatic
