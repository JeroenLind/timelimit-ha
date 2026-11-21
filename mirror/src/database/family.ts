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
import { booleanColumn, familyIdColumn, optionalLabelColumn, timestampColumn, versionColumn } from './columns.js'
import { SequelizeAttributes } from './types.js'

export interface FamilyAttributesVersion1 {
  familyId: string
  name: string
  createdAt: string
  userListVersion: string
  deviceListVersion: string
  fullVersionUntil: string
  hasFullVersion: boolean
}

export interface FamilyAttributesVersion2 {
  nextServerKeyRequestSeq: string
}

export interface FamilyAttributesVersion3 {
  u2fKeysVersion: string
}

export interface FamilyAttributesVersion4 {
  fullVersionDebts: string
}

export type FamilyAttributes = FamilyAttributesVersion1 &
  FamilyAttributesVersion2 & FamilyAttributesVersion3 &
  FamilyAttributesVersion4

export type FamilyModel = Sequelize.Model<FamilyAttributes> & FamilyAttributes
export type FamilyModelStatic = typeof Sequelize.Model & {
  new (values?: object, options?: Sequelize.BuildOptions): FamilyModel;
}

export const attributesVersion1: SequelizeAttributes<FamilyAttributesVersion1> = {
  familyId: {
    ...familyIdColumn,
    primaryKey: true
  },
  name: { ...optionalLabelColumn },
  createdAt: { ...timestampColumn },
  userListVersion: { ...versionColumn },
  deviceListVersion: { ...versionColumn },
  fullVersionUntil: { ...timestampColumn },
  hasFullVersion: { ...booleanColumn }
}

export const attributesVersion2: SequelizeAttributes<FamilyAttributesVersion2> = {
  nextServerKeyRequestSeq: {
    type: Sequelize.BIGINT,
    allowNull: false,
    defaultValue: 1,
    validate: {
      min: 1
    }
  }
}

export const attributesVersion3: SequelizeAttributes<FamilyAttributesVersion3> = {
  u2fKeysVersion: {
    ...versionColumn,
    defaultValue: '0000'
  }
}

export const attributesVersion4: SequelizeAttributes<FamilyAttributesVersion4> = {
  fullVersionDebts: {
    type: Sequelize.BIGINT,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    }
  }
}

export const attributes: SequelizeAttributes<FamilyAttributes> = {
  ...attributesVersion1,
  ...attributesVersion2,
  ...attributesVersion3,
  ...attributesVersion4
}

export const createFamilyModel = (sequelize: Sequelize.Sequelize): FamilyModelStatic => sequelize.define('Family', attributes) as FamilyModelStatic
