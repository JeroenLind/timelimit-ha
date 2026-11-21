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

import { MinuteOfDay } from '../util/minuteofday.js'
import { assertIdWithinFamily } from '../util/token.js'

export class TimelimitRule {
  readonly ruleId: string
  readonly categoryId: string
  readonly maxTimeInMillis: number
  readonly dayMask: number  // stored as bitmask
  readonly applyToExtraTimeUsage: boolean
  readonly start: number
  readonly end: number
  readonly sessionDurationMilliseconds: number
  readonly sessionPauseMilliseconds: number
  readonly perDay: boolean
  readonly expiresAt?: number

  constructor ({
    ruleId, categoryId, maxTimeInMillis, dayMask, applyToExtraTimeUsage,
    start, end, sessionDurationMilliseconds, sessionPauseMilliseconds,
    perDay, expiresAt
  }: {
    ruleId: string
    categoryId: string
    maxTimeInMillis: number
    dayMask: number
    applyToExtraTimeUsage: boolean
    start: number
    end: number
    sessionDurationMilliseconds: number
    sessionPauseMilliseconds: number
    perDay: boolean
    expiresAt?: number
  }) {
    this.ruleId = ruleId
    this.categoryId = categoryId
    this.maxTimeInMillis = maxTimeInMillis
    this.dayMask = dayMask
    this.applyToExtraTimeUsage = applyToExtraTimeUsage
    this.start = start
    this.end = end
    this.sessionDurationMilliseconds = sessionDurationMilliseconds
    this.sessionPauseMilliseconds = sessionPauseMilliseconds
    this.perDay = perDay
    this.expiresAt = expiresAt

    assertIdWithinFamily(ruleId)
    assertIdWithinFamily(categoryId)

    if (maxTimeInMillis < 0 || (!Number.isSafeInteger(maxTimeInMillis))) {
      throw new ParseTimeLimitRuleException('maxTimeInMillis must be >= 0')
    }

    if (!(
      Number.isSafeInteger(dayMask) ||
      dayMask < 0 ||
      dayMask > (1 | 2 | 4 | 8 | 16 | 32 | 64)
    )) {
      throw new ParseTimeLimitRuleException('invalid day mask')
    }

    if (
      (!Number.isSafeInteger(start)) ||
      (!Number.isSafeInteger(end)) ||
      (!Number.isSafeInteger(sessionDurationMilliseconds)) ||
      (!Number.isSafeInteger(sessionPauseMilliseconds))
    ) {
      throw new ParseTimeLimitRuleException()
    }

    if (start < MinuteOfDay.MIN || end > MinuteOfDay.MAX || start > end) {
      throw new ParseTimeLimitRuleException()
    }

    if (sessionDurationMilliseconds < 0 || sessionPauseMilliseconds < 0) {
      throw new ParseTimeLimitRuleException()
    }

    if (expiresAt !== undefined) {
      if (!Number.isSafeInteger(expiresAt)) throw new ParseTimeLimitRuleException()

      if (expiresAt <= 0) {
        throw new ParseTimeLimitRuleException()
      }
    }
  }

  serialize = (): SerializedTimeLimitRule => ({
    ruleId: this.ruleId,
    categoryId: this.categoryId,
    time: this.maxTimeInMillis,
    days: this.dayMask,
    extraTime: this.applyToExtraTimeUsage,
    start: this.start,
    end: this.end,
    pause: this.sessionPauseMilliseconds,
    dur: this.sessionDurationMilliseconds,
    e: this.expiresAt
  })

  static parse = ({ ruleId, categoryId, time, days, extraTime, start, end, dur, pause, perDay, e }: SerializedTimeLimitRule) => (
    new TimelimitRule({
      ruleId,
      categoryId,
      maxTimeInMillis: time,
      dayMask: days,
      applyToExtraTimeUsage: extraTime,
      start: start ?? MinuteOfDay.MIN,
      end: end ?? MinuteOfDay.MAX,
      sessionDurationMilliseconds: dur ?? 0,
      sessionPauseMilliseconds: pause ?? 0,
      perDay: perDay ?? false,
      expiresAt: e
    })
  )
}

export interface SerializedTimeLimitRule {
  ruleId: string
  categoryId: string
  time: number
  days: number
  extraTime: boolean
  start?: number
  end?: number
  dur?: number
  pause?: number
  perDay?: boolean
  e?: number // expiresAt
}

export class ParseTimeLimitRuleException extends Error {}
