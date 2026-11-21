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
import { SimpleDatabaseTransaction } from '../../database/simple/index.js'

export async function createAuthTokenByMailAddress({
  mail, transaction, locale
}: {
  mail: string, transaction: SimpleDatabaseTransaction, locale: string
}): Promise<string>{
  return transaction.authToken.create({ time: Date.now(), mail, locale })
}

export async function getMailAndLocaleByAuthToken({
  mailAuthToken, transaction, invalidate
}: {
  mailAuthToken: string, transaction: SimpleDatabaseTransaction, invalidate: boolean
}): Promise<{ mail: string, locale: string } | null> {
  if (invalidate) return await transaction.authToken.checkAndDestroy(mailAuthToken)
  else return await transaction.authToken.checkAndKeep(mailAuthToken)
}

export async function requireMailAndLocaleByAuthToken({
  mailAuthToken, transaction, invalidate
}: {
  mailAuthToken: string, transaction: SimpleDatabaseTransaction, invalidate: boolean
}): Promise<{ mail: string, locale: string }> {
  const result = await getMailAndLocaleByAuthToken({ mailAuthToken, transaction, invalidate })

  if (!result) {
    throw new HttpErrors.Unauthorized()
  }

  return result
}
