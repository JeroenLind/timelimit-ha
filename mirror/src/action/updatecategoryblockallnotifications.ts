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

const actionType = 'UpdateCategoryBlockAllNotificationsAction'

export class UpdateCategoryBlockAllNotificationsAction extends ParentAction {
  readonly categoryId: string
  readonly blocked: boolean
  readonly blockDelay: number | undefined

  constructor ({ categoryId, blocked, blockDelay }: {
    categoryId: string
    blocked: boolean
    blockDelay: number | undefined
  }) {
    super()

    assertIdWithinFamily({ actionType, field: 'categoryId', value: categoryId })

    if (blockDelay !== undefined) {
      assertSafeInteger({ actionType, field: 'blockDelay', value: blockDelay })

      if (blockDelay < 0) {
        throwOutOfRange({ actionType, field: 'blockDelay', value: blockDelay })
      }
    }

    this.categoryId = categoryId
    this.blocked = blocked
    this.blockDelay = blockDelay
  }

  static parse = ({ categoryId, blocked, blockDelay }: SerializedUpdateCategoryBlockAllNotificationsAction) => (
    new UpdateCategoryBlockAllNotificationsAction({
      categoryId,
      blocked,
      blockDelay: blockDelay
    })
  )
}

export interface SerializedUpdateCategoryBlockAllNotificationsAction {
  type: 'UPDATE_CATEGORY_BLOCK_ALL_NOTIFICATIONS'
  categoryId: string
  blocked: boolean
  blockDelay: number | undefined
}
