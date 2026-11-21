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

const actionType = 'SetDeviceUserAction'

export class SetDeviceUserAction extends ParentAction {
  readonly deviceId: string
  readonly userId: string // user id can be ""

  constructor ({ deviceId, userId }: {
    deviceId: string
    userId: string
  }) {
    super()

    assertIdWithinFamily({ actionType, field: 'deviceId', value: deviceId })

    if (userId !== '') {
      assertIdWithinFamily({ actionType, field: 'userId', value: userId })
    }

    this.deviceId = deviceId
    this.userId = userId
  }

  static parse = ({ deviceId, userId }: SerializedSetDeviceUserAction) => (
    new SetDeviceUserAction({ deviceId, userId })
  )
}

export interface SerializedSetDeviceUserAction {
  type: 'SET_DEVICE_USER'
  deviceId: string
  userId: string
}
