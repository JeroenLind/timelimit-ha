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

import { generateIdWithinFamily } from '../../util/token.js'
import { configItemIds } from '../config.js'
import { Database } from '../main.js'

class NestedTransactionTestException extends Error {}
class TestRollbackException extends NestedTransactionTestException {}
class NestedTransactionsNotWorkingException extends NestedTransactionTestException { constructor () { super('NestedTransactionsNotWorkingException') } }
class IllegalStateException extends NestedTransactionTestException {}

export async function assertNestedTransactionsAreWorking (database: Database) {
  const testValue = generateIdWithinFamily()

  // clean up just for the case
  await database.config.destroy({ where: { id: configItemIds.selfTestData } })

  await database.transaction(async (transaction) => {
    const readOne = await database.config.findOne({ where: { id: configItemIds.selfTestData }, transaction })

    if (readOne) throw new IllegalStateException()

    await database.transaction(async (transaction) => {
      await database.config.create({ id: configItemIds.selfTestData, value: testValue }, { transaction })

      const readTwo = await database.config.findOne({ where: { id: configItemIds.selfTestData }, transaction })

      if (readTwo?.value !== testValue) throw new IllegalStateException()

      try {
        await database.transaction(async (transaction) => {
          await database.config.destroy({ where: { id: configItemIds.selfTestData }, transaction })

          throw new TestRollbackException()
        }, { transaction })
      } catch (ex) {
        if (!(ex instanceof TestRollbackException)) throw ex
      }

      const readThree = await database.config.findOne({ where: { id: configItemIds.selfTestData }, transaction })

      if (readThree?.value !== testValue) throw new NestedTransactionsNotWorkingException()

      await database.config.destroy({ where: { id: configItemIds.selfTestData }, transaction })
    }, { transaction })
  })
}
