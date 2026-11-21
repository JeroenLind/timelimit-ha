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

interface SessionDurationAttributesVersion1 {
  familyId: string
  categoryId: string
  maxSessionDuration: number
  sessionPauseDuration: number
  startMinuteOfDay: number
  endMinuteOfDay: number
  lastUsage: string
  lastSessionDuration: number
  // used for deleting old items, set by the server
  roundedLastUpdate: string
}

export type SessionDurationAttributes = SessionDurationAttributesVersion1

export type SessionDurationModel = Sequelize.Model<SessionDurationAttributes> & SessionDurationAttributes
export type SessionDurationModelStatic = typeof Sequelize.Model & {
  new (values?: object, options?: Sequelize.BuildOptions): SessionDurationModel;
}

export const attributesVersion1: SequelizeAttributes<SessionDurationAttributesVersion1> = {
  familyId: {
    ...familyIdColumn,
    primaryKey: true
  },
  categoryId: {
    ...idWithinFamilyColumn,
    primaryKey: true
  },
  maxSessionDuration: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    validate: {
      min: 1
    }
  },
  sessionPauseDuration: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    validate: {
      min: 1
    }
  },
  startMinuteOfDay: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    validate: {
      min: MinuteOfDay.MIN,
      max: MinuteOfDay.MAX
    }
  },
  endMinuteOfDay: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    validate: {
      min: MinuteOfDay.MIN,
      max: MinuteOfDay.MAX,
      customValidator (endMinuteOfDay: unknown) {
        const startMinuteOfDay = this.startMinuteOfDay

        if (typeof endMinuteOfDay !== 'number' || typeof startMinuteOfDay !== 'number') {
          throw new ValidationException({ staticMessage: 'wrong data types for start and end minute at the session duration' })
        }

        if (startMinuteOfDay > endMinuteOfDay) {
          throw new ValidationException({ staticMessage: 'startMinuteOfDay must not be bigger than endMinuteOfDay for a session duration' })
        }
      }
    }
  },
  lastUsage: { ...timestampColumn },
  lastSessionDuration: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  roundedLastUpdate: { ...timestampColumn }
}

export const attributes: SequelizeAttributes<SessionDurationAttributes> = {
  ...attributesVersion1
}

export const createSessionDurationModel = (sequelize: Sequelize.Sequelize): SessionDurationModelStatic => sequelize.define('SessionDuration', attributes) as SessionDurationModelStatic
