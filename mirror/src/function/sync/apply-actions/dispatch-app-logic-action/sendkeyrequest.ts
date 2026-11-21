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

import { SendKeyRequestAction } from '../../../../action/index.js'
import { Cache } from '../cache.js'
import { SourceFamilyNotFoundException } from '../exception/illegal-state.js'

export async function dispatchSendKeyRequestAction ({ action, cache, deviceId }: {
  deviceId: string
  action: SendKeyRequestAction
  cache: Cache
}) {
  const familyEntryUnsafe = await cache.transaction.legacy.database.family.findOne({
    where: {
      familyId: cache.familyId
    },
    transaction: cache.transaction.legacy.transaction,
    attributes: ['nextServerKeyRequestSeq']
  })

  if (!familyEntryUnsafe) {
    throw new SourceFamilyNotFoundException()
  }

  const serverSequenceNumber = familyEntryUnsafe.nextServerKeyRequestSeq

  await cache.transaction.legacy.database.family.update({
    nextServerKeyRequestSeq: (parseInt(serverSequenceNumber, 10) + 1).toString(10)
  }, {
    where: {
      familyId: cache.familyId
    },
    transaction: cache.transaction.legacy.transaction
  })

  await cache.transaction.legacy.database.keyRequest.destroy({
    where: {
      familyId: cache.familyId,
      senderDeviceId: deviceId,
      type: action.type,
      deviceId: action.deviceId || null,
      categoryId: action.categoryId || null
    },
    transaction: cache.transaction.legacy.transaction
  })

  await cache.transaction.legacy.database.keyRequest.create({
    familyId: cache.familyId,
    serverSequenceNumber: serverSequenceNumber,
    senderDeviceId: deviceId,
    senderSequenceNumber: action.deviceSequenceNumber.toString(10),
    deviceId: action.deviceId || null,
    categoryId: action.categoryId || null,
    type: action.type,
    tempKey: action.tempKey,
    signature: action.signature
  }, {
    transaction: cache.transaction.legacy.transaction
  })

  cache.incrementTriggeredSyncLevel(2)
}
