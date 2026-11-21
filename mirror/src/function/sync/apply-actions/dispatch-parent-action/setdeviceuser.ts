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

import { SetDeviceUserAction } from '../../../../action/index.js'
import { Cache } from '../cache.js'
import { MissingDeviceException, MissingUserException } from '../exception/missing-item.js'

export async function dispatchSetDeviceUser ({ action, cache }: {
  action: SetDeviceUserAction
  cache: Cache
}) {
  if (action.userId !== '') {
    const doesUserExist = await cache.doesUserExist(action.userId)

    if (!doesUserExist) {
      throw new MissingUserException()
    }
  }

  const oldDeviceItem = await cache.transaction.legacy.database.device.findOne({
    where: {
      familyId: cache.familyId,
      deviceId: action.deviceId
    },
    transaction: cache.transaction.legacy.transaction
  })

  if (!oldDeviceItem) {
    throw new MissingDeviceException()
  }

  await cache.transaction.legacy.database.device.update({
    currentUserId: action.userId,
    isUserKeptSignedIn: false
  }, {
    where: {
      familyId: cache.familyId,
      deviceId: action.deviceId
    },
    transaction: cache.transaction.legacy.transaction
  })

  cache.invalidiateDeviceList = true

  cache.incrementTriggeredSyncLevel(1)
  cache.incrementTargetedTriggeredSyncLevel(action.deviceId, 2)
}
