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
import { AlwaysProConfig } from '../../config.js'
import { SimpleDatabase } from '../../database/simple/index.js'
import { generateVersionId } from '../../util/token.js'
import { WebsocketApi } from '../../websocket/index.js'
import { notifyClientsAboutChangesDelayed } from '../websocket/index.js'

export const setPrimaryDevice = async ({ config, database, websocket, deviceAuthToken, currentUserId, action }: {
  config: AlwaysProConfig
  database: SimpleDatabase
  websocket: WebsocketApi
  deviceAuthToken: string
  currentUserId: string
  action: 'set this device' | 'unset this device'
  // no transaction here because this is directly called from an API endpoint
}): Promise<'assigned to other device' | 'requires full version' | 'success'> => {
  return database.transaction(async (transaction): Promise<'assigned to other device' | 'requires full version' | 'success'> => {
    const deviceEntry = await transaction.device.getFamilyIdAndDeviceIdAndCurrentUserAndKeptSignedInByAuthToken(deviceAuthToken)

    if (!deviceEntry) {
      throw new HttpErrors.Unauthorized()
    }

    if ((deviceEntry.currentUserId !== currentUserId) || (currentUserId === '')) {
      throw new HttpErrors.Conflict()
    }

    const userEntry = await transaction.user.getCurrentDeviceIdByUserId({
      familyId: deviceEntry.familyId,
      userId: deviceEntry.currentUserId
    })

    if (!userEntry) {
      throw new HttpErrors.Conflict()
    }

    const userDeviceIds = await transaction.device.getDeviceIdsByCurrentUserId({
      familyId: deviceEntry.familyId,
      currentUserId
    })

    if (userDeviceIds.length >= 2) {
      const hasFullVersion = await transaction.family.hasFullVersionByFamilyId(deviceEntry.familyId)

      if (!(hasFullVersion || config.alwaysPro)) {
        return 'requires full version'
      }
    }

    if (action === 'set this device') {
      // check that no other device is selected
      if (userDeviceIds.indexOf(userEntry.currentDeviceId) !== -1) {
        return 'assigned to other device'
      }

      // update
      await transaction.user.updateCurrentDevice({
        familyId: deviceEntry.familyId,
        userId: currentUserId,
        currentDeviceId: deviceEntry.deviceId
      })
    } else if (action === 'unset this device') {
      if (userEntry.currentDeviceId !== deviceEntry.deviceId) {
        throw new HttpErrors.Conflict()
      }

      // update
      await transaction.user.updateCurrentDevice({
        familyId: deviceEntry.familyId,
        userId: currentUserId,
        currentDeviceId: ''
      })
    } else {
      throw new HttpErrors.InternalServerError('illegal state')
    }

    // invalidiate user list
    await transaction.family.updateUserListVersion({
      userListVersion: generateVersionId(),
      familyId: deviceEntry.familyId
    })

    // trigger sync
    await notifyClientsAboutChangesDelayed({
      familyId: deviceEntry.familyId,
      sourceDeviceId: deviceEntry.deviceId,
      websocket,
      transaction,
      generalLevel: 1,  // the source device knows it already
      targetedLevels: new Map(),
    })

    return 'success'
  })
}
