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
import { assertIdWithinFamily, assertSafeInteger } from './meta/util.js'
import { types } from '../database/keyrequest.js'

const actionType = 'SendKeyRequestAction'

export class SendKeyRequestAction extends AppLogicAction {
  readonly deviceSequenceNumber: number
  readonly deviceId?: string
  readonly categoryId?: string
  readonly type: number
  readonly tempKey: Buffer
  readonly signature: Buffer

  constructor ({
    deviceSequenceNumber,
    deviceId,
    categoryId,
    type,
    tempKey,
    signature
  }: {
    deviceSequenceNumber: number
    deviceId?: string
    categoryId?: string
    type: number
    tempKey: Buffer
    signature: Buffer
  }) {
    super()

    assertSafeInteger({ value: deviceSequenceNumber, field: 'deviceSequenceNumber', actionType })
    assertSafeInteger({ value: type, field: 'deviceSequenceNumber', actionType })

    if (tempKey.length != 32 || signature.length != 64) {
      throw new InvalidActionParameterException({
        actionType,
        staticMessage: 'key/signature has wrong length'
      })
    }

    if (deviceId !== undefined) {
      assertIdWithinFamily({ value: deviceId, actionType, field: 'deviceId' })
    }

    if (categoryId !== undefined) {
      assertIdWithinFamily({ value: categoryId, actionType, field: 'categoryId' })
    }

    if (deviceId !== undefined && categoryId !== undefined) {
      throw new InvalidActionParameterException({
        actionType,
        staticMessage: 'can not specify device and category at the same time'
      })
    }

    if (types.all.indexOf(type) === -1) {
      throw new InvalidActionParameterException({
        actionType,
        staticMessage: 'invalid type'
      })
    }

    this.deviceSequenceNumber = deviceSequenceNumber
    this.deviceId = deviceId
    this.categoryId = categoryId
    this.type = type
    this.tempKey = tempKey
    this.signature = signature
  }

  static parse = ({ dsn, deviceId, categoryId, dataType, tempKey, signature }: SerializedSendKeyRequestAction) => (
    new SendKeyRequestAction({
      deviceSequenceNumber: dsn,
      deviceId,
      categoryId,
      type: dataType,
      tempKey: Buffer.from(tempKey, 'base64'),
      signature: Buffer.from(signature, 'base64')
    })
  )
}

export interface SerializedSendKeyRequestAction {
  type: 'SEND_KEY_REQUEST'
  dsn: number
  deviceId?: string
  categoryId?: string
  dataType: number
  tempKey: string
  signature: string
}
