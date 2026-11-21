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

import { QueryInterface, Sequelize, Transaction } from 'sequelize'
import { MinuteOfDay } from '../../../util/minuteofday.js'
import { attributesVersion1 as sessionDurationAttributes } from '../../sessionduration.js'
import { attributesVersion2 as timelimitRuleAttributes } from '../../timelimitrule.js'
import {
  attributesVersion1 as usedTimeAttributesVersion1,
  attributesVersion2 as usedTimeAttributesVersion2,
  attributesVersion3 as usedTimeAttributesVersion3
} from '../../usedtime.js'

export async function up (queryInterface: QueryInterface, sequelize: Sequelize) {
  await sequelize.transaction({
    type: Transaction.TYPES.EXCLUSIVE
  }, async (transaction) => {
    // session durations
    await queryInterface.createTable('SessionDurations', sessionDurationAttributes, { transaction })

    // timelimit rule table
    await queryInterface.addColumn('TimelimitRules', 'startMinuteOfDay', {
      ...timelimitRuleAttributes.startMinuteOfDay
    }, { transaction })

    await queryInterface.addColumn('TimelimitRules', 'endMinuteOfDay', {
      ...timelimitRuleAttributes.endMinuteOfDay
    }, { transaction })

    await queryInterface.addColumn('TimelimitRules', 'sessionDurationMilliseconds', {
      ...timelimitRuleAttributes.sessionDurationMilliseconds
    }, { transaction })

    await queryInterface.addColumn('TimelimitRules', 'sessionPauseMilliseconds', {
      ...timelimitRuleAttributes.sessionPauseMilliseconds
    }, { transaction })

    // used times
    await queryInterface.renameTable('UsedTimes', 'UsedTimesOld', { transaction })

    await queryInterface.createTable('UsedTimes', {
      ...usedTimeAttributesVersion1,
      ...usedTimeAttributesVersion2,
      ...usedTimeAttributesVersion3
    }, { transaction })

    const dialect = sequelize.getDialect()
    const isMysql = dialect === 'mysql' || dialect === 'mariadb'

    if (isMysql) {
      await sequelize.query(`
        INSERT INTO UsedTimes (familyId, categoryId, dayOfEpoch, usedTime, lastUpdate, startMinuteOfDay, endMinuteOfDay)
          SELECT familyId, categoryId, dayOfEpoch, usedTime, lastUpdate,
          ${MinuteOfDay.MIN} AS startMinuteOfDay, ${MinuteOfDay.MAX} AS endMinuteOfDay
          FROM UsedTimesOld
      `, { transaction })
    } else {
      await sequelize.query(`
        INSERT INTO "UsedTimes" ("familyId", "categoryId", "dayOfEpoch", "usedTime", "lastUpdate", "startMinuteOfDay", "endMinuteOfDay")
          SELECT "familyId", "categoryId", "dayOfEpoch", "usedTime", "lastUpdate",
          ${MinuteOfDay.MIN} AS "startMinuteOfDay", ${MinuteOfDay.MAX} AS "endMinuteOfDay"
          FROM "UsedTimesOld"
      `, { transaction })
    }

    await queryInterface.dropTable('UsedTimesOld', { transaction })
  })
}

export async function down (queryInterface: QueryInterface, sequelize: Sequelize) {
  await sequelize.transaction({
    type: Transaction.TYPES.EXCLUSIVE
  }, async (transaction) => {
    // session durations
    await queryInterface.dropTable('SessionDurations', { transaction })

    // timelimit rule table
    await queryInterface.removeColumn('TimelimitRules', 'startMinuteOfDay', { transaction })
    await queryInterface.removeColumn('TimelimitRules', 'endMinuteOfDay', { transaction })
    await queryInterface.removeColumn('TimelimitRules', 'sessionDurationMilliseconds', { transaction })
    await queryInterface.removeColumn('TimelimitRules', 'sessionPauseMilliseconds', { transaction })

    // used times
    throw new Error('not implemented')
  })
}
