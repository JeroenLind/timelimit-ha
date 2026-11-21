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
import { attributes as purchaseAttributes } from '../../purchase.js'

export async function up (queryInterface: QueryInterface, sequelize: Sequelize) {
  await sequelize.transaction({
    type: Transaction.TYPES.EXCLUSIVE
  }, async (transaction) => {
    await queryInterface.renameTable('Purchases', 'PurchasesOld', { transaction })
    await queryInterface.createTable('Purchases', purchaseAttributes, { transaction })

    const dialect = sequelize.getDialect()
    const isMysql = dialect === 'mysql' || dialect === 'mariadb'

    if (isMysql) {
      await sequelize.query(`
        INSERT INTO Purchases (familyId, service, transactionId, type, loggedAt, previousFullVersionEndTime, newFullVersionEndTime)
          SELECT familyId, service, transactionId, type, 0 AS loggedAt, 0 AS previousFullVersionEndTime, loggedAt AS newFullVersionEndTime
          FROM PurchasesOld
      `, { transaction })
    } else {
      await sequelize.query(`
        INSERT INTO "Purchases" ("familyId", service, "transactionId", type, "loggedAt", "previousFullVersionEndTime", "newFullVersionEndTime")
          SELECT "familyId", service, "transactionId", type, 0 AS "loggedAt", 0 AS "previousFullVersionEndTime", "loggedAt" AS "newFullVersionEndTime"
          FROM "PurchasesOld"
      `, { transaction })
    }

    await queryInterface.dropTable('PurchasesOld', { transaction })
  })
}

export async function down (queryInterface: QueryInterface, sequelize: Sequelize) {
  await sequelize.transaction({
    type: Transaction.TYPES.EXCLUSIVE
  }, async (transaction) => {
    await queryInterface.removeColumn('Purchases', 'previousFullVersionEndTime', { transaction })
    await queryInterface.removeColumn('Purchases', 'newFullVersionEndTime', { transaction })
  })
}
