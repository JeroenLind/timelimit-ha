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

import { AppLogicAction } from './basetypes.js'
import { InvalidActionParameterException } from './meta/exception.js'
import { assertSafeInteger } from './meta/util.js'

const actionType = 'ReplyToKeyRequestAction'

export class ReplyToKeyRequestAction extends AppLogicAction {
  readonly requestServerSequenceNumber: number
  readonly tempKey: Buffer
  readonly encryptedKey: Buffer
  readonly signature: Buffer

  constructor ({
    requestServerSequenceNumber,
    tempKey,
    encryptedKey,
    signature
  }: {
    requestServerSequenceNumber: number
    tempKey: Buffer
    encryptedKey: Buffer
    signature: Buffer
  }) {
    super()

    assertSafeInteger({ value: requestServerSequenceNumber, field: 'requestServerSequenceNumber', actionType })

    if (tempKey.length !== 32 || encryptedKey.length !== 16 || signature.length !== 64) {
      throw new InvalidActionParameterException({
        actionType,
        staticMessage: 'key/signature has wrong length'
      })
    }

    this.requestServerSequenceNumber = requestServerSequenceNumber
    this.tempKey = tempKey
    this.encryptedKey = encryptedKey
    this.signature = signature
  }

  static parse = ({ rsn, tempKey, encryptedKey, signature }: SerializedReplyToKeyRequestAction) => (
    new ReplyToKeyRequestAction({
      requestServerSequenceNumber: rsn,
      tempKey: Buffer.from(tempKey, 'base64'),
      encryptedKey: Buffer.from(encryptedKey, 'base64'),
      signature: Buffer.from(signature, 'base64')
    })
  )
}

export interface SerializedReplyToKeyRequestAction {
  type: 'REPLY_TO_KEY_REQUEST'
  rsn: number
  tempKey: string
  encryptedKey: string
  signature: string
}
