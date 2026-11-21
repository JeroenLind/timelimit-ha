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

import { allowedTimeWarningFlags } from '../database/category.js'
import { categoryTimeWarningConstants } from '../database/categorytimewarning.js'
import { ParentAction } from './basetypes.js'
import { assertIdWithinFamily, assertSafeInteger, throwOutOfRange } from './meta/util.js'

const actionType = 'UpdateCategoryTimeWarningsAction'

export class UpdateCategoryTimeWarningsAction extends ParentAction {
  readonly categoryId: string
  readonly enable: boolean
  readonly flags: number
  readonly minutes?: number

  constructor ({ categoryId, enable, flags, minutes }: {
    categoryId: string
    enable: boolean
    flags: number,
    minutes?: number
  }) {
    super()

    assertIdWithinFamily({ actionType, field: 'categoryId', value: categoryId })
    assertSafeInteger({ actionType, field: 'flags', value: flags })

    if ((flags & allowedTimeWarningFlags) !== flags) {
      throwOutOfRange({ actionType, field: 'flags', value: flags })
    }

    if (minutes !== undefined) {
      assertSafeInteger({ actionType, field: 'minutes', value: minutes })

      if (
        minutes < categoryTimeWarningConstants.minMinutes ||
        minutes > categoryTimeWarningConstants.maxMinutes
      ) {
        throwOutOfRange({ actionType, field: 'minutes', value: minutes })
      }
    }

    this.categoryId = categoryId
    this.enable = enable
    this.flags = flags
    this.minutes = minutes
  }

  static parse = ({ categoryId, enable, flags, minutes }: SerializedUpdateCategoryTimeWarningsAction) => (
    new UpdateCategoryTimeWarningsAction({ categoryId, enable, flags, minutes })
  )
}

export interface SerializedUpdateCategoryTimeWarningsAction {
  type: 'UPDATE_CATEGORY_TIME_WARNINGS'
  categoryId: string
  enable: boolean
  flags: number
  minutes?: number
}
