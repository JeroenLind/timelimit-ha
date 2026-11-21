/*
 * server component for the TimeLimit App
 * Copyright (C) 2019 - 2020 Jonas Lochmann
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

export interface CategoryNetworkIdAttributes {
  familyId: string
  categoryId: string
  networkItemId: string
  hashedNetworkId: string
}

export type CategoryNetworkIdModel = Sequelize.Model<CategoryNetworkIdAttributes> & CategoryNetworkIdAttributes
export type CategoryNetworkIdModelStatic = typeof Sequelize.Model & {
  new (values?: object, options?: Sequelize.BuildOptions): CategoryNetworkIdModel;
}

export const anonymizedNetworkIdLength = 8
export const maxNetworkIdsPerCategory = 8

export const attributes: SequelizeAttributes<CategoryNetworkIdAttributes> = {
  familyId: {
    ...familyIdColumn,
    primaryKey: true
  },
  categoryId: {
    ...idWithinFamilyColumn,
    primaryKey: true
  },
  networkItemId: {
    ...idWithinFamilyColumn,
    primaryKey: true
  },
  hashedNetworkId: {
    type: Sequelize.STRING(anonymizedNetworkIdLength),
    allowNull: false,
    validate: {
      notEmpty: true,
      is: /^([0-9a-f]{8})?$/
    }
  }
}

export const createCategoryNetworkIdModel = (sequelize: Sequelize.Sequelize): CategoryNetworkIdModelStatic => sequelize.define('CategoryNetworkId', attributes) as CategoryNetworkIdModelStatic
