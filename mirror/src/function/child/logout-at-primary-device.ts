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

import HttpErrors from 'http-errors'
import { SimpleDatabase } from '../../database/simple/index.js'
import { WebsocketApi } from '../../websocket/index.js'

export const logoutAtPrimaryDevice = async ({ deviceAuthToken, database, websocket }: {
  deviceAuthToken: string
  database: SimpleDatabase
  websocket: WebsocketApi
  // no transaction here because this is directly called from an API endpoint
}) => {
  await database.transaction(async (transaction) => {
    const ownDeviceEntry = await transaction.device.getFamilyIdAndCurrentUserByAuthToken(deviceAuthToken)

    if (!ownDeviceEntry) {
      throw new HttpErrors.Unauthorized()
    }

    const deviceUserEntry = await transaction.user.getCurrentDeviceIdByUserId({
      familyId: ownDeviceEntry.familyId,
      userId: ownDeviceEntry.currentUserId
    })

    if (!deviceUserEntry) {
      throw new HttpErrors.Conflict()
    }

    const otherDeviceAuthToken = await transaction.device.getDeviceAuthTokenByDeviceId({
      familyId: ownDeviceEntry.familyId,
      deviceId: deviceUserEntry.currentDeviceId,
    })

    if (otherDeviceAuthToken === null) {
      throw new HttpErrors.Conflict()
    }

    websocket.triggerLogoutByDeviceAuthToken({
      deviceAuthToken: otherDeviceAuthToken
    })
  })
}
