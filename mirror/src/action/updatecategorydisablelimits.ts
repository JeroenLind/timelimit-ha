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

import { ParentAction } from './basetypes.js'
import { InvalidActionParameterException } from './meta/exception.js'
import { assertIdWithinFamily, assertSafeInteger } from './meta/util.js'

const actionType = 'UpdateCategoryDisableLimitsAction'

export class UpdateCategoryDisableLimitsAction extends ParentAction {
  readonly categoryId: string
  readonly endTime: number

  constructor ({ categoryId, endTime }: {
    categoryId: string
    endTime: number
  }) {
    super()

    assertIdWithinFamily({ actionType, field: 'categoryId', value: categoryId })
    assertSafeInteger({ actionType, field: 'endTime', value: endTime })

    if (endTime < 0) {
      throw new InvalidActionParameterException({
        actionType,
        staticMessage: 'endTime must not be smaller than zero'
      })
    }

    this.categoryId = categoryId
    this.endTime = endTime
  }

  static parse = ({ categoryId, endTime }: SerializedUpdatCategoryDisableLimitsAction) => (
    new UpdateCategoryDisableLimitsAction({ categoryId, endTime })
  )
}

export interface SerializedUpdatCategoryDisableLimitsAction {
  type: 'UPDATE_CATEGORY_DISABLE_LIMITS'
  categoryId: string
  endTime: number
}
