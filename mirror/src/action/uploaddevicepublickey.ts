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

const actionType = 'UploadDevicePublicKeyAction'

export class UploadDevicePublicKeyAction extends AppLogicAction {
  readonly key: Buffer

  constructor ({ key }: { key: Buffer }) {
    super()

    if (key.length !== 32) {
      throw new InvalidActionParameterException({
        actionType,
        staticMessage: 'key has wrong length'
      })
    }

    this.key = key
  }

  static parse = ({ key }: SerializedUploadDevicePublicKeyAction) => (
    new UploadDevicePublicKeyAction({
      key: Buffer.from(key, 'base64')
    })
  )
}

export interface SerializedUploadDevicePublicKeyAction {
  type: 'UPLOAD_DEVICE_PUBLIC_KEY'
  key: string
}
