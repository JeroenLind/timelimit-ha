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
import { DeleteAccountPayload } from '../../api/schema.js'
import { SimpleDatabase } from '../../database/simple/index.js'
import { MailTransport, sendAccountDeletedMail } from '../../util/mail.js'
import { WebsocketApi } from '../../websocket/index.js'
import { requireMailAndLocaleByAuthToken } from '../authentication/index.js'
import { deleteFamilies } from './delete-families.js'

export async function deleteAccount({ request, database, mailTransport, websocket }: {
  request: DeleteAccountPayload
  database: SimpleDatabase
  mailTransport: MailTransport
  websocket: WebsocketApi
}) {
  await database.transaction(async (transaction) => {
    const familyId = await transaction.device.getFamilyIdByAuthToken(request.deviceAuthToken)

    if (familyId === null) {
      throw new HttpErrors.Unauthorized()
    }

    const registeredMailAddresses = new Set<string>(await transaction.user.getAllMailAddressesByFamilyId(familyId))

    const authenticatedMailAddresses = new Set<string>()

    for (const mailAuthToken of request.mailAuthTokens) {
      const info = await requireMailAndLocaleByAuthToken({
        mailAuthToken,
        transaction,
        invalidate: true
      })

      if (!registeredMailAddresses.has(info.mail)) throw new HttpErrors.Unauthorized()

      authenticatedMailAddresses.add(info.mail)
    }

    if (registeredMailAddresses.size !== authenticatedMailAddresses.size) throw new HttpErrors.Unauthorized()

    registeredMailAddresses.forEach((mail) => {
      if (!authenticatedMailAddresses.has(mail)) throw new HttpErrors.Unauthorized()
    })

    const deviceEntries = await transaction.device.getDeviceIdsAndAuthTokensByFamilyId(familyId)

    await deleteFamilies({ transaction, familiyIds: [familyId] })

    transaction.enqueueAfterCommit(() => {
      for (const device of deviceEntries) {
        websocket.triggerSyncByDeviceAuthToken({
          deviceAuthToken: device.deviceAuthToken,
          isImportant: true
        })
      }

      registeredMailAddresses.forEach((receiver) => {
        sendAccountDeletedMail({ receiver, mailTransport }).catch((ex) => {
          console.warn('failure while sending account deletion confirmation', ex)
        })
      })
    })
  })
}
