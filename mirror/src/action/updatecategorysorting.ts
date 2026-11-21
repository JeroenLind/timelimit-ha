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
import { assertIdWithinFamily, assertNonEmptyListWithoutDuplicates } from './meta/util.js'

const actionType = 'UpdateCategorySortingAction'

export class UpdateCategorySortingAction extends ParentAction {
  readonly categoryIds: Array<string>

  constructor ({ categoryIds }: {
    categoryIds: Array<string>
  }) {
    super()

    assertNonEmptyListWithoutDuplicates({ actionType, field: 'categoryIds', list: categoryIds })

    categoryIds.forEach((categoryId) => assertIdWithinFamily({
      actionType,
      field: 'categoryIds',
      value: categoryId
    }))

    this.categoryIds = categoryIds
  }

  static parse = ({ categoryIds }: SerializedUpdateCategorySortingAction) => (
    new UpdateCategorySortingAction({ categoryIds })
  )
}

export interface SerializedUpdateCategorySortingAction {
  type: 'UPDATE_CATEGORY_SORTING'
  categoryIds: Array<string>
}
