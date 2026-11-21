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

import { RemoveParentU2fKeyAction } from '../../../../action/index.js'
import { getU2fKeyId } from '../../../../database/u2fkey.js'
import { Cache } from '../cache.js'
import { ApplyActionUnacceptableAuthMethodException } from '../exception/auth.js'
import { AuthenticationMethod } from '../types.js'

export async function dispatchRemoveU2f ({ action, cache, parentUserId, authentication }: {
  action: RemoveParentU2fKeyAction
  cache: Cache
  parentUserId: string
  authentication: AuthenticationMethod
}) {
  if (authentication === 'u2f') {
    throw new ApplyActionUnacceptableAuthMethodException()
  }

  await cache.transaction.legacy.database.u2fKey.destroy({
    where: {
      familyId: cache.familyId,
      keyId: getU2fKeyId({ keyHandle: action.keyHandle, publicKey: action.publicKey }),
      userId: parentUserId,
      keyHandle: action.keyHandle,
      publicKey: action.publicKey
    },
    transaction: cache.transaction.legacy.transaction
  })

  cache.invalidateU2fList = true
  cache.incrementTriggeredSyncLevel(2)
}
