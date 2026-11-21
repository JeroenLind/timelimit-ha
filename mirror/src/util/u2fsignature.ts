/*
 * server component for the TimeLimit App
 * Copyright (C) 2019 - 2022 Jonas Lochmann
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

import { createVerify, createPublicKey, createHash } from 'crypto'

export function isU2fSignatureValid({
  u2fRawResponse, applicationId, challenge, publicKey
}: {
  u2fRawResponse: Buffer
  applicationId: Buffer
  challenge: Buffer
  publicKey: Buffer
}): boolean {
  if (u2fRawResponse.length < 5) return false
  if (publicKey.length !== 65 || publicKey.readInt8(0) !== 4) return false

  const publicKeyObject = createPublicKey({
    key: Buffer.concat([
      Buffer.from('MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgA=', 'base64'), publicKey
    ]),
    format: 'der',
    type: 'spki'
  })

  const verifier = createVerify('SHA256')

  verifier.update(applicationId)
  verifier.update(u2fRawResponse.slice(0, 5))
  verifier.update(challenge)

  return verifier.verify(publicKeyObject, u2fRawResponse.slice(5))
}

export function calculateApplicationId(url: string): Buffer {
  return createHash('sha256')
    .update(Buffer.from(url, 'utf8'))
    .digest()
}
