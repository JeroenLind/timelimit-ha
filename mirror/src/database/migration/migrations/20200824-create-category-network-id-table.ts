/*
 * server component for the TimeLimit App
 * Copyright (C) 2019 - 2021 Jonas Lochmann
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

export async function up (_: QueryInterface, sequelize: Sequelize) {
  await sequelize.transaction({
    type: Transaction.TYPES.EXCLUSIVE
  }, async (transaction) => {
    const dialect = sequelize.getDialect()
    const isMysql = dialect === 'mysql' || dialect === 'mariadb'

    if (isMysql) {
      await sequelize.query(
        'CREATE TABLE `CategoryNetworkIds` ' +
        '(`familyId` VARCHAR(10) NOT NULL, `categoryId` VARCHAR(6) NOT NULL,' +
        '`networkItemId` VARCHAR(6) NOT NULL, `hashedNetworkId` VARCHAR(8) NOT NULL,' +
        'PRIMARY KEY(`familyId`, `categoryId`, `networkItemId`), FOREIGN KEY(`familyId`, `categoryId`)' +
        'REFERENCES `Categories`(`familyId`, `categoryId`) ON UPDATE CASCADE ON DELETE CASCADE )',
        { transaction }
      )
    } else {
      await sequelize.query(
        'CREATE TABLE "CategoryNetworkIds" ' +
        '("familyId" VARCHAR(10) NOT NULL, "categoryId" VARCHAR(6) NOT NULL,' +
        '"networkItemId" VARCHAR(6) NOT NULL, "hashedNetworkId" VARCHAR(8) NOT NULL,' +
        'PRIMARY KEY("familyId", "categoryId", "networkItemId"), FOREIGN KEY("familyId", "categoryId")' +
        'REFERENCES "Categories"("familyId", "categoryId") ON UPDATE CASCADE ON DELETE CASCADE )',
        { transaction }
      )
    }
  })
}

export async function down (queryInterface: QueryInterface, sequelize: Sequelize) {
  await sequelize.transaction({
    type: Transaction.TYPES.EXCLUSIVE
  }, async (transaction) => {
    await queryInterface.dropTable('CategoryNetworkIds', { transaction })
  })
}
