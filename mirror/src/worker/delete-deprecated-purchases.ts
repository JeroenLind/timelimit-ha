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
import { notifyClientsAboutChangesDelayed } from '../function/websocket/index.js'
import { WebsocketApi } from '../websocket/index.js'

export async function deleteDeprecatedPurchases ({ database, websocket, now }: {
  database: SimpleDatabase
  websocket: WebsocketApi
  now: number
}) {
  await database.transaction(async (transaction) => {
    const affectedFamilyIds = (await transaction.legacy.database.family.findAll({
      where: {
        hasFullVersion: true,
        fullVersionUntil: {
          [Sequelize.Op.lt]: now
        }
      },
      attributes: ['familyId'],
      transaction: transaction.legacy.transaction,
      limit: 100
    })).map((item) => item.familyId)

    await transaction.legacy.database.family.update({
      hasFullVersion: false
    }, {
      where: {
        familyId: {
          [Sequelize.Op.in]: affectedFamilyIds
        }
      },
      transaction: transaction.legacy.transaction
    })

    for (const familyId of affectedFamilyIds) {
      await notifyClientsAboutChangesDelayed({
        familyId,
        sourceDeviceId: null,
        websocket,
        generalLevel: 2,
        targetedLevels: new Map(),
        transaction
      })
    }

    return { affectedFamilyIds }
  })
}
