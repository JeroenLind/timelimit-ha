/*
 * server component for the TimeLimit App
 * Copyright (C) 2019 - 2022 Jonas Lochmann
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

export async function up (queryInterface: QueryInterface, sequelize: Sequelize) {
  await sequelize.transaction({
    type: Transaction.TYPES.EXCLUSIVE
  }, async (transaction) => {
    const dialect = sequelize.getDialect()
    const isMysql = dialect === 'mysql' || dialect === 'mariadb'
    const isPosgresql = dialect === 'postgres'

    if (isMysql) {
      await sequelize.query(
        'CREATE TABLE `DeviceDhKeys` ' +
        '(`familyId` VARCHAR(10) NOT NULL,' +
        '`deviceId` VARCHAR(6) NOT NULL,' +
        '`version` VARCHAR(4) NOT NULL,' +
        '`createdAt` BIGINT NOT NULL, ' +
        '`expireAt` BIGINT NULL, ' +
        '`publicKey` BLOB NOT NULL, ' +
        '`privateKey` BLOB NOT NULL, ' +
        'PRIMARY KEY (`familyId`, `deviceId`, `version`),' +
        'FOREIGN KEY (`familyId`, `deviceId`) REFERENCES `Devices` (`familyId`, `deviceId`) ON UPDATE CASCADE ON DELETE CASCADE' +
        ')',
        { transaction }
      )
    } else {
      await sequelize.query(
        'CREATE TABLE "DeviceDhKeys" ' +
        '("familyId" VARCHAR(10) NOT NULL,' +
        '"deviceId" VARCHAR(6) NOT NULL,' +
        '"version" VARCHAR(4) NOT NULL,' +
        '"createdAt" ' + (isPosgresql ? 'BIGINT' : 'LONG') + ' NOT NULL, ' +
        '"expireAt" ' + (isPosgresql ? 'BIGINT' : 'LONG') + ' NULL, ' +
        '"publicKey" ' + (isPosgresql ? 'BYTEA' : 'BLOB') + ' NOT NULL, ' +
        '"privateKey" ' + (isPosgresql ? 'BYTEA' : 'BLOB') + ' NOT NULL, ' +
        'PRIMARY KEY ("familyId", "deviceId", "version"),' +
        'FOREIGN KEY ("familyId", "deviceId") REFERENCES "Devices" ("familyId", "deviceId") ON UPDATE CASCADE ON DELETE CASCADE' +
        ')',
        { transaction }
      )
    }

    await queryInterface.addIndex('DeviceDhKeys', ['expireAt'], { transaction })
  })
}

export async function down (queryInterface: QueryInterface, sequelize: Sequelize) {
  await sequelize.transaction({
    type: Transaction.TYPES.EXCLUSIVE
  }, async (transaction) => {
    await queryInterface.dropTable('DeviceDhKeys', { transaction })
  })
}
