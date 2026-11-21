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

const globalMailSendLimitMinute: RateLimiterAbstract = new RateLimiterMemory({
  keyPrefix: 'timelimit:sendmail-auth:global:minute',
  points: 100,
  duration: 60  // 1 minute
})

const globalMailSendLimitHour: RateLimiterAbstract = new RateLimiterMemory({
  keyPrefix: 'timelimit:sendmail-auth:global:hour',
  points: 500,
  duration: 60 * 60 // 1 hour
})

const gloablMailSendLimitDay: RateLimiterAbstract = new RateLimiterMemory({
  keyPrefix: 'timelimit:sendmail-auth:global:day',
  points: 1000,
  duration: 60 * 60 * 24  // 1 day
})

const checkGlobalMailSendLimit = async () => {
  await globalMailSendLimitMinute.consume('global')
  await globalMailSendLimitHour.consume('global')
  await gloablMailSendLimitDay.consume('global')
}

const individualMailLimitFiveMinutes: RateLimiterAbstract = new RateLimiterMemory({
  keyPrefix: 'timelimit:sendmail-auth:individual:5minutes',
  points: 2,
  duration: 60 * 5  // 5 minutes
})

const individualMailLimitDay: RateLimiterAbstract = new RateLimiterMemory({
  keyPrefix: 'timelimit:sendmail-auth:individual:day',
  points: 6,
  duration: 60 * 60 * 24  // 1 day
})

const checkIndividualMailSendLimit = async (receiver: string) => {
  await individualMailLimitFiveMinutes.consume(receiver)
  await individualMailLimitDay.consume(receiver)
}

export const checkMailSendLimit = async (receiver: string) => {
  await checkIndividualMailSendLimit(receiver)
  await checkGlobalMailSendLimit()
}
