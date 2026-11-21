/*
 * server component for the TimeLimit App
 * Copyright (C) 2019 Jonas Lochmann
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

import { RateLimiterAbstract, RateLimiterMemory } from 'rate-limiter-flexible'

const individualMailLimitMinute: RateLimiterAbstract = new RateLimiterMemory({
  keyPrefix: 'timelimit:sendmail-warning:individual:minute',
  points: 2,
  duration: 60  // 1 minute
})

const individualMailLimitDay: RateLimiterAbstract = new RateLimiterMemory({
  keyPrefix: 'timelimit:sendmail-warning:individual:day',
  points: 20,
  duration: 60 * 60 * 24  // 1 day
})

const checkIndividualMailSendLimit = async (receiver: string) => {
  await individualMailLimitMinute.consume(receiver)
  await individualMailLimitDay.consume(receiver)
}

const checkMailSendLimit = async (receiver: string) => {
  await checkIndividualMailSendLimit(receiver)
}

export const canSendWarningMail = async (receiver: string) => {
  try {
    await checkMailSendLimit(receiver)

    return true
  } catch (ex) {
    return false
  }
}
