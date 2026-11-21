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

export async function up (queryInterface: QueryInterface, sequelize: Sequelize) {
  await sequelize.transaction({
    type: Transaction.TYPES.EXCLUSIVE
  }, async (transaction) => {
    const dialect = sequelize.getDialect()
    const isMysql = dialect === 'mysql' || dialect === 'mariadb'

    if (isMysql) {
      await sequelize.query(
        'CREATE TABLE `UserLimitLoginCategories`' +
        '(`familyId` VARCHAR(10) NOT NULL, `userId` VARCHAR(6) NOT NULL, `categoryId` VARCHAR(6) NOT NULL,' +
        'PRIMARY KEY(`familyId`, `userId`), FOREIGN KEY(`familyId`, `userId`) REFERENCES `Users`(`familyId`, `userId`) ON UPDATE CASCADE ON DELETE CASCADE , FOREIGN KEY(`familyId`, `categoryId`) REFERENCES `Categories`(`familyId`, `categoryId`) ON UPDATE CASCADE ON DELETE CASCADE )',
        { transaction }
      )

      await sequelize.query('CREATE INDEX `UserLimitLoginCategoriesIndexCategoryId` ON `UserLimitLoginCategories` (`familyId`, `categoryId`)', { transaction })
    } else {
      await sequelize.query(
        'CREATE TABLE "UserLimitLoginCategories"' +
        '("familyId" VARCHAR(10) NOT NULL, "userId" VARCHAR(6) NOT NULL, "categoryId" VARCHAR(6) NOT NULL,' +
        'PRIMARY KEY("familyId", "userId"), FOREIGN KEY("familyId", "userId") REFERENCES "Users" ("familyId", "userId") ON UPDATE CASCADE ON DELETE CASCADE , FOREIGN KEY("familyId", "categoryId") REFERENCES "Categories" ("familyId", "categoryId") ON UPDATE CASCADE ON DELETE CASCADE )',
        { transaction }
      )

      await sequelize.query('CREATE INDEX "UserLimitLoginCategoriesIndexCategoryId" ON "UserLimitLoginCategories" ("familyId", "categoryId")', { transaction })
    }
  })
}

export async function down (queryInterface: QueryInterface, sequelize: Sequelize) {
  await sequelize.transaction({
    type: Transaction.TYPES.EXCLUSIVE
  }, async (transaction) => {
    await queryInterface.dropTable('UserLimitLoginCategories', { transaction })
  })
}
