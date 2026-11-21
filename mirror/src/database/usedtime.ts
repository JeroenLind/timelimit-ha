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
import { ValidationException } from '../exception/index.js'
import { MinuteOfDay } from '../util/minuteofday.js'
import { familyIdColumn, idWithinFamilyColumn, timestampColumn } from './columns.js'
import { SequelizeAttributes } from './types.js'

export interface UsedTimeAttributesVersion1 {
  familyId: string
  categoryId: string
  dayOfEpoch: number
  usedTime: number
}

export interface UsedTimeAttributesVersion2 {
  lastUpdate: string
}

export interface UsedTimeAttributesVersion3 {
  startMinuteOfDay: number
  endMinuteOfDay: number
}

export type UsedTimeAttributes = UsedTimeAttributesVersion1 &
  UsedTimeAttributesVersion2 & UsedTimeAttributesVersion3

export type UsedTimeModel = Sequelize.Model<UsedTimeAttributes> & UsedTimeAttributes
export type UsedTimeModelStatic = typeof Sequelize.Model & {
  new (values?: object, options?: Sequelize.BuildOptions): UsedTimeModel;
}

export const attributesVersion1: SequelizeAttributes<UsedTimeAttributesVersion1> = {
  familyId: {
    ...familyIdColumn,
    primaryKey: true
  },
  categoryId: {
    ...idWithinFamilyColumn,
    primaryKey: true
  },
  dayOfEpoch: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    },
    primaryKey: true
  },
  usedTime: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  }
}

export const attributesVersion2: SequelizeAttributes<UsedTimeAttributesVersion2> = {
  lastUpdate: {
    ...timestampColumn,
    defaultValue: 0
  }
}

export const attributesVersion3: SequelizeAttributes<UsedTimeAttributesVersion3> = {
  startMinuteOfDay: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: MinuteOfDay.MIN,
    primaryKey: true,
    validate: {
      min: MinuteOfDay.MIN,
      max: MinuteOfDay.MAX
    }
  },
  endMinuteOfDay: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: MinuteOfDay.MAX,
    primaryKey: true,
    validate: {
      min: MinuteOfDay.MIN,
      max: MinuteOfDay.MAX,
      customValidator (endMinuteOfDay: unknown) {
        const startMinuteOfDay = this.startMinuteOfDay

        if (typeof endMinuteOfDay !== 'number' || typeof startMinuteOfDay !== 'number') {
          throw new ValidationException({ staticMessage: 'wrong data types for start and end minute at the used time' })
        }

        if (startMinuteOfDay > endMinuteOfDay) {
          throw new ValidationException({ staticMessage: 'startMinuteOfDay must not be bigger than endMinuteOfDay for a used time' })
        }
      }
    }
  }
}

export const attributes: SequelizeAttributes<UsedTimeAttributesVersion3> = {
  ...attributesVersion1,
  ...attributesVersion2,
  ...attributesVersion3
}

export const createUsedTimeModel = (sequelize: Sequelize.Sequelize): UsedTimeModelStatic => sequelize.define('UsedTime', attributes) as UsedTimeModelStatic
