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

import { FinishKeyRequestAction } from '../../../../action/index.js'
import { Cache } from '../cache.js'

export async function dispatchFinishKeyRequestAction ({ action, cache, deviceId }: {
  deviceId: string
  action: FinishKeyRequestAction
  cache: Cache
}) {
  await cache.transaction.legacy.database.keyRequest.destroy({
    where: {
      familyId: cache.familyId,
      senderDeviceId: deviceId,
      senderSequenceNumber: action.deviceSequenceNumber.toString(10)
    },
    transaction: cache.transaction.legacy.transaction
  })

  // no sync triggered
}
