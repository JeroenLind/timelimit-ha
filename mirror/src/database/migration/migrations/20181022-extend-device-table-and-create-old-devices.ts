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
import { attributesVersion2 } from '../../device.js'
import { attributes as oldDeviceAttributes } from '../../olddevice.js'

export async function up (queryInterface: QueryInterface, sequelize: Sequelize) {
  await sequelize.transaction({
    type: Transaction.TYPES.EXCLUSIVE
  }, async (transaction) => {
    await queryInterface.addColumn('Devices', 'lastConnectivity', {
      ...attributesVersion2.lastConnectivity
    }, {
      transaction
    })

    await queryInterface.addColumn('Devices', 'notSeenForLongTime', {
      ...attributesVersion2.notSeenForLongTime
    }, {
      transaction
    })

    await queryInterface.addColumn('Devices', 'didDeviceReportUninstall', {
      ...attributesVersion2.didDeviceReportUninstall
    }, {
      transaction
    })

    await queryInterface.createTable('OldDevices', oldDeviceAttributes, { transaction })
  })
}

export async function down (queryInterface: QueryInterface, sequelize: Sequelize) {
  await sequelize.transaction({
    type: Transaction.TYPES.EXCLUSIVE
  }, async (transaction) => {
    await queryInterface.removeColumn('Devices', 'lastConnectivity', { transaction })
    await queryInterface.removeColumn('Devices', 'notSeenForLongTime', { transaction })
    await queryInterface.removeColumn('Devices', 'didDeviceReportUninstall', { transaction })

    await queryInterface.dropTable('OldDevices', { transaction })
  })
}
