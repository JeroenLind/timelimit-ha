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

import { ParentAction } from './basetypes.js'
import { throwOutOfRange } from './meta/util.js'

const actionType = 'AddParentU2fKey'

export class AddParentU2fKeyAction extends ParentAction {
  readonly keyHandle: Buffer
  readonly publicKey: Buffer

  constructor ({ keyHandle, publicKey }: {
    keyHandle: Buffer
    publicKey: Buffer
  }) {
    super()

    if (keyHandle.length > 2048) throwOutOfRange({ actionType, field: 'keyHandle', value: keyHandle.length })
    if (publicKey.length > 2048) throwOutOfRange({ actionType, field: 'publicKey', value: publicKey.length })

    this.keyHandle = keyHandle
    this.publicKey = publicKey
  }

  static parse = ({ keyHandle, publicKey }: SerializedAddParentU2fKeyAction) => (
    new AddParentU2fKeyAction({
      keyHandle: Buffer.from(keyHandle, 'base64'),
      publicKey: Buffer.from(publicKey, 'base64')
    })
  )
}

export interface SerializedAddParentU2fKeyAction {
  type: 'ADD_PARENT_U2F'
  keyHandle: string
  publicKey: string
}
