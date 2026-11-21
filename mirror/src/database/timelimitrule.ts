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
import { booleanColumn, familyIdColumn, idWithinFamilyColumn } from './columns.js'
import { SequelizeAttributes } from './types.js'

interface TimelimitRuleAttributesVersion1 {
  familyId: string
  ruleId: string
  categoryId: string
  applyToExtraTimeUsage: boolean
  dayMaskAsBitmask: number
  maximumTimeInMillis: number
}

interface TimelimitRuleAttributesVersion2 {
  startMinuteOfDay: number
  endMinuteOfDay: number
  sessionDurationMilliseconds: number
  sessionPauseMilliseconds: number
}

interface TimelimitRuleAttributesVersion3 {
  perDay: number
}

interface TimelimitRuleAttributesVersion4 {
  expiresAt: string | null
}

type TimelimitRuleAttributes = TimelimitRuleAttributesVersion1 &
  TimelimitRuleAttributesVersion2 & TimelimitRuleAttributesVersion3 &
  TimelimitRuleAttributesVersion4

export type TimelimitRuleModel = Sequelize.Model<TimelimitRuleAttributes> & TimelimitRuleAttributes
export type TimelimitRuleModelStatic = typeof Sequelize.Model & {
  new (values?: object, options?: Sequelize.BuildOptions): TimelimitRuleModel;
}

export const attributesVersion1: SequelizeAttributes<TimelimitRuleAttributesVersion1> = {
  familyId: {
    ...familyIdColumn,
    primaryKey: true
  },
  ruleId: {
    ...idWithinFamilyColumn,
    primaryKey: true
  },
  categoryId: { ...idWithinFamilyColumn },
  applyToExtraTimeUsage: { ...booleanColumn },
  dayMaskAsBitmask: {
    type: Sequelize.SMALLINT,
    allowNull: false,
    validate: {
      min: 0,
      max: 1 | 2 | 4 | 8 | 16 | 32 | 64
    }
  },
  maximumTimeInMillis: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  }
}

export const attributesVersion2: SequelizeAttributes<TimelimitRuleAttributesVersion2> = {
  startMinuteOfDay: {
    type: Sequelize.INTEGER,
    validate: {
      min: MinuteOfDay.MIN,
      max: MinuteOfDay.MAX
    },
    allowNull: false,
    defaultValue: MinuteOfDay.MIN
  },
  endMinuteOfDay: {
    type: Sequelize.INTEGER,
    validate: {
      min: MinuteOfDay.MIN,
      max: MinuteOfDay.MAX,
      customValidator (endMinuteOfDay: unknown) {
        const startMinuteOfDay = this.startMinuteOfDay

        if (typeof endMinuteOfDay !== 'number' || typeof startMinuteOfDay !== 'number') {
          throw new ValidationException({ staticMessage: 'wrong data types for start and end minute at the time limit rule' })
        }

        if (startMinuteOfDay > endMinuteOfDay) {
          throw new ValidationException({ staticMessage: 'startMinuteOfDay must not be bigger than endMinuteOfDay for a time limit rule' })
        }
      }
    },
    allowNull: false,
    defaultValue: MinuteOfDay.MAX
  },
  sessionDurationMilliseconds: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    },
    allowNull: false,
    defaultValue: 0
  },
  sessionPauseMilliseconds: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    },
    allowNull: false,
    defaultValue: 0
  }
}

export const attributesVersion3: SequelizeAttributes<TimelimitRuleAttributesVersion3> = {
  perDay: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 1
    },
    allowNull: false,
    defaultValue: 0
  }
}

export const attributesVersion4: SequelizeAttributes<TimelimitRuleAttributesVersion4> = {
  expiresAt: {
    type: Sequelize.BIGINT,
    validate: {
      min: 1
    },
    allowNull: true,
    defaultValue: null
  }
}

export const attributes: SequelizeAttributes<TimelimitRuleAttributes> = {
  ...attributesVersion1,
  ...attributesVersion2,
  ...attributesVersion3,
  ...attributesVersion4
}

export const createTimelimitRuleModel = (sequelize: Sequelize.Sequelize): TimelimitRuleModelStatic => sequelize.define('TimelimitRule', attributes) as TimelimitRuleModelStatic
