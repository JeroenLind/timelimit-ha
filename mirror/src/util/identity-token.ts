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

import { SignJWT, jwtVerify } from 'jose'
import { SignSecretConfig } from '../config.js'
import { IdentityTokenPayload, IdentityTokenCreatePayload } from '../api/schema.js'
import { isIdentityTokenPayload } from '../api/validator.js'

export async function createIdentityToken(config: SignSecretConfig, { purpose, familyId, userId, mail }: IdentityTokenCreatePayload) {
  const jwt = await new SignJWT({ purpose, familyId, userId, mail })
    .setExpirationTime('7d')
    .setProtectedHeader({ alg: 'HS512' })
    .sign(getSignSecret(config))

  return Buffer.from(jwt, 'ascii')
    .toString('base64')
    .split(/(.{32})/)
    .filter((item) => item.length > 0)
    .join('\n')
}

export async function verifyIdentitifyToken(config: SignSecretConfig, token: string, dryRun: boolean): Promise<IdentityTokenPayload> {
  try {
    const { payload } = await jwtVerify(
      Buffer.from(token, 'base64').toString('ascii'),
      getSignSecret(config),
      {
        algorithms: ['HS512'],
        clockTolerance: dryRun ? 0 : '4w',
      }
    )

    if (!isIdentityTokenPayload(payload)) throw new BadPayloadException()

    return payload
  } catch (ex) {
    if (ex instanceof TokenValidationException) throw ex
    else if (ex instanceof Error) throw new TokenValidationException(ex.message)
    else throw ex
  }
}

function getSignSecret(config: SignSecretConfig): Buffer {
  if (config.signSecret === '') throw new MissingSignSecretException()

  return Buffer.from(config.signSecret, 'utf8')
}

export class MissingSignSecretException extends Error {}

export class TokenValidationException extends Error {}
class BadPayloadException extends TokenValidationException { constructor() { super('bad payload') } }
