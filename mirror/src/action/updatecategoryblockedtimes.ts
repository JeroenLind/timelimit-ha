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

import { BitmapValidationException, validateBitmask } from '../util/bitmask.js'
import { ParentAction } from './basetypes.js'
import { InvalidActionParameterException } from './meta/exception.js'
import { assertIdWithinFamily } from './meta/util.js'

export const blockedTimesBitmaskLength = 60 * 24 * 7 /* number of minutes per week */

const actionType = 'UpdateCategoryBlockedTimesAction'

export class UpdateCategoryBlockedTimesAction extends ParentAction {
  readonly categoryId: string
  readonly blockedTimes: string

  constructor ({ categoryId, blockedTimes }: {
    categoryId: string
    blockedTimes: string
  }) {
    super()

    assertIdWithinFamily({ actionType, field: 'categoryId', value: categoryId })

    try {
      validateBitmask(blockedTimes, blockedTimesBitmaskLength)
    } catch (ex) {
      if (ex instanceof BitmapValidationException) {
        throw new InvalidActionParameterException({
          actionType,
          staticMessage: 'invalid bitmask'
        })
      } else throw ex
    }

    this.categoryId = categoryId
    this.blockedTimes = blockedTimes
  }

  static parse = ({ categoryId, times }: SerializedUpdateCategoryBlockedTimesAction) => (
    new UpdateCategoryBlockedTimesAction({
      categoryId,
      blockedTimes: times
    })
  )
}

export interface SerializedUpdateCategoryBlockedTimesAction {
  type: 'UPDATE_CATEGORY_BLOCKED_TIMES'
  categoryId: string
  times: string
}
