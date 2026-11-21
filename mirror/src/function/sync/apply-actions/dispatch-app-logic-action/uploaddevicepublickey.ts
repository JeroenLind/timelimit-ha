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

import { UploadDevicePublicKeyAction } from '../../../../action/index.js'
import { Cache } from '../cache.js'
import { EventHandler } from '../../../../monitoring/eventhandler.js'
import { SourceDeviceNotFoundException } from '../exception/illegal-state.js'

export async function dispatchUploadDevicePublicKeyAction ({ deviceId, action, cache, eventHandler }: {
  deviceId: string
  action: UploadDevicePublicKeyAction
  cache: Cache
  eventHandler: EventHandler
}) {
  const deviceEntry = await cache.transaction.legacy.database.device.findOne({
    where: {
      familyId: cache.familyId,
      deviceId
    },
    transaction: cache.transaction.legacy.transaction
  })

  if (deviceEntry === null) {
    throw new SourceDeviceNotFoundException()
  } else if (deviceEntry.publicKey === null) {
    deviceEntry.publicKey = action.key

    await deviceEntry.save({ transaction: cache.transaction.legacy.transaction })

    cache.invalidiateDeviceList = true
    cache.incrementTriggeredSyncLevel(2)
  } else if (deviceEntry.publicKey.equals(action.key)) {
    eventHandler.countEvent('dispatchUploadDevicePublicKeyAction:duplicate action')
  } else {
    eventHandler.countEvent('dispatchUploadDevicePublicKeyAction:got new public key for existing device')
  }
}
