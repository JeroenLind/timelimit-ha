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

import { SimpleDatabaseTransaction } from '../../../database/simple/index.js'
import { types as pingTypes } from '../../../database/ping.js'
import { ServerPing } from '../../../object/serverdatastatus.js'
import { FamilyEntry } from './family-entry.js'

export async function getPings ({
  transaction, familyEntry, deviceId
}: {
  transaction: SimpleDatabaseTransaction
  familyEntry: FamilyEntry
  deviceId: string
}): Promise<Array<ServerPing>> {
  const savedData = await transaction.legacy.database.ping.findAll({
    where: {
      familyId: familyEntry.familyId,
      receiverDeviceId: deviceId,
    },
    attributes: ['senderDeviceId', 'type', 'token'],
    transaction: transaction.legacy.transaction
  })

  return savedData.map((row) => ({
    deviceId: row.senderDeviceId,
    type: convertType(row.type),
    token: row.token
  }))
}

function convertType(type: number): 'ping' | 'pong' {
  if (type === pingTypes.ping) return 'ping'
  else if (type === pingTypes.pong) return 'pong'
  else throw new Error()
}
