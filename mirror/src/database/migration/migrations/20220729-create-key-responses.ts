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
        'CREATE TABLE `KeyResponses` (' +
        '`familyId` VARCHAR(10) NOT NULL, ' +
        '`receiverDeviceId` VARCHAR(6) NOT NULL, ' +
        '`requestServerSequenceNumber` BIGINT NOT NULL, ' +
        '`senderDeviceId` VARCHAR(6) NOT NULL, ' +
        '`replyServerSequenceNumber` BIGINT NOT NULL, ' +
        '`requestClientSequenceNumber` BIGINT NOT NULL, ' +
        '`tempKey` BLOB NOT NULL, ' +
        '`encryptedKey` BLOB NOT NULL, ' +
        '`signature` BLOB NOT NULL, ' +
        'PRIMARY KEY (`familyId`, `receiverDeviceId`, `requestServerSequenceNumber`, `senderDeviceId`), ' +
        'FOREIGN KEY (`familyId`, `requestServerSequenceNumber`) REFERENCES `KeyRequests` (`familyId`, `serverSequenceNumber`) ON UPDATE CASCADE ON DELETE CASCADE ' +
        ')',
        { transaction }
      )
    } else {
      await sequelize.query(
        'CREATE TABLE "KeyResponses" (' +
        '"familyId" VARCHAR(10) NOT NULL, ' +
        '"receiverDeviceId" VARCHAR(6) NOT NULL, ' +
        '"requestServerSequenceNumber" ' + (isPosgresql ? 'BIGINT' : 'LONG') + ' NOT NULL, ' +
        '"senderDeviceId" VARCHAR(6) NOT NULL, ' +
        '"replyServerSequenceNumber" ' + (isPosgresql ? 'BIGINT' : 'LONG') + ' NOT NULL, ' +
        '"requestClientSequenceNumber" ' + (isPosgresql ? 'BIGINT' : 'LONG') + ' NOT NULL, ' +
        '"tempKey" ' + (isPosgresql ? 'BYTEA' : 'BLOB') + ' NOT NULL, ' +
        '"encryptedKey" ' + (isPosgresql ? 'BYTEA' : 'BLOB') + ' NOT NULL, ' +
        '"signature" ' + (isPosgresql ? 'BYTEA' : 'BLOB') + ' NOT NULL, ' +
        'PRIMARY KEY ("familyId", "receiverDeviceId", "requestServerSequenceNumber", "senderDeviceId"), ' +
        'FOREIGN KEY ("familyId", "requestServerSequenceNumber") REFERENCES "KeyRequests" ("familyId", "serverSequenceNumber") ON UPDATE CASCADE ON DELETE CASCADE ' +
        ')',
        { transaction }
      )
    }

    await queryInterface.addIndex('KeyResponses', ['familyId', 'requestServerSequenceNumber'], { transaction })
    await queryInterface.addIndex(
      'KeyResponses',
      ['familyId', 'receiverDeviceId', 'replyServerSequenceNumber'],
      {
        transaction,
        unique: true,
        name: 'key_response_index_fid_rdid_rssn'
      }
    )
  })
}

export async function down (queryInterface: QueryInterface, sequelize: Sequelize) {
  await sequelize.transaction({
    type: Transaction.TYPES.EXCLUSIVE
  }, async (transaction) => {
    await queryInterface.dropTable('KeyResponses', { transaction })
  })
}
