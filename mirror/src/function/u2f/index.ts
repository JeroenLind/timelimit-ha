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

import { createHash, timingSafeEqual } from 'crypto'
import { getSharedSecret, SharedSecretException } from '../dh/index.js'
import { SimpleDatabaseTransaction} from '../../database/simple/index.js'
import { intToBuffer } from '../../util/binary-number.js'
import { isU2fSignatureValid, calculateApplicationId } from '../../util/u2fsignature.js'

export class U2fValidationError extends Error {}
class IntegrityMalformedException extends U2fValidationError { constructor() { super('integrity malformed') } }
class MissingPremiumException extends U2fValidationError { constructor() { super('missing premium') } }
class U2fSharedSecretException extends U2fValidationError { constructor(message: string) { super('shared secret: ' + message) } }
class HmacMismatchException extends U2fValidationError { constructor() { super('hmac mismatch') } }
class UnknownU2fKeyIdException extends U2fValidationError { constructor() { super('unknown u2f key id') } }
class InvalidU2fSignatureException extends U2fValidationError { constructor() { super('u2f signature invalid') } }

export async function validateU2fIntegrity({
  integrity,
  hasFullVersion,
  familyId,
  deviceId,
  transaction,
  calculateHmac
}: {
  integrity: string
  hasFullVersion: boolean
  familyId: string
  deviceId: string
  transaction: SimpleDatabaseTransaction
  calculateHmac: (secret: Buffer) => Buffer
}) {
  if (!integrity.startsWith('u2f:')) throw new IntegrityMalformedException()

  const parts = integrity.substring(4).split('.')

  if (parts.length !== 5) {
    throw new IntegrityMalformedException()
  }

  if (!hasFullVersion) {
    throw new MissingPremiumException()
  }

  const [dhKeyId, dhPublicKeyBase64, u2fKeyId, u2fResponseBase64, providedHmacResultBase64] = parts

  const binaryDhKeyId = Buffer.from(dhKeyId, 'utf8')
  const dhPublicKey = Buffer.from(dhPublicKeyBase64, 'base64')
  const u2fResponse = Buffer.from(u2fResponseBase64, 'base64')
  const providedHmacResult = Buffer.from(providedHmacResultBase64, 'base64')

  const sharedSecret = await (async () => {
    try {
      return await getSharedSecret({
        transaction,
        familyId,
        deviceId,
        keyId: dhKeyId,
        otherPublicKey: dhPublicKey
      })
    } catch (ex) {
      if (ex instanceof SharedSecretException) throw new U2fSharedSecretException(ex.message)
      else throw ex
    }
  })()

  const correctHmac = calculateHmac(sharedSecret.sharedSecret)

  if (!timingSafeEqual(providedHmacResult, correctHmac)) {
    throw new HmacMismatchException()
  }

  const keyDescriptorUnsafe = await transaction.legacy.database.u2fKey.findOne({
    where: {
      familyId,
      keyId: u2fKeyId
    },
    transaction: transaction.legacy.transaction,
    attributes: ['publicKey', 'userId']
  })

  if (keyDescriptorUnsafe === null) throw new UnknownU2fKeyIdException()

  const keyDescriptor = {
    publicKey: keyDescriptorUnsafe.publicKey,
    userId: keyDescriptorUnsafe.userId
  }

  const dhPublicKeysHash = createHash('sha256')
    .update(intToBuffer(binaryDhKeyId.length))
    .update(binaryDhKeyId)
    .update(intToBuffer(sharedSecret.ownPublicKey.length))
    .update(sharedSecret.ownPublicKey)
    .update(intToBuffer(dhPublicKey.length))
    .update(dhPublicKey)
    .digest()

  if (
    !isU2fSignatureValid({
      u2fRawResponse: u2fResponse,
      applicationId: calculateApplicationId('https://timelimit.io'),
      challenge: dhPublicKeysHash,
      publicKey: keyDescriptor.publicKey
    })
  ) {
    throw new InvalidU2fSignatureException()
  }

  const u2fCounter = u2fResponse.readUInt32BE(1)

  // the counter is not checked at the server
  // this happens because the offline usage can cause receiving actions
  // out of order so it would be required to keep track of the used counter
  // values; if this becomes necassary in the future, then it does not
  // require any client modification to add it

  await transaction.legacy.database.u2fKey.update({
    nextCounter: (u2fCounter + 1).toString(10)
  }, {
    where: {
      familyId,
      keyId: u2fKeyId
    },
    transaction: transaction.legacy.transaction
  })

  return {
    userId: keyDescriptor.userId
  }
}
