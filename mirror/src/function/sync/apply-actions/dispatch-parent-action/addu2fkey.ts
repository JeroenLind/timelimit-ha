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

import { AddParentU2fKeyAction } from '../../../../action/index.js'
import { getU2fKeyId } from '../../../../database/u2fkey.js'
import { Cache } from '../cache.js'
import { LimitReachedException } from '../exception/limit.js'

export async function dispatchAddU2f ({ action, cache, parentUserId }: {
  action: AddParentU2fKeyAction
  cache: Cache
  parentUserId: string
}) {
  const counter = await cache.transaction.legacy.database.u2fKey.count({
    where: {
      familyId: cache.familyId
    },
    transaction: cache.transaction.legacy.transaction
  })

  if (counter >= 16) throw new LimitReachedException({ type: 'u2f keys' })

  await cache.transaction.legacy.database.u2fKey.create({
    familyId: cache.familyId,
    keyId: getU2fKeyId({ keyHandle: action.keyHandle, publicKey: action.publicKey }),
    userId: parentUserId,
    addedAt: Date.now().toString(10),
    keyHandle: action.keyHandle,
    publicKey: action.publicKey,
    nextCounter: '0'
  }, { transaction: cache.transaction.legacy.transaction })

  cache.invalidateU2fList = true
  cache.incrementTriggeredSyncLevel(1)
}
