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
import { serializedBitmaskRegex } from '../util/bitmask.js'
import { booleanColumn, familyIdColumn, idWithinFamilyColumn, labelColumn, optionalIdWithinFamilyColumn, timestampColumn, versionColumn } from './columns.js'
import { SequelizeAttributes } from './types.js'

export const allowedTimeWarningFlags = 1 | 2 | 4 | 8 | 16

export const categoryFlags = {
  hasBlockedNetworkList: 1
}

export const maxCategoryFlags = categoryFlags.hasBlockedNetworkList

export interface CategoryAttributesVersion1 {
  familyId: string
  categoryId: string
  childId: string
  title: string
  blockedMinutesInWeek: string
  extraTimeInMillis: number
  temporarilyBlocked: boolean
  baseVersion: string
  assignedAppsVersion: string
  timeLimitRulesVersion: string
  usedTimesVersion: string
}

export interface CategoryAttributesVersion2 {
  parentCategoryId: string
}

export interface CategoryAttributesVersion3 {
  blockAllNotifications: boolean
}

export interface CategoryAttributesVersion4 {
  timeWarningFlags: number
}

export interface CategoryAttributesVersion5 {
  minBatteryCharging: number
  minBatteryMobile: number
}

export interface CategoryAttributesVersion6 {
  temporarilyBlockedEndTime: string
}

export interface CategoryAttributesVersion7 {
  sort: number
}

export interface CategoryAttributesVersion8 {
  extraTimeDay: number
}

export interface CategoryAttributesVersion9 {
  disableLimitsUntil: string
}

export interface CategoryAttributesVersion10 {
  taskListVersion: string
}

export interface CategoryAttributesVersion11 {
  flags: string
}

export interface CategoryAttributesVersion12 {
  blockNotificationDelay: string
}

export type CategoryAttributes = CategoryAttributesVersion1 & CategoryAttributesVersion2 &
  CategoryAttributesVersion3 & CategoryAttributesVersion4 & CategoryAttributesVersion5 &
  CategoryAttributesVersion6 & CategoryAttributesVersion7 & CategoryAttributesVersion8 &
  CategoryAttributesVersion9 & CategoryAttributesVersion10 & CategoryAttributesVersion11 &
  CategoryAttributesVersion12

export type CategoryModel = Sequelize.Model<CategoryAttributes> & CategoryAttributes
export type CategoryModelStatic = typeof Sequelize.Model & {
  new (values?: object, options?: Sequelize.BuildOptions): CategoryModel;
}

export const attributesVersion1: SequelizeAttributes<CategoryAttributesVersion1> = {
  familyId: {
    ...familyIdColumn,
    primaryKey: true
  },
  categoryId: {
    ...idWithinFamilyColumn,
    primaryKey: true
  },
  childId: { ...idWithinFamilyColumn },
  title: { ...labelColumn },
  blockedMinutesInWeek: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      is: serializedBitmaskRegex
    }
  },
  extraTimeInMillis: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  temporarilyBlocked: { ...booleanColumn },
  baseVersion: { ...versionColumn },
  assignedAppsVersion: { ...versionColumn },
  timeLimitRulesVersion: { ...versionColumn },
  usedTimesVersion: { ...versionColumn }
}

export const attributesVersion2: SequelizeAttributes<CategoryAttributesVersion2> = {
  parentCategoryId: {
    ...optionalIdWithinFamilyColumn,
    defaultValue: ''
  }
}

export const attributesVersion3: SequelizeAttributes<CategoryAttributesVersion3> = {
  blockAllNotifications: {
    ...booleanColumn,
    defaultValue: false
  }
}

export const attributesVersion4: SequelizeAttributes<CategoryAttributesVersion4> = {
  timeWarningFlags: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
    validate: {
      min: 0,
      max: allowedTimeWarningFlags
      // 1 => 1 minute
      // 2 => 3 minutes
      // 4 => 5 minutes
      // 8 => 10 minutes
      // 16 => 15 minutes
    }
  }
}

export const attributesVersion5: SequelizeAttributes<CategoryAttributesVersion5> = {
  minBatteryMobile: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
    validate: {
      min: 0,
      max: 100
    }
  },
  minBatteryCharging: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
    validate: {
      min: 0,
      max: 100
    }
  }
}

export const attributesVersion6: SequelizeAttributes<CategoryAttributesVersion6> = {
  temporarilyBlockedEndTime: {
    ...timestampColumn,
    defaultValue: 0
  }
}

export const attributesVersion7: SequelizeAttributes<CategoryAttributesVersion7> = {
  sort: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    }
  }
}

export const attributesVersion8: SequelizeAttributes<CategoryAttributesVersion8> = {
  extraTimeDay: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: -1,
    validate: {
      min: -1
    }
  }
}

export const attributesVersion9: SequelizeAttributes<CategoryAttributesVersion9> = {
  disableLimitsUntil: {
    ...timestampColumn,
    defaultValue: 0
  }
}

export const attributesVersion10: SequelizeAttributes<CategoryAttributesVersion10> = {
  taskListVersion: {
    ...versionColumn,
    defaultValue: 'abcd'
  }
}

export const attributesVersion11: SequelizeAttributes<CategoryAttributesVersion11> = {
  flags: {
    type: Sequelize.BIGINT,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0,
      max: maxCategoryFlags
    }
  }
}

export const attributesVersion12: SequelizeAttributes<CategoryAttributesVersion12> = {
  blockNotificationDelay: {
    type: Sequelize.BIGINT,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    }
  }
}

export const attributes: SequelizeAttributes<CategoryAttributes> = {
  ...attributesVersion1,
  ...attributesVersion2,
  ...attributesVersion3,
  ...attributesVersion4,
  ...attributesVersion5,
  ...attributesVersion6,
  ...attributesVersion7,
  ...attributesVersion8,
  ...attributesVersion9,
  ...attributesVersion10,
  ...attributesVersion11,
  ...attributesVersion12
}

export const createCategoryModel = (sequelize: Sequelize.Sequelize): CategoryModelStatic => sequelize.define('Category', attributes) as CategoryModelStatic
