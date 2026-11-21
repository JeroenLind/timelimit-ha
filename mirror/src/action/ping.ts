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
import { assertIdWithinFamily } from './meta/util.js'

const actionType = 'PingAction'

export class PingAction extends AppLogicAction {
  readonly deviceId: string
  readonly event: PingEvent
  readonly token: string

  constructor ({ deviceId, event, token }: {
    deviceId: string
    event: PingEvent
    token: string
  }) {
    super()

    assertIdWithinFamily({ actionType, field: 'deviceId', value: deviceId })
    assertIdWithinFamily({ actionType, field: 'token', value: token })

    this.deviceId = deviceId
    this.event = event
    this.token = token
  }

  static parse = ({ deviceId, event, token }: SerializedPingAction) => (
    new PingAction({ deviceId, event, token })
  )
}

export interface SerializedPingAction {
  type: 'PING'
  deviceId: string
  event: PingEvent
  token: string
}

export type PingEvent = 'ping' | 'pong' | 'clear'
