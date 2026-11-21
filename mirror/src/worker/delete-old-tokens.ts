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
import { SimpleDatabase } from '../database/simple/index.js'

export async function deleteOldTokens ({ database, now }: {
  database: SimpleDatabase
  now: number
}) {
  await database.transaction(async (transaction) => {
    await transaction.legacy.database.authtoken.destroy({
      where: {
        createdAt: {
          [Sequelize.Op.lt]: (now - 1000 * 60 * 60 * 3 /* 3 hours */).toString()
        }
      },
      transaction: transaction.legacy.transaction
    })

    await transaction.addDeviceToken.destroyOlderThan(now - 1000 * 60 * 60 * 3 /* 3 hours */)

    await transaction.legacy.database.mailLoginToken.destroy({
      where: {
        createdAt: {
          [Sequelize.Op.lt]: (now - 1000 * 60 * 60 * 3 /* 3 hours */).toString()
        }
      },
      transaction: transaction.legacy.transaction
    })

    await transaction.legacy.database.deviceDhKey.destroy({
      where: {
        expireAt: {
          [Sequelize.Op.lt]: now.toString()
        }
      },
      transaction: transaction.legacy.transaction
    })
  })
}
