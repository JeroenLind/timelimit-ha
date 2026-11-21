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

import * as Sequelize from 'sequelize'
import { configItemIds } from '../config.js'
import { Database } from '../main.js'

export class SerializationFeatureCheckException extends Error {}

export function shouldRetryWithException (database: Database, e: unknown): boolean {
  if (e instanceof Sequelize.TimeoutError) return true

  if (!(e instanceof Sequelize.DatabaseError)) return false

  const parent = e.parent

  if (database.dialect === 'sqlite') {
    if (parent.message.startsWith('SQLITE_BUSY:')) return true
  } else if (database.dialect === 'postgres') {
    // 40001 = serialization_failure
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((parent as any).code === '40001') return true
    // 40P01 = deadlock detected
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((parent as any).code === '40P01') return true
  } else if (database.dialect === 'mariadb') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const errno = (parent as any).errno

    // ER_LOCK_DEADLOCK
    // Deadlock found when trying to get lock; try restarting transaction
    if (errno === 1213) return true
  }

  return false
}

export async function assertSerializeableTransactionsAreWorking (database: Database) {
  // clean up just for the case
  await database.config.destroy({
    where: {
      id: {
        [Sequelize.Op.in]: [ configItemIds.selfTestData, configItemIds.secondSelfTestData ]
      }
    }
  })

  // insert specific data
  await database.config.bulkCreate([
    {
      id: configItemIds.selfTestData,
      value: '123'
    },
    {
      id: configItemIds.secondSelfTestData,
      value: '456'
    }
  ])

  try {
    // use two parallel transactions
    await database.transaction(async (transactionOne) => {
      await database.transaction(async (transactionTwo) => {
        await database.config.findAll({ transaction: transactionOne })
        await database.config.findAll({ transaction: transactionTwo })

        await Promise.all([
          (async () => {
            await database.config.update({ value: 'c' }, { where: { id: configItemIds.selfTestData }, transaction: transactionOne })
          })(),
          (async () => {
            await database.config.update({ value: 'd' }, { where: { id: configItemIds.secondSelfTestData }, transaction: transactionTwo })
          })()
        ])
      }, { disableRetry: true })
    }, { disableRetry: true })

    throw new SerializationFeatureCheckException()
  } catch (ex) {
    if (!shouldRetryWithException(database, ex)) {
      throw new SerializationFeatureCheckException()
    }
  }

  // finish clean up
  await database.config.destroy({
    where: {
      id: {
        [Sequelize.Op.in]: [ configItemIds.selfTestData, configItemIds.secondSelfTestData ]
      }
    }
  })
}
