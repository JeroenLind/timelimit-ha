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

import { UpdateEnableActivityLevelBlockingAction } from '../../../../action/index.js'
import { Cache } from '../cache.js'
import { MissingDeviceException } from '../exception/missing-item.js'

export async function dispatchUpdateEnableActivityLevelBlocking ({ action, cache }: {
  action: UpdateEnableActivityLevelBlockingAction
  cache: Cache
}) {
  const oldDevice = await cache.transaction.legacy.database.device.findOne({
    transaction: cache.transaction.legacy.transaction,
    where: {
      familyId: cache.familyId,
      deviceId: action.deviceId
    }
  })

  if (!oldDevice) {
    throw new MissingDeviceException()
  }

  await cache.transaction.legacy.database.device.update({
    activityLevelBlocking: action.enable
  }, {
    transaction: cache.transaction.legacy.transaction,
    where: {
      familyId: cache.familyId,
      deviceId: action.deviceId
    }
  })

  cache.invalidiateDeviceList = true
  cache.incrementTriggeredSyncLevel(1)
  cache.incrementTargetedTriggeredSyncLevel(action.deviceId, 2)
}
