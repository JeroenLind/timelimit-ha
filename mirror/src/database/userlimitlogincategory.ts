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

export const maxPreBlockDuration = 1000 * 60 * 60 * 24 // 1 day

export interface UserLimitLoginCategoryAttributesVersion1 {
  familyId: string
  userId: string
  categoryId: string
}

export interface UserLimitLoginCategoryAttributesVersion2 {
  preBlockDuration: number
}

export type UserLimitLoginCategoryAttributes = UserLimitLoginCategoryAttributesVersion1 & UserLimitLoginCategoryAttributesVersion2

export type UserLimitLoginCategoryModel = Sequelize.Model<UserLimitLoginCategoryAttributes> & UserLimitLoginCategoryAttributes
export type UserLimitLoginCategoryModelStatic = typeof Sequelize.Model & {
  new (values?: object, options?: Sequelize.BuildOptions): UserLimitLoginCategoryModel;
}

export const attributesVersion1: SequelizeAttributes<UserLimitLoginCategoryAttributesVersion1> = {
  familyId: { ...familyIdColumn, primaryKey: true },
  userId: { ...idWithinFamilyColumn, primaryKey: true },
  categoryId: { ...idWithinFamilyColumn }
}

export const attributesVersion2: SequelizeAttributes<UserLimitLoginCategoryAttributesVersion2> = {
  preBlockDuration: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: maxPreBlockDuration
    },
    allowNull: false,
    defaultValue: 0
  }
}

export const attributes: SequelizeAttributes<UserLimitLoginCategoryAttributes> = {
  ...attributesVersion1,
  ...attributesVersion2
}

export const createUserLimitLoginCategoryModel = (sequelize: Sequelize.Sequelize): UserLimitLoginCategoryModelStatic => sequelize.define('UserLimitLoginCategory', attributes) as UserLimitLoginCategoryModelStatic
