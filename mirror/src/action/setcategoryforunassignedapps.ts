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

const actionType = 'SetCategoryForUnassignedAppsAction'

export class SetCategoryForUnassignedAppsAction extends ParentAction {
  readonly childId: string
  readonly categoryId: string

  constructor ({ childId, categoryId }: {
    childId: string
    categoryId: string
  }) {
    super()

    assertIdWithinFamily({ actionType, field: 'childId', value: childId })

    if (categoryId !== '') {
      assertIdWithinFamily({ actionType, field: 'categoryId', value: categoryId })
    }

    this.childId = childId
    this.categoryId = categoryId
  }

  static parse = ({ childId, categoryId }: SerializedSetCategoryForUnassignedAppsAction) => (
    new SetCategoryForUnassignedAppsAction({ childId, categoryId })
  )
}

export interface SerializedSetCategoryForUnassignedAppsAction {
  type: 'SET_CATEGORY_FOR_UNASSIGNED_APPS'
  childId: string
  categoryId: string
}
