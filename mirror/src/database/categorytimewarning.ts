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

export const categoryTimeWarningConstants = {
  minMinutes: 1,
  maxMinutes: 60 * 24 * 7 - 2
}

export interface CategoryTimeWarningAttributes {
  familyId: string
  categoryId: string
  minutes: number
}

export type CategoryTimeWarningModel = Sequelize.Model<CategoryTimeWarningAttributes> & CategoryTimeWarningAttributes
export type CategoryTimeWarningModelStatic = typeof Sequelize.Model & {
  new (values?: object, options?: Sequelize.BuildOptions): CategoryTimeWarningModel;
}

export const attributes: SequelizeAttributes<CategoryTimeWarningAttributes> = {
  familyId: {
    ...familyIdColumn,
    primaryKey: true
  },
  categoryId: {
    ...idWithinFamilyColumn,
    primaryKey: true
  },
  minutes: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: categoryTimeWarningConstants.minMinutes,
      max: categoryTimeWarningConstants.maxMinutes
    },
    primaryKey: true
  }
}

export const createCategoryTimeWarningModel = (sequelize: Sequelize.Sequelize): CategoryTimeWarningModelStatic => sequelize.define('CategoryTimeWarning', attributes) as CategoryTimeWarningModelStatic
