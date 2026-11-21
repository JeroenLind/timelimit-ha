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

import { maxCategoryFlags } from '../database/category.js'
import { ParentAction } from './basetypes.js'
import { InvalidActionParameterException } from './meta/exception.js'
import { assertIdWithinFamily, assertSafeInteger } from './meta/util.js'

const actionType = 'UpdateCategoryFlagsAction'

export class UpdateCategoryFlagsAction extends ParentAction {
  readonly categoryId: string
  readonly modifiedBits: number
  readonly newValues: number

  constructor ({ categoryId, modifiedBits, newValues }: {
    categoryId: string
    modifiedBits: number
    newValues: number
  }) {
    super()

    assertIdWithinFamily({ actionType, field: 'categoryId', value: categoryId })
    assertSafeInteger({ actionType, field: 'modifiedBits', value: modifiedBits })
    assertSafeInteger({ actionType, field: 'newValues', value: newValues })

    if ((modifiedBits | maxCategoryFlags) !== maxCategoryFlags || (modifiedBits | newValues) !== modifiedBits) {
      throw new InvalidActionParameterException({
        actionType,
        staticMessage: 'flags are out of the valid range',
        dynamicMessage: 'flags are out of the valid range: ' + modifiedBits + ', ' + newValues
      })
    }

    this.categoryId = categoryId
    this.modifiedBits = modifiedBits
    this.newValues = newValues
  }

  static parse = ({ categoryId, modified, values }: SerializedUpdateCategoryFlagsAction) => (
    new UpdateCategoryFlagsAction({
      categoryId,
      modifiedBits: modified,
      newValues: values
    })
  )
}

export interface SerializedUpdateCategoryFlagsAction {
  type: 'UPDATE_CATEGORY_FLAGS'
  categoryId: string
  modified: number
  values: number
}
