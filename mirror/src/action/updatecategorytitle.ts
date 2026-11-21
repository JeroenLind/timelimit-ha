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
import { assertIdWithinFamily } from './meta/util.js'

const actionType = 'UpdateCategoryTitleAction'

export class UpdateCategoryTitleAction extends ParentAction {
  readonly categoryId: string
  readonly newTitle: string

  constructor ({ categoryId, newTitle }: {categoryId: string, newTitle: string}) {
    super()

    assertIdWithinFamily({ actionType, field: 'categoryId', value: categoryId })

    this.categoryId = categoryId
    this.newTitle = newTitle
  }

  static parse = ({ categoryId, newTitle }: SerializedUpdateCategoryTitleAction) => (
    new UpdateCategoryTitleAction({ categoryId, newTitle })
  )
}

export interface SerializedUpdateCategoryTitleAction {
  type: 'UPDATE_CATEGORY_TITLE'
  categoryId: string
  newTitle: string
}
