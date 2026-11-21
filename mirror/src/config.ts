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

// note: some configuration parameters are read directly at the location where they are used
export type Config =
  DatabaseUrlConfig &
  MailWhitelistConfig &
  DisableSignupConfig &
  PingIntervalConfig &
  AlwaysProConfig &
  SignSecretConfig &
  MailTransportConfig

export type DatabaseUrlConfig = { databaseUrl: string }
export type MailWhitelistConfig = { mailWhitelist: Array<string> }
export type DisableSignupConfig = { disableSignup: boolean }
export type PingIntervalConfig = { pingInterval: number }
export type AlwaysProConfig = { alwaysPro: boolean }
export type SignSecretConfig = { signSecret: string }
export type MailTransportConfig = { mailTransport: MailTransport }

type MailTransport = null | { type: 'prod', value: object } | { type: 'dev' } | { type: 'test' }

function parseYesNo (value: string) {
  if (value === 'yes') {
    return true
  } else if (value === 'no') {
    return false
  } else {
    throw new ParseYesNoException('invalid value "' + value + '", expected "yes" or "no"')
  }
}

class ParseYesNoException extends Error {}

export function parseConfigFromEnvironment(): Config {
  const databaseUrl = process.env.DATABASE_URL

  if (!databaseUrl) throw new Error('DATABASE_URL environment variable is mandantory')

  const mailTransportConfig = JSON.parse(process.env.MAIL_TRANSPORT || 'null') || undefined
  const isDevMode = process.env.NODE_ENV === 'development'

  let mailTransport: MailTransport

  if (isDevMode) {
    mailTransport = { type: 'dev' }
  } else if (mailTransportConfig !== undefined) {
    mailTransport = { type: 'prod', value: mailTransportConfig }
  } else {
    console.warn('no mail transport configured')

    mailTransport = null
  }

  return {
    databaseUrl,
    mailWhitelist: (process.env.MAIL_WHITELIST || '').split(',').map((item) => item.trim()).filter((item) => item.length > 0),
    disableSignup: parseYesNo(process.env.DISABLE_SIGNUP || 'no'),
    pingInterval: parseInt(process.env.PING_INTERVAL_SEC || '25', 10) * 1000,
    alwaysPro: process.env.ALWAYS_PRO ? parseYesNo(process.env.ALWAYS_PRO) : false,
    signSecret: process.env.SIGN_SECRET || '',
    mailTransport
  }
}
