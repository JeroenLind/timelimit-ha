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

const actionType = 'UpdateUserLimitLoginCategory'

export class UpdateUserLimitLoginCategory extends ParentAction {
  readonly userId: string
  readonly categoryId?: string

  constructor ({ userId, categoryId }: {
    userId: string,
    categoryId?: string
  }) {
    super()

    assertIdWithinFamily({ actionType, field: 'userId', value: userId })

    if (categoryId !== undefined) {
      assertIdWithinFamily({ actionType, field: 'categoryId', value: categoryId })
    }

    this.userId = userId
    this.categoryId = categoryId
  }

  static parse = ({ userId, categoryId }: SerializedUpdateUserLimitLoginCategory) => (
    new UpdateUserLimitLoginCategory({
      userId,
      categoryId
    })
  )
}

export interface SerializedUpdateUserLimitLoginCategory {
  type: 'UPDATE_USER_LIMIT_LOGIN_CATEGORY'
  userId: string
  categoryId?: string
}
