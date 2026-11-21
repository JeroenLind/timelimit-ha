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

import { SetKeepSignedInAction } from '../../../../action/index.js'
import { Cache } from '../cache.js'
import { SourceUserNotFoundException } from '../exception/illegal-state.js'
import { ApplyActionException } from '../exception/index.js'
import { MissingDeviceException } from '../exception/missing-item.js'

export async function dispatchSetKeepSignedIn ({ action, cache, parentUserId }: {
  action: SetKeepSignedInAction
  cache: Cache
  parentUserId: string
}) {
  const doesUserExist = await cache.doesUserExist(parentUserId)

  if (!doesUserExist) {
    throw new SourceUserNotFoundException()
  }

  const deviceEntry = await cache.transaction.legacy.database.device.findOne({
    where: {
      familyId: cache.familyId,
      deviceId: action.deviceId
    },
    transaction: cache.transaction.legacy.transaction
  })

  if (!deviceEntry) {
    throw new MissingDeviceException()
  }

  if (deviceEntry.currentUserId !== parentUserId) {
    if (action.keepSignedIn) {
      throw new ApplyActionException({ staticMessage: 'only the user itself can disable asking for the password' })
    }
  }

  const [affectedRows] = await cache.transaction.legacy.database.device.update({
    isUserKeptSignedIn: action.keepSignedIn
  }, {
    where: {
      familyId: cache.familyId,
      deviceId: action.deviceId,
      currentUserId: deviceEntry.currentUserId
    },
    transaction: cache.transaction.legacy.transaction
  })

  if (affectedRows !== 0) {
    cache.invalidiateDeviceList = true

    cache.incrementTriggeredSyncLevel(1)
    cache.incrementTargetedTriggeredSyncLevel(action.deviceId, 2)
  }
}
