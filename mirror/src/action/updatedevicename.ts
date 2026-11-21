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
import { InvalidActionParameterException } from './meta/exception.js'
import { assertIdWithinFamily } from './meta/util.js'

const actionType = 'UpdateDeviceNameAction'

export class UpdateDeviceNameAction extends ParentAction {
  readonly deviceId: string
  readonly name: string

  constructor ({ deviceId, name }: {
    deviceId: string
    name: string
  }) {
    super()

    this.deviceId = deviceId
    this.name = name

    assertIdWithinFamily({ actionType, field: 'deviceId', value: deviceId })

    if (name.trim().length === 0) {
      throw new InvalidActionParameterException({
        actionType,
        staticMessage: 'new device name must not be blank'
      })
    }
  }

  static parse = ({ deviceId, name }: SerializedUpdateDeviceNameAction) => (
    new UpdateDeviceNameAction({ deviceId, name })
  )
}

export interface SerializedUpdateDeviceNameAction {
  type: 'UPDATE_DEVICE_NAME'
  deviceId: string
  name: string
}
