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
import { AppRecommendation, appRecommendationValues } from '../model/apprecommendation.js'
import { booleanColumn, createEnumColumn, familyIdColumn, idWithinFamilyColumn, optionalLabelColumn } from './columns.js'
import { SequelizeAttributes } from './types.js'

export interface AppAttributes {
  familyId: string
  deviceId: string
  packageName: string
  title: string
  isLaunchable: boolean
  recommendation: AppRecommendation
}

export type AppModel = Sequelize.Model<AppAttributes> & AppAttributes
export type AppModelStatic = typeof Sequelize.Model & {
  new (values?: object, options?: Sequelize.BuildOptions): AppModel;
}

export const maxPackageNameLength = 255

export const attributes: SequelizeAttributes<AppAttributes> = {
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
  title: { ...optionalLabelColumn },
  isLaunchable: { ...booleanColumn },
  recommendation: createEnumColumn(appRecommendationValues)
}

export const createAppModel = (sequelize: Sequelize.Sequelize): AppModelStatic => sequelize.define('App', attributes) as AppModelStatic
