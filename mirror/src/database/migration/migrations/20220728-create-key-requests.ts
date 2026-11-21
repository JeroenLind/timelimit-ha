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
        'CREATE TABLE `KeyRequests` (' +
        '`familyId` VARCHAR(10) NOT NULL, ' +
        '`serverSequenceNumber` BIGINT NOT NULL, ' +
        '`senderDeviceId` VARCHAR(6) NOT NULL, ' +
        '`senderSequenceNumber` BIGINT NOT NULL, ' +
        '`deviceId` VARCHAR(6) NULL, ' +
        '`categoryId` VARCHAR(6) NULL, ' +
        '`type` INTEGER NOT NULL, ' +
        '`tempKey` BLOB NOT NULL, ' +
        '`signature` BLOB NOT NULL, ' +
        'PRIMARY KEY (`familyId`, `serverSequenceNumber`), ' +
        'FOREIGN KEY (`familyId`, `senderDeviceId`) REFERENCES `Devices` (`familyId`, `deviceId`) ON UPDATE CASCADE ON DELETE CASCADE, ' +
        'FOREIGN KEY (`familyId`, `deviceId`) REFERENCES `Devices` (`familyId`, `deviceId`) ON UPDATE CASCADE ON DELETE CASCADE, ' +
        'FOREIGN KEY (`familyId`, `categoryId`) REFERENCES `Categories` (`familyId`, `categoryId`) ON UPDATE CASCADE ON DELETE CASCADE' +
        ')',
        { transaction }
      )
    } else {
      await sequelize.query(
        'CREATE TABLE "KeyRequests" (' +
        '"familyId" VARCHAR(10) NOT NULL, ' +
        '"serverSequenceNumber" ' + (isPosgresql ? 'BIGINT' : 'LONG') + ' NOT NULL, ' +
        '"senderDeviceId" VARCHAR(6) NOT NULL, ' +
        '"senderSequenceNumber" ' + (isPosgresql ? 'BIGINT' : 'LONG') + ' NOT NULL, ' +
        '"deviceId" VARCHAR(6) NULL, ' +
        '"categoryId" VARCHAR(6) NULL, ' +
        '"type" INTEGER NOT NULL, ' +
        '"tempKey" ' + (isPosgresql ? 'BYTEA' : 'BLOB') + ' NOT NULL, ' +
        '"signature" ' + (isPosgresql ? 'BYTEA' : 'BLOB') + ' NOT NULL, ' +
        'PRIMARY KEY ("familyId", "serverSequenceNumber"), ' +
        'FOREIGN KEY ("familyId", "senderDeviceId") REFERENCES "Devices" ("familyId", "deviceId") ON UPDATE CASCADE ON DELETE CASCADE, ' +
        'FOREIGN KEY ("familyId", "deviceId") REFERENCES "Devices" ("familyId", "deviceId") ON UPDATE CASCADE ON DELETE CASCADE, ' +
        'FOREIGN KEY ("familyId", "categoryId") REFERENCES "Categories" ("familyId", "categoryId") ON UPDATE CASCADE ON DELETE CASCADE' +
        ')',
        { transaction }
      )
    }

    await queryInterface.addIndex('KeyRequests', ['familyId', 'senderDeviceId', 'senderSequenceNumber'], { transaction })
    await queryInterface.addIndex('KeyRequests', ['familyId', 'deviceId'], { transaction })
    await queryInterface.addIndex('KeyRequests', ['familyId', 'categoryId'], { transaction })
    await queryInterface.addIndex('KeyRequests', ['familyId', 'senderDeviceId', 'deviceId', 'categoryId'], { transaction, unique: true })
  })
}

export async function down (queryInterface: QueryInterface, sequelize: Sequelize) {
  await sequelize.transaction({
    type: Transaction.TYPES.EXCLUSIVE
  }, async (transaction) => {
    await queryInterface.dropTable('KeyRequests', { transaction })
  })
}
