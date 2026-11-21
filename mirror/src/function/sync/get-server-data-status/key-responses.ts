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
import { SimpleDatabaseTransaction } from '../../../database/simple/index.js'
import { ServerKeyResponse } from '../../../object/serverdatastatus.js'
import { FamilyEntry } from './family-entry.js'

export async function getKeyResponses ({ transaction, familyEntry, lastSeenRequestIndex, deviceId }: {
  transaction: SimpleDatabaseTransaction
  familyEntry: FamilyEntry
  lastSeenRequestIndex: number | null
  deviceId: string
}): Promise<Array<ServerKeyResponse> | null> {
  if (lastSeenRequestIndex !== null) {
    await transaction.legacy.database.keyResponse.destroy({
      where: {
        familyId: familyEntry.familyId,
        receiverDeviceId: deviceId,
        replyServerSequenceNumber: {
          [Sequelize.Op.lte]: lastSeenRequestIndex.toString(10)
        }
      },
      transaction: transaction.legacy.transaction
    })
  }

  const data = await transaction.legacy.database.keyResponse.findAll({
    where: {
      familyId: familyEntry.familyId,
      receiverDeviceId: deviceId,
    },
    order: [['replyServerSequenceNumber', 'ASC']],
    transaction: transaction.legacy.transaction,
    limit: 32
  })

  if (data.length === 0) return null

  return data.map((item) => ({
    srvSeq: parseInt(item.replyServerSequenceNumber),
    sender: item.senderDeviceId,
    rqSeq: parseInt(item.requestClientSequenceNumber),
    tempKey: item.tempKey.toString('base64'),
    cryptKey: item.encryptedKey.toString('base64'),
    signature: item.signature.toString('base64')
  }))
}
