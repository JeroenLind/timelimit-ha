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

import { SimpleDatabaseTransaction } from '../../database/simple/index.js'
import { mailNotificationFlags } from '../../database/user.js'
import { MailTransport, sendManipulationWarningMail } from '../../util/mail.js'
import { canSendWarningMail } from '../../util/ratelimit-warningmail.js'

export const sendManipulationWarnings = async ({ transaction, mailTransport, familyId, deviceName }: {
  transaction: SimpleDatabaseTransaction
  mailTransport: MailTransport
  familyId: string
  deviceName: string
}) => {
  const parentEntries = await transaction.legacy.database.user.findAll({
    where: {
      familyId,
      type: 'parent'
    },
    transaction: transaction.legacy.transaction
  })

  const targetMailAddresses = parentEntries
    .filter((item) => item.mail !== '')
    .filter((item) => (item.mailNotificationFlags & mailNotificationFlags.warnings) === mailNotificationFlags.warnings)
    .map((item) => item.mail)

  transaction.enqueueAfterCommit(async () => {
    await Promise.all(
      targetMailAddresses.map(async (receiver) => {
        if (await canSendWarningMail(receiver)) {
          await sendManipulationWarningMail({ receiver, deviceName, mailTransport })
        }
      })
    )
  })
}
