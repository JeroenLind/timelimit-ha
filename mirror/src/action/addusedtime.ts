/*
 * server component for the TimeLimit App
 * Copyright (C) 2019 - 2026Jonas Lochmann
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

import { AppLogicAction } from './basetypes.js'
import { InvalidActionParameterException } from './meta/exception.js'
import { assertIdWithinFamily } from './meta/util.js'

const actionType = 'AddUsedTimeAction'

export class AddUsedTimeAction extends AppLogicAction {
  readonly categoryId: string
  readonly dayOfEpoch: number
  readonly timeToAdd: number
  readonly extraTimeToSubtract: number

  constructor ({ categoryId, dayOfEpoch, timeToAdd, extraTimeToSubtract }: {
    categoryId: string
    dayOfEpoch: number
    timeToAdd: number
    extraTimeToSubtract: number
  }) {
    super()

    assertIdWithinFamily({ actionType, field: 'categoryId', value: categoryId })

    if (dayOfEpoch < 0 || (!Number.isSafeInteger(dayOfEpoch))) {
      throw new InvalidActionParameterException({
        actionType,
        staticMessage: 'invalid dayOfEpoch',
        dynamicMessage: 'invalid dayOfEpoch: ' + dayOfEpoch
      })
    }

    if (timeToAdd < 0 || (!Number.isSafeInteger(timeToAdd))) {
      throw new InvalidActionParameterException({
        actionType,
        staticMessage: 'illegal timeToAdd',
        dynamicMessage: 'illegal timeToAdd: ' + timeToAdd
      })
    }

    if (extraTimeToSubtract < 0 || (!Number.isSafeInteger(extraTimeToSubtract))) {
      throw new InvalidActionParameterException({
        actionType,
        staticMessage: 'illegal extra time to subtract',
        dynamicMessage: 'illegal extra time to subtract: ' + extraTimeToSubtract
      })
    }

    this.categoryId = categoryId
    this.dayOfEpoch = dayOfEpoch
    this.timeToAdd = timeToAdd
    this.extraTimeToSubtract = extraTimeToSubtract
  }

  static parse = ({ categoryId, day, timeToAdd, extraTimeToSubtract }: SerializedAddUsedTimeAction) => (
    new AddUsedTimeAction({
      categoryId,
      dayOfEpoch: day,
      timeToAdd,
      extraTimeToSubtract
    })
  )
}

export interface SerializedAddUsedTimeAction {
  type: 'ADD_USED_TIME'
  categoryId: string
  day: number
  timeToAdd: number
  extraTimeToSubtract: number
}
