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

import { createPrivateKey, createPublicKey, diffieHellman } from 'crypto'
import { SimpleDatabaseTransaction } from '../../database/simple/index.js'
import { calculateExpireTime } from '../../database/devicedhkey.js'
import { isVersionId } from '../../util/token.js'

export async function getSharedSecret({
  transaction, familyId, deviceId, keyId, otherPublicKey
}: {
  transaction: SimpleDatabaseTransaction
  familyId: string
  deviceId: string
  keyId: string
  otherPublicKey: Buffer
}) {
  if (!isVersionId(keyId)) throw new KeyNotFoundException('invalid key id')

  const databaseKeyEntry = await transaction.deviceDhKey.query({
    familyId,
    deviceId,
    keyId
  })

  if (!databaseKeyEntry) throw new KeyNotFoundException('private key not found')

  if (databaseKeyEntry.expireAt === null) {
    await transaction.deviceDhKey.updateExpireAt({
      familyId,
      deviceId,
      keyId,
      expireAt: calculateExpireTime(BigInt(Date.now())),
    })
  } else {
    if (BigInt(databaseKeyEntry.expireAt) < BigInt(Date.now())) throw new KeyExpiredException()
  }

  const privateKey = (() => {
    try {
      return createPrivateKey({
        key: databaseKeyEntry.privateKey,
        format: 'der',
        type: 'pkcs8'
      })
    } catch (ex) {
      throw new MalformedPrivateKeyException()
    }
  })()

  const decodedOtherPublicKey = (() => {
    try {
      return createPublicKey({
        key: otherPublicKey,
        format: 'der',
        type: 'spki'
      })
    } catch (ex) {
      throw new MalformedPublicKeyException()
    }
  })()

  const sharedSecret = (() => {
    try {
      return diffieHellman({
        privateKey,
        publicKey: decodedOtherPublicKey
      })
    } catch (ex) {
      throw new MalformedNoMatchingKeysException()
    }
  })()

  return {
    sharedSecret,
    ownPublicKey: databaseKeyEntry.publicKey
  }
}

export class SharedSecretException extends Error {}
class MalformedPrivateKeyException extends SharedSecretException { constructor() { super('private key') } }
class MalformedPublicKeyException extends SharedSecretException { constructor() { super('public key') } }
class MalformedNoMatchingKeysException extends SharedSecretException { constructor() { super('no matching keys') } }
class KeyExpiredException extends SharedSecretException { constructor() { super('key expired') } }
class KeyNotFoundException extends SharedSecretException { constructor(message: string) { super('key not found: ' + message) } }
