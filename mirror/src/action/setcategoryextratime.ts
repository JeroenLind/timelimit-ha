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
import { assertIdWithinFamily, assertSafeInteger, throwOutOfRange } from './meta/util.js'

const actionType = 'SetCategoryExtraTimeAction'

export class SetCategoryExtraTimeAction extends ParentAction {
  readonly categoryId: string
  readonly newExtraTime: number
  readonly day: number

  constructor ({ categoryId, newExtraTime, day }: {categoryId: string, newExtraTime: number, day: number}) {
    super()

    assertIdWithinFamily({ actionType, field: 'categoryId', value: categoryId })

    assertSafeInteger({ actionType, field: 'newExtraTime', value: newExtraTime })

    if (newExtraTime < 0) {
      throwOutOfRange({ actionType, field: 'newExtraTime', value: newExtraTime })
    }

    assertSafeInteger({ actionType, field: 'day', value: day })

    if (day < -1) {
      throwOutOfRange({ actionType, field: 'day', value: day })
    }

    this.categoryId = categoryId
    this.newExtraTime = newExtraTime
    this.day = day
  }

  static parse = ({ categoryId, newExtraTime, day }: SerializedSetCategoryExtraTimeAction) => (
    new SetCategoryExtraTimeAction({ categoryId, newExtraTime, day: day ?? -1 })
  )
}

export interface SerializedSetCategoryExtraTimeAction {
  type: 'SET_CATEGORY_EXTRA_TIME'
  categoryId: string
  newExtraTime: number
  day?: number
}
