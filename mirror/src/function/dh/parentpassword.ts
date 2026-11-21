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

import { Cache } from '../sync/apply-actions/cache.js'
import { ApplyActionException } from '../sync/apply-actions/exception/index.js'
import {
  EncryptableParentPassword, assertParentPasswordValid,
  PlaintextParentPassword, ParentPasswordValidationException
} from '../../api/schema.js'
import { decrypt, DecryptException } from './decrypt.js'

export async function decryptParentPassword({ cache, password } : {
  cache: Cache
  password: EncryptableParentPassword
}): Promise<PlaintextParentPassword> {
  if (!password.encrypted) return password

  try {
    const secondHash = (await decrypt({
      transaction: cache.transaction,
      familyId: cache.familyId,
      deviceId: cache.deviceId,
      encryptedData: password.secondHash,
      authData: Buffer.from(`ParentPassword:${password.hash}:${password.secondSalt}`, 'ascii')
    })).toString('ascii')

    const result: PlaintextParentPassword = {
      hash: password.hash,
      secondSalt: password.secondSalt,
      secondHash
    }

    assertParentPasswordValid(result)

    return result
  } catch (ex) {
    if (ex instanceof DecryptException) throw new ApplyActionException({ staticMessage: ex.message })
    else if (ex instanceof ParentPasswordValidationException) throw new ApplyActionException({ staticMessage: 'invalid encrypted parent password' })
    else throw ex
  }
}
