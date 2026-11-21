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
import { StaticMessageException } from '../../exception/index.js'
import { requireMailAndLocaleByAuthToken } from '../authentication/index.js'

const getStatusByMailAddress = async ({
  mail, transaction
}: { mail: string, transaction: SimpleDatabaseTransaction }) => {
  if (!mail) {
    throw new StaticMessageException({ staticMessage: 'getStatusByMailAddress: no mail address provided' })
  }

  const entry = await transaction.user.getFamilyIdAndUserIdByMailAddress(mail)

  if (entry) {
    return 'with family'
  } else {
    return 'without family'
  }
}

export const getStatusByMailToken = async ({
  mailAuthToken, transaction
}: { mailAuthToken: string, transaction: SimpleDatabaseTransaction }) => {
  const mailInfo = await requireMailAndLocaleByAuthToken({ mailAuthToken, transaction, invalidate: false })
  const mail = mailInfo.mail

  const status = await getStatusByMailAddress({ mail, transaction })

  return { mail, status }
}
