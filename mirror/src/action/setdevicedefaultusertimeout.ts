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
import { assertIdWithinFamily, assertSafeInteger } from './meta/util.js'

const actionType = 'SetDeviceDefaultUserTimeoutAction'

export class SetDeviceDefaultUserTimeoutAction extends ParentAction {
  readonly deviceId: string
  readonly timeout: number

  constructor ({ deviceId, timeout }: {
    deviceId: string
    timeout: number
  }) {
    super()

    assertIdWithinFamily({ actionType, field: 'deviceId', value: deviceId })
    assertSafeInteger({ actionType, field: 'timeout', value: timeout })

    if (timeout < 0) {
      throw new InvalidActionParameterException({
        actionType,
        staticMessage: 'timeout must be a non-negative integer',
        dynamicMessage: 'timeout must be a non-negative integer, was ' + timeout
      })
    }

    this.deviceId = deviceId
    this.timeout = timeout
  }

  static parse = ({ deviceId, timeout }: SerializedSetDeviceDefaultUserTimeoutAction) => (
    new SetDeviceDefaultUserTimeoutAction({ deviceId, timeout })
  )
}

export interface SerializedSetDeviceDefaultUserTimeoutAction {
  type: 'SET_DEVICE_DEFAULT_USER_TIMEOUT'
  deviceId: string
  timeout: number
}
