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

export interface CategoryAppAttributes {
  familyId: string
  categoryId: string
  packageName: string
}

export type CategoryAppModel = Sequelize.Model<CategoryAppAttributes> & CategoryAppAttributes
export type CategoryAppModelStatic = typeof Sequelize.Model & {
  new (values?: object, options?: Sequelize.BuildOptions): CategoryAppModel;
}

export const attributes: SequelizeAttributes<CategoryAppAttributes> = {
  familyId: {
    ...familyIdColumn,
    primaryKey: true
  },
  categoryId: {
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
  }
}

export const createCategoryAppModel = (sequelize: Sequelize.Sequelize): CategoryAppModelStatic => sequelize.define('CategoryApp', attributes) as CategoryAppModelStatic
