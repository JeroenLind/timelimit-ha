/*
 * server component for the TimeLimit App
 * Copyright (C) 2019 - 2020 Jonas Lochmann
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
  keyPrefix: 'timelimit:sendmail-taskdone:individual:minute',
  points: 1,
  duration: 60  // 1 minute
})

const individualMailLimitFiveMinutes: RateLimiterAbstract = new RateLimiterMemory({
  keyPrefix: 'timelimit:sendmail-taskdone:individual:fiveminutes',
  points: 3,
  duration: 60 * 5  // 5 minutes
})

const individualMailLimitHourly: RateLimiterAbstract = new RateLimiterMemory({
  keyPrefix: 'timelimit:sendmail-taskdone:individual:hourly',
  points: 5,
  duration: 60 * 60  // 1 hour
})

const individualMailLimitDay: RateLimiterAbstract = new RateLimiterMemory({
  keyPrefix: 'timelimit:sendmail-taskdone:individual:day',
  points: 10,
  duration: 60 * 60 * 24  // 1 day
})

const checkIndividualMailSendLimit = async (receiver: string) => {
  await individualMailLimitMinute.consume(receiver)
  await individualMailLimitFiveMinutes.consume(receiver)
  await individualMailLimitHourly.consume(receiver)
  await individualMailLimitDay.consume(receiver)
}

const checkMailSendLimit = async (receiver: string) => {
  await checkIndividualMailSendLimit(receiver)
}

export const canSendTaskDoneMail = async (receiver: string) => {
  try {
    await checkMailSendLimit(receiver)

    return true
  } catch (ex) {
    return false
  }
}
