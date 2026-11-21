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
import { assertIdWithinFamily } from './meta/util.js'

const actionType = 'SetSendDeviceConnected'

export class SetSendDeviceConnected extends ParentAction {
  readonly deviceId: string
  readonly enable: boolean

  constructor ({ deviceId, enable }: {
    deviceId: string
    enable: boolean
  }) {
    super()

    assertIdWithinFamily({ actionType, field: 'deviceId', value: deviceId })

    this.deviceId = deviceId
    this.enable = enable
  }

  static parse = ({ deviceId, enable }: SerializedSetSendDeviceConnected) => (
    new SetSendDeviceConnected({
      deviceId,
      enable
    })
  )
}

export interface SerializedSetSendDeviceConnected {
  type: 'SET_SEND_DEVICE_CONNECTED'
  deviceId: string
  enable: boolean
}
