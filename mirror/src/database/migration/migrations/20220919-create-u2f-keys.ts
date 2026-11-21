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
        'CREATE TABLE `U2fKeys` ' +
        '(`familyId` VARCHAR(10) NOT NULL,' +
        '`keyId` VARCHAR(8) NOT NULL,' +
        '`userId` VARCHAR(6) NOT NULL,' +
        '`addedAt` BIGINT NOT NULL, ' +
        '`keyHandle` BLOB NOT NULL, ' +
        '`publicKey` BLOB NOT NULL, ' +
        '`nextCounter` BIGINT NOT NULL, ' +
        'PRIMARY KEY (`familyId`, `keyId`),' +
        'FOREIGN KEY (`familyId`, `userId`) REFERENCES `Users` (`familyId`, `userId`) ON UPDATE CASCADE ON DELETE CASCADE' +
        ')',
        { transaction }
      )
    } else {
      await sequelize.query(
        'CREATE TABLE "U2fKeys" ' +
        '("familyId" VARCHAR(10) NOT NULL,' +
        '"keyId" VARCHAR(8) NOT NULL,' +
        '"userId" VARCHAR(6) NOT NULL,' +
        '"addedAt" ' + (isPosgresql ? 'BIGINT' : 'LONG') + ' NOT NULL, ' +
        '"keyHandle" ' + (isPosgresql ? 'BYTEA' : 'BLOB') + ' NOT NULL, ' +
        '"publicKey" ' + (isPosgresql ? 'BYTEA' : 'BLOB') + ' NOT NULL, ' +
        '"nextCounter" ' + (isPosgresql ? 'BIGINT' : 'LONG') + ' NOT NULL, ' +
        'PRIMARY KEY ("familyId", "keyId"),' +
        'FOREIGN KEY ("familyId", "userId") REFERENCES "Users" ("familyId", "userId") ON UPDATE CASCADE ON DELETE CASCADE' +
        ')',
        { transaction }
      )
    }

    await queryInterface.addIndex('U2fKeys', ['familyId', 'userId'], { transaction })
  })
}

export async function down (queryInterface: QueryInterface, sequelize: Sequelize) {
  await sequelize.transaction({
    type: Transaction.TYPES.EXCLUSIVE
  }, async (transaction) => {
    await queryInterface.dropTable('U2fKeys', { transaction })
  })
}
