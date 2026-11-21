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
import { ParentAction } from './basetypes.js'
import { InvalidActionParameterException } from './meta/exception.js'
import { assertIdWithinFamily, assertSafeInteger, throwOutOfRange } from './meta/util.js'

const actionType = 'UpdateTimelimitRuleAction'

export class UpdateTimelimitRuleAction extends ParentAction {
  readonly ruleId: string
  readonly maximumTimeInMillis: number
  readonly dayMask: number
  readonly applyToExtraTimeUsage: boolean
  readonly start: number
  readonly end: number
  readonly sessionDurationMilliseconds: number
  readonly sessionPauseMilliseconds: number
  readonly perDay: boolean
  readonly expiresAt?: number

  constructor ({
    ruleId, maximumTimeInMillis, dayMask, applyToExtraTimeUsage,
    start, end, sessionDurationMilliseconds, sessionPauseMilliseconds,
    perDay, expiresAt
  }: {
    ruleId: string
    maximumTimeInMillis: number
    dayMask: number
    applyToExtraTimeUsage: boolean
    start: number
    end: number
    sessionDurationMilliseconds: number
    sessionPauseMilliseconds: number
    perDay: boolean
    expiresAt?: number
  }) {
    super()

    this.ruleId = ruleId
    this.maximumTimeInMillis = maximumTimeInMillis
    this.dayMask = dayMask
    this.applyToExtraTimeUsage = applyToExtraTimeUsage
    this.start = start
    this.end = end
    this.sessionDurationMilliseconds = sessionDurationMilliseconds
    this.sessionPauseMilliseconds = sessionPauseMilliseconds
    this.perDay = perDay
    this.expiresAt = expiresAt

    assertIdWithinFamily({ actionType, field: 'ruleId', value: ruleId })

    assertSafeInteger({ actionType, field: 'maximumTimeInMillis', value: maximumTimeInMillis })

    if (maximumTimeInMillis < 0) {
      throwOutOfRange({ actionType, field: 'maximumTimeInMillis', value: maximumTimeInMillis })
    }

    assertSafeInteger({ actionType, field: 'dayMask', value: dayMask })

    if (dayMask < 0 || dayMask > (1 | 2 | 4 | 8 | 16 | 32 | 64)) {
      throwOutOfRange({ actionType, field: 'dayMask', value: dayMask })
    }

    assertSafeInteger({ actionType, field: 'start', value: start })
    assertSafeInteger({ actionType, field: 'end', value: end })
    assertSafeInteger({ actionType, field: 'sessionDurationMilliseconds', value: sessionDurationMilliseconds })
    assertSafeInteger({ actionType, field: 'sessionPauseMilliseconds', value: sessionPauseMilliseconds })

    if (start < MinuteOfDay.MIN || end > MinuteOfDay.MAX || start > end) {
      throw new InvalidActionParameterException({
        actionType,
        staticMessage: 'time slot out of range'
      })
    }

    if (sessionDurationMilliseconds < 0 || sessionPauseMilliseconds < 0) {
      throw new InvalidActionParameterException({
        actionType,
        staticMessage: 'session duration lesser than zero'
      })
    }

    if (expiresAt !== undefined) {
      assertSafeInteger({ actionType, field: 'expiresAt', value: expiresAt })

      if (expiresAt <= 0) {
        throwOutOfRange({ actionType, field: 'expiresAt', value: expiresAt })
      }
    }
  }

  static parse = ({ ruleId, time, days, extraTime, start, end, dur, pause, perDay, e }: SerializedUpdateTimelimitRuleAction) => (
    new UpdateTimelimitRuleAction({
      ruleId,
      maximumTimeInMillis: time,
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

export interface SerializedUpdateTimelimitRuleAction {
  type: 'UPDATE_TIMELIMIT_RULE'
  ruleId: string
  time: number
  days: number
  extraTime: boolean
  start?: number
  end?: number
  dur?: number
  pause?: number
  perDay?: boolean
  e?: number
}
