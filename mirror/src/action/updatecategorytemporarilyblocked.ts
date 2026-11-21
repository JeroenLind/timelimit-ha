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

const actionType = 'UpdateCategoryTemporarilyBlockedAction'

export class UpdateCategoryTemporarilyBlockedAction extends ParentAction {
  readonly categoryId: string
  readonly blocked: boolean
  readonly endTime?: number

  constructor ({ categoryId, blocked, endTime }: {
    categoryId: string
    blocked: boolean
    endTime?: number
  }) {
    super()

    assertIdWithinFamily({ actionType, field: 'categoryId', value: categoryId })

    if (endTime !== undefined) {
      assertSafeInteger({ actionType, field: 'endTime', value: endTime })

      if (!blocked) {
        throw new InvalidActionParameterException({
          actionType,
          staticMessage: 'can not set a end time when disabling blocking'
        })
      }
    }

    this.categoryId = categoryId
    this.blocked = blocked
    this.endTime = endTime
  }

  static parse = ({ categoryId, blocked, endTime }: SerializedUpdateCategoryTemporarilyBlockedAction) => (
    new UpdateCategoryTemporarilyBlockedAction({ categoryId, blocked, endTime })
  )
}

export interface SerializedUpdateCategoryTemporarilyBlockedAction {
  type: 'UPDATE_CATEGORY_TEMPORARILY_BLOCKED'
  categoryId: string
  blocked: boolean
  endTime?: number
}
