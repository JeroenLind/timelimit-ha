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
import { NewDeviceInfo } from '../../api/schema.js'
import { AlwaysProConfig } from '../../config.js'
import { SimpleDatabase } from '../../database/simple/index.js'
import { MailTransport, sendDeviceLinkedMail } from '../../util/mail.js'
import { generateAuthToken, generateIdWithinFamily, generateVersionId } from '../../util/token.js'
import { WebsocketApi } from '../../websocket/index.js'
import { requireMailAndLocaleByAuthToken } from '../authentication/index.js'
import { notifyClientsAboutChangesDelayed } from '../websocket/index.js'
import { generateServerDataStatus } from '../sync/get-server-data-status/index.js'
import { EventHandler } from '../../monitoring/eventhandler.js'
import { ServerDataStatus } from '../../object/serverdatastatus.js'
import { createEmptyClientDataStatus } from '../../object/clientdatastatus.js'

export const signInIntoFamily = async ({ config, database, eventHandler, mailTransport, mailAuthToken, newDeviceInfo, deviceName, websocket, clientLevel }: {
  config: AlwaysProConfig
  database: SimpleDatabase
  eventHandler: EventHandler
  mailTransport: MailTransport
  mailAuthToken: string
  newDeviceInfo: NewDeviceInfo
  deviceName: string
  websocket: WebsocketApi
  clientLevel: number | null
  // no transaction here because this is directly called from an API endpoint
}): Promise<{ deviceId: string; deviceAuthToken: string; data: ServerDataStatus }> => {
  return database.transaction(async (transaction) => {
    const mailInfo = await requireMailAndLocaleByAuthToken({ mailAuthToken, transaction, invalidate: true })

    const userEntry = await transaction.user.getFamilyIdAndUserIdByMailAddress(mailInfo.mail)

    if (!userEntry) {
      throw new HttpErrors.Conflict()
    }

    const deviceAuthToken = generateAuthToken()
    const deviceId = generateIdWithinFamily()

    await transaction.device.create({
      familyId: userEntry.familyId,
      time: Date.now(),
      deviceId,
      userId: userEntry.userId,
      deviceName,
      deviceAuthToken,
      deviceModel: newDeviceInfo.model,
      isUserKeptSignedIn: true
    })

    // notify about changes
    await transaction.family.updateDeviceListVersion({
      deviceListVersion: generateVersionId(),
      familyId: userEntry.familyId
    })

    await notifyClientsAboutChangesDelayed({
      familyId: userEntry.familyId,
      websocket,
      transaction,
      generalLevel: 1,
      targetedLevels: new Map(),
      sourceDeviceId: deviceId
    })

    transaction.enqueueAfterCommit(async () => {
      await sendDeviceLinkedMail({
        receiver: mailInfo.mail,
        locale: mailInfo.locale,
        deviceName,
        mailTransport
      })
    })

    const data = await generateServerDataStatus({
      transaction,
      clientStatus: createEmptyClientDataStatus({ clientLevel }),
      familyId: userEntry.familyId,
      deviceId,
      config,
      eventHandler
    })

    return {
      deviceId,
      deviceAuthToken,
      data
    }
  })
}
