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
import { generateVersionId } from '../../util/token.js'
import { WebsocketApi } from '../../websocket/index.js'
import { requireMailAndLocaleByAuthToken } from '../authentication/index.js'
import { notifyClientsAboutChangesDelayed } from '../websocket/index.js'

export const linkMailAddress = async ({ mailAuthToken, deviceAuthToken, parentUserId, parentPasswordSecondHash, database, websocket }: {
  mailAuthToken: string
  deviceAuthToken: string
  parentUserId: string
  parentPasswordSecondHash: string
  database: SimpleDatabase
  websocket: WebsocketApi
  // no transaction here because this is directly called from an API endpoint
}) => {
  await database.transaction(async (transaction) => {
    const familyId = await transaction.device.getFamilyIdByAuthToken(deviceAuthToken)

    if (familyId === null) {
      throw new HttpErrors.Unauthorized()
    }

    const mailInfo = await requireMailAndLocaleByAuthToken({ mailAuthToken, transaction, invalidate: true })

    const exisitingUser = await transaction.user.getFamilyIdAndUserIdByMailAddress(mailInfo.mail)

    if (exisitingUser) {
      throw new HttpErrors.Conflict()
    }

    const parentEntry = await transaction.user.getParentUserMailAndSecondPasswordHash({
      familyId,
      userId: parentUserId
    })

    if (!parentEntry) {
      throw new HttpErrors.Conflict()
    }

    if (parentEntry.mail !== '') {
      throw new HttpErrors.Conflict()
    }

    if (parentEntry.secondPasswordHash !== parentPasswordSecondHash) {
      throw new HttpErrors.Conflict()
    }

    if (!parentEntry.secondPasswordSalt) {
      throw new HttpErrors.Conflict()
    }

    await transaction.user.updateParentUserMailAddress({
      familyId,
      userId: parentUserId,
      newMailAddress: mailInfo.mail,
    })

    // invalidiate client caches
    await transaction.family.updateUserListVersion({
      userListVersion: generateVersionId(),
      familyId
    })

    // notify
    await notifyClientsAboutChangesDelayed({
      familyId,
      sourceDeviceId: null,
      generalLevel: 1,
      targetedLevels: new Map(),
      transaction,
      websocket
    })
  })
}
