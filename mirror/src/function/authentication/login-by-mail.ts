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
import { MailTransport, sendAuthenticationMail } from '../../util/mail.js'
import { areWordSequencesEqual, randomWords } from '../../util/random-words.js'
import { checkMailSendLimit } from '../../util/ratelimit-authmail.js'
import { createAuthTokenByMailAddress } from './index.js'

export const sendLoginCode = async ({ mail, deviceAuthToken, locale, database, mailTransport }: {
  mail: string
  deviceAuthToken?: string
  locale: string
  database: SimpleDatabase
  mailTransport: MailTransport
  // no transaction here because this is directly called from an API endpoint
}): Promise<{ mailLoginToken: string }> => {
  let deviceName = null

  if (deviceAuthToken !== undefined) {
    deviceName = await database.transaction(async (transaction) => {
      const deviceEntry = await transaction.device.getFamilyIdAndDeviceNameByAuthToken(deviceAuthToken)

      if (!deviceEntry) {
        throw new HttpErrors.Unauthorized()
      }

      const hasMail = await transaction.user.doesFamilyHaveUserWithMail({ familyId: deviceEntry.familyId, mail })

      if (hasMail) {
        return deviceEntry.deviceName
      } else {
        // do not show the device name if it is from another family
        // otherwise third parties could chose a part of the content of the mail
        return null
      }
    })
  }

  try {
    await checkMailSendLimit(mail)
  } catch (ex) {
    throw new HttpErrors.TooManyRequests()
  }

  const code = randomWords(3)

  await sendAuthenticationMail({
    receiver: mail,
    code,
    locale,
    deviceName,
    mailTransport
  })

  const mailLoginToken = await database.transaction(async (transaction) => {
    return (await transaction.mailLoginToken.create({
      time: Date.now(),
      code,
      mail,
      locale
    })).token
  })

  return {
    mailLoginToken
  }
}

// 403 Forbidden = receivedCode is invalid
// 410 Gone = mailLoginToken is invalid or expired
export const signInByMailCode = async ({ mailLoginToken, receivedCode, database }: {
  mailLoginToken: string
  receivedCode: string
  database: SimpleDatabase
  // no transaction here because this is directly called from an API endpoint
}): Promise<{ mailAuthToken: string }> => {
  const result = await database.transaction(async (transaction) => {
    const entry = await transaction.mailLoginToken.query(mailLoginToken)

    if ((!entry) || entry.remainingAttempts === 0) {
      throw new HttpErrors.Gone()
    }

    if (!areWordSequencesEqual(entry.code, receivedCode)) {
      const updateResult = await transaction.mailLoginToken.updateRemainingAttempts(mailLoginToken, entry.remainingAttempts - 1)

      if (!updateResult.found) {
        throw new HttpErrors.Gone()
      }

      if (entry.remainingAttempts === 1) {
        return () => { throw new HttpErrors.Gone() }
      } else {
        return () => { throw new HttpErrors.Forbidden() }
      }
    }

    const destroyResult = await transaction.mailLoginToken.destroy(mailLoginToken)

    if (!destroyResult.found) {
      throw new HttpErrors.Gone()
    }

    const mailAuthToken = await createAuthTokenByMailAddress({
      mail: entry.mail,
      locale: entry.locale,
      transaction
    })

    return () => ({ mailAuthToken })
  })

  return result()
}
