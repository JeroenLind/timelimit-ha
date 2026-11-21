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
import { attributesVersion5 as deviceAttributes } from '../../device.js'
import { attributesVersion3 as userAttributes } from '../../user.js'

export async function up (queryInterface: QueryInterface, sequelize: Sequelize) {
  await sequelize.transaction({
    type: Transaction.TYPES.EXCLUSIVE
  }, async (transaction) => {
    // users
    await queryInterface.addColumn('Users', 'relaxPrimaryDeviceRule', {
      ...userAttributes.relaxPrimaryDeviceRule
    }, { transaction })

    // devices
    await queryInterface.addColumn('Devices', 'defaultUserId', {
      ...deviceAttributes.defaultUserId
    }, { transaction })

    await queryInterface.addColumn('Devices', 'defaultUserTimeout', {
      ...deviceAttributes.defaultUserTimeout
    }, { transaction })
  })
}

export async function down (queryInterface: QueryInterface, sequelize: Sequelize) {
  await sequelize.transaction({
    type: Transaction.TYPES.EXCLUSIVE
  }, async (transaction) => {
    // users
    await queryInterface.removeColumn('Users', 'relaxPrimaryDeviceRule', { transaction })

    // devices
    await queryInterface.removeColumn('Devices', 'defaultUserId', { transaction })
    await queryInterface.removeColumn('Devices', 'defaultUserTimeout', { transaction })
  })
}
