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
import { PlaintextParentPassword, ParentPasswordValidationException, assertPlaintextParentPasswordValid } from '../../api/schema.js'
import { SimpleDatabase } from '../../database/simple/index.js'
import { MailTransport, sendPasswordRecoveryUsedMail } from '../../util/mail.js'
import { generateVersionId } from '../../util/token.js'
import { WebsocketApi } from '../../websocket/index.js'
import { requireMailAndLocaleByAuthToken } from '../authentication/index.js'
import { notifyClientsAboutChangesDelayed } from '../websocket/index.js'

export const recoverParentPassword = async ({ database, mailTransport, websocket, password, mailAuthToken }: {
  database: SimpleDatabase
  mailTransport: MailTransport
  websocket: WebsocketApi
  password: PlaintextParentPassword
  mailAuthToken: string
  // no transaction here because this is directly called from an API endpoint
}) => {
  try {
    assertPlaintextParentPasswordValid(password)
  } catch (ex) {
    if (ex instanceof ParentPasswordValidationException) throw new HttpErrors.BadRequest()
    else throw ex
  }

  await database.transaction(async (transaction) => {
    const mailInfo = await requireMailAndLocaleByAuthToken({ mailAuthToken, transaction, invalidate: true })

    // update the user entry
    const userEntry = await transaction.user.getFamilyIdAndUserIdByMailAddress(mailInfo.mail)

    if (!userEntry) {
      throw new HttpErrors.Conflict()
    }

    await transaction.user.updatePassword(userEntry, {
      passwordHash: password.hash,
      secondPasswordHash: password.secondHash,
      secondPasswordSalt: password.secondSalt,
    })

    // invalidate the user list
    await transaction.family.updateUserListVersion({
      userListVersion: generateVersionId(),
      familyId: userEntry.familyId
    })

    await notifyClientsAboutChangesDelayed({
      transaction,
      familyId: userEntry.familyId,
      websocket,
      generalLevel: 2,
      targetedLevels: new Map(),
      sourceDeviceId: null
    })

    transaction.enqueueAfterCommit(async () => {
      await sendPasswordRecoveryUsedMail({
        receiver: mailInfo.mail,
        locale: mailInfo.locale,
        mailTransport
      })
    })
  })
}
