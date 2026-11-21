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
import { familyIdColumn, idWithinFamilyColumn, optionalLabelColumn } from './columns.js'
import { SequelizeAttributes } from './types.js'

export interface AppActivityAttributes {
  familyId: string
  deviceId: string
  packageName: string
  activityName: string
  title: string
}

export type AppActivityModel = Sequelize.Model<AppActivityAttributes> & AppActivityAttributes
export type AppActivityModelStatic = typeof Sequelize.Model & {
  new (values?: object, options?: Sequelize.BuildOptions): AppActivityModel;
}

export const maxPackageNameLength = 255
export const maxActivityNameLength = 255

export const attributes: SequelizeAttributes<AppActivityAttributes> = {
  familyId: {
    ...familyIdColumn,
    primaryKey: true
  },
  deviceId: {
    ...idWithinFamilyColumn,
    primaryKey: true
  },
  packageName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    },
    primaryKey: true
  },
  activityName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    },
    primaryKey: true
  },
  title: { ...optionalLabelColumn }
}

export const createAppActivityModel = (sequelize: Sequelize.Sequelize): AppActivityModelStatic => sequelize.define('AppActivity', attributes) as AppActivityModelStatic
