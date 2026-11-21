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
import { authTokenColumn, timestampColumn } from './columns.js'
import { SequelizeAttributes } from './types.js'

export interface AuthTokenAttributesVersion1 {
  token: string
  mail: string
  createdAt: string
}

export interface AuthTokenAttributesVersion2 {
  locale: string
}

export type AuthTokenAttributes = AuthTokenAttributesVersion1 & AuthTokenAttributesVersion2

export type AuthTokenModel = Sequelize.Model<AuthTokenAttributes> & AuthTokenAttributes
export type AuthTokenModelStatic = typeof Sequelize.Model & {
  new (values?: object, options?: Sequelize.BuildOptions): AuthTokenModel;
}

export const attributesVersion1: SequelizeAttributes<AuthTokenAttributesVersion1> = {
  token: {
    ...authTokenColumn,
    primaryKey: true
  },
  mail: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  createdAt: { ...timestampColumn }
}

export const attributesVersion2: SequelizeAttributes<AuthTokenAttributesVersion2> = {
  locale: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'en'
  }
}

export const attributes: SequelizeAttributes<AuthTokenAttributes> = {
  ...attributesVersion1,
  ...attributesVersion2
}

export const createAuthtokenModel = (sequelize: Sequelize.Sequelize): AuthTokenModelStatic => sequelize.define('AuthToken', attributes) as AuthTokenModelStatic
