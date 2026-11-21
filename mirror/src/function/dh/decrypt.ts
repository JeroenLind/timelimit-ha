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

import { createDecipheriv } from 'crypto'
import { SimpleDatabaseTransaction } from '../../database/simple/index.js'
import { isVersionId } from '../../util/token.js'
import { getSharedSecret, SharedSecretException } from './shared-secret.js'

export async function decrypt({
  transaction, familyId, deviceId, encryptedData, authData
}: {
  transaction: SimpleDatabaseTransaction
  familyId: string
  deviceId: string
  encryptedData: string
  authData: Buffer
}) {
  const parts = encryptedData.split('.')

  if (parts.length !== 3) throw new MalformedDataDecryptException('expected three parts')

  const ivAndEncrypted = Buffer.from(parts[0], 'base64')
  const otherPublicKey = Buffer.from(parts[1], 'base64')
  const keyId = parts[2]

  if (ivAndEncrypted.length < 12 + 16) throw new MalformedDataDecryptException('too short for iv and auth tag')

  if (!isVersionId(keyId)) throw new KeyNotFoundDecryptException('invalid key id')

  const sharedSecret = await (async () => {
    try {
      return getSharedSecret({
        transaction,
        familyId,
        deviceId,
        keyId,
        otherPublicKey
      })
    } catch (ex) {
      if (ex instanceof SharedSecretException) throw new SharedSecretDecryptException(ex)
      throw ex
    }
  })()

  try {
    const decipher = createDecipheriv('aes-128-gcm', sharedSecret.sharedSecret.slice(0, 16), ivAndEncrypted.slice(0, 12), {
      authTagLength: 16
    })

    decipher.setAuthTag(ivAndEncrypted.slice(ivAndEncrypted.length - 16, ivAndEncrypted.length))
    decipher.setAAD(authData)

    const decryptedData = Buffer.concat([
      decipher.update(ivAndEncrypted.slice(12, ivAndEncrypted.length - 16)),
      decipher.final()
    ])

    return decryptedData
  } catch (ex) {
    throw new MalformedAuthenticationException()
  }
}

export class DecryptException extends Error {}
class SharedSecretDecryptException extends DecryptException { constructor(cause: Error) { super(cause.message) } }
class MalformedDataDecryptException extends DecryptException { constructor(message: string) { super('malformed data: ' + message) } }
class MalformedAuthenticationException extends DecryptException { constructor() { super('authentication data') } }
class KeyNotFoundDecryptException extends DecryptException { constructor(message: string) { super('key not found: ' + message) } }
