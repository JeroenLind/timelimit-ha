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

import { PingAction } from '../../../../action/index.js'
import { types as pingTypes } from '../../../../database/ping.js'
import { Cache } from '../cache.js'

export async function dispatchPingAction ({ action, cache, deviceId }: {
  deviceId: string
  action: PingAction
  cache: Cache
}) {
  // handle insertion
  if (action.event === 'ping' || action.event === 'pong') {
    let type

    if (action.event === 'ping') type = pingTypes.ping
    else if (action.event === 'pong') type = pingTypes.pong
    else throw new Error()

    // delete any previous ping/pong
    await cache.transaction.legacy.database.ping.destroy({
      where: {
        familyId: cache.familyId,
        receiverDeviceId: action.deviceId,
        senderDeviceId: deviceId,
	type: type
      },
      transaction: cache.transaction.legacy.transaction
    })

    // insert
    await cache.transaction.legacy.database.ping.create({
      familyId: cache.familyId,
      receiverDeviceId: action.deviceId,
      senderDeviceId: deviceId,
      type,
      token: action.token
    }, {
      transaction: cache.transaction.legacy.transaction
    })

    // notify
    cache.incrementTargetedTriggeredSyncLevel(action.deviceId, 2)
  }

  // handle deleting
  if (action.event === 'pong' || action.event === 'clear') {
    await cache.transaction.legacy.database.ping.destroy({
      where: {
        familyId: cache.familyId,
        receiverDeviceId: deviceId,
        senderDeviceId: action.deviceId,
        token: action.token
      },
      transaction: cache.transaction.legacy.transaction
    })
  }
}
