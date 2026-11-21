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
import { attributesVersion2 as authTokenAttributes } from '../../authtoken.js'
import { attributesVersion2 as mailLoginTokenAttributes } from '../../maillogintoken.js'

export async function up (queryInterface: QueryInterface, sequelize: Sequelize) {
  await sequelize.transaction({
    type: Transaction.TYPES.EXCLUSIVE
  }, async (transaction) => {
    await queryInterface.addColumn('AuthTokens', 'locale', {
      ...authTokenAttributes.locale
    }, {
      transaction
    })

    await queryInterface.addColumn('MailLoginTokens', 'locale', {
      ...mailLoginTokenAttributes.locale
    }, {
      transaction
    })
  })
}

export async function down (queryInterface: QueryInterface, sequelize: Sequelize) {
  await sequelize.transaction({
    type: Transaction.TYPES.EXCLUSIVE
  }, async (transaction) => {
    await queryInterface.removeColumn('AuthTokens', 'locale', { transaction })
    await queryInterface.removeColumn('MailLoginTokens', 'locale', { transaction })
  })
}
