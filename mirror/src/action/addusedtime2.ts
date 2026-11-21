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
import { AppLogicAction } from './basetypes.js'
import { InvalidActionParameterException } from './meta/exception.js'
import { assertIdWithinFamily, assertListWithoutDuplicates, assertSafeInteger, throwOutOfRange } from './meta/util.js'

const actionType = 'AddUsedTimeActionVersion2'

export class AddUsedTimeActionVersion2 extends AppLogicAction {
  readonly dayOfEpoch: number
  readonly items: Array<{
    readonly categoryId: string
    readonly timeToAdd: number
    readonly extraTimeToSubtract: number
    readonly additionalCountingSlots: Array<AddUsedTimeActionItemAdditionalCountingSlot>
    readonly sessionDurationLimits: Array<AddUsedTimeActionItemSessionDurationLimitSlot>
  }>
  readonly trustedTimestamp: number

  constructor ({ dayOfEpoch, items, trustedTimestamp }: {
    dayOfEpoch: number
    items: Array<{
      categoryId: string
      timeToAdd: number
      extraTimeToSubtract: number
      additionalCountingSlots: Array<AddUsedTimeActionItemAdditionalCountingSlot>
      sessionDurationLimits: Array<AddUsedTimeActionItemSessionDurationLimitSlot>
    }>
    trustedTimestamp: number
  }) {
    super()

    assertSafeInteger({ actionType, field: 'dayOfEpoch', value: dayOfEpoch })

    if (dayOfEpoch < 0) {
      throwOutOfRange({ actionType, field: 'dayOfEpoch', value: dayOfEpoch })
    }

    assertSafeInteger({ actionType, field: 'trustedTimestamp', value: trustedTimestamp })

    if (trustedTimestamp < 0) {
      throwOutOfRange({ actionType, field: 'trustedTimestamp', value: trustedTimestamp })
    }

    if (items.length === 0) {
      throw new InvalidActionParameterException({ actionType, staticMessage: 'no items' })
    }

    assertListWithoutDuplicates({
      actionType,
      field: 'categoryIds',
      list: items.map((item) => item.categoryId)
    })

    items.forEach((item) => {
      assertIdWithinFamily({ actionType, field: 'categoryId', value: item.categoryId })

      assertSafeInteger({ actionType, field: 'timeToAdd', value: item.timeToAdd })

      if (item.timeToAdd < 0) {
        throwOutOfRange({ actionType, field: 'timeToAdd', value: item.timeToAdd })
      }

      assertSafeInteger({ actionType, field: 'extraTimeToSubtract', value: item.extraTimeToSubtract })

      if (item.extraTimeToSubtract < 0) {
        throwOutOfRange({ actionType, field: 'extraTimeToSubtract', value: item.extraTimeToSubtract })
      }

      assertListWithoutDuplicates({
        actionType,
        field: 'additionalCountingSlots',
        list: item.additionalCountingSlots.map((item) => JSON.stringify(item.serialize()))
      })

      assertListWithoutDuplicates({
        actionType,
        field: 'sessionDurationLimits',
        list: item.sessionDurationLimits.map((item) => JSON.stringify(item.serialize()))
      })
    })

    this.dayOfEpoch = dayOfEpoch
    this.items = items
    this.trustedTimestamp = trustedTimestamp
  }

  static parse = ({ d, i, t }: SerializedAddUsedTimeActionVersion2) => (
    new AddUsedTimeActionVersion2({
      dayOfEpoch: d,
      items: i.map((item) => ({
        categoryId: item.categoryId,
        timeToAdd: item.tta,
        extraTimeToSubtract: item.etts,
        sessionDurationLimits: (item.sdl ?? []).map((item) => AddUsedTimeActionItemSessionDurationLimitSlot.parse(item)),
        additionalCountingSlots: (item.as ?? []).map((item) => AddUsedTimeActionItemAdditionalCountingSlot.parse(item))
      })),
      trustedTimestamp: t ?? 0
    })
  )
}

class AddUsedTimeActionItemAdditionalCountingSlot {
  readonly start: number
  readonly end: number

  constructor ({ start, end }: { start: number, end: number }) {
    assertSafeInteger({ actionType, field: 'start', value: start })
    assertSafeInteger({ actionType, field: 'end', value: end })

    if (start < MinuteOfDay.MIN || end > MinuteOfDay.MAX || start > end) {
      throw new InvalidActionParameterException({ actionType, staticMessage: 'start or end out of range' })
    }

    if (start === MinuteOfDay.MIN && end === MinuteOfDay.MAX) {
      throw new InvalidActionParameterException({ actionType, staticMessage: 'couting slot can not fill the whole day' })
    }

    this.start = start
    this.end = end
  }

  serialize = () => [ this.start, this.end ]

  static parse = ([ start, end ]: [number, number]) => new AddUsedTimeActionItemAdditionalCountingSlot({ start, end })
}

class AddUsedTimeActionItemSessionDurationLimitSlot {
  readonly start: number
  readonly end: number
  readonly duration: number
  readonly pause: number

  constructor ({ start, end, duration, pause }: { start: number, end: number, duration: number, pause: number }) {
    assertSafeInteger({ actionType, field: 'start', value: start })
    assertSafeInteger({ actionType, field: 'end', value: end })
    assertSafeInteger({ actionType, field: 'duration', value: duration })
    assertSafeInteger({ actionType, field: 'pause', value: pause })

    if (start < MinuteOfDay.MIN || end > MinuteOfDay.MAX || start > end) {
      throw new InvalidActionParameterException({ actionType, staticMessage: 'start or end out of range' })
    }

    if (duration <= 0 || pause <= 0) {
      throw new InvalidActionParameterException({ actionType, staticMessage: 'duration and pause must not be zero or smaller' })
    }

    this.start = start
    this.end = end
    this.duration = duration
    this.pause = pause
  }

  serialize = () => [ this.start, this.end, this.duration, this.pause ]

  static parse = ([ start, end, duration, pause ]: [number, number, number, number]) => new AddUsedTimeActionItemSessionDurationLimitSlot({ start, end, duration, pause })
}

export interface SerializedAddUsedTimeActionVersion2 {
  type: 'ADD_USED_TIME_V2'
  d: number
  i: Array<{
    categoryId: string
    tta: number
    etts: number
    // start, end
    as?: Array<[number, number]>
    // start, end, length, pause
    sdl?: Array<[number, number, number, number]>
  }>
  t?: number
}
