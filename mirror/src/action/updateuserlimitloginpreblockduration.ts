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

import { maxPreBlockDuration } from '../database/userlimitlogincategory.js'
import { ParentAction } from './basetypes.js'
import { assertIdWithinFamily, assertSafeInteger, throwOutOfRange } from './meta/util.js'

const actionType = 'UpdateUserLimitLoginPreBlockDuration'

export class UpdateUserLimitLoginPreBlockDuration extends ParentAction {
  readonly userId: string
  readonly preBlockDuration: number

  constructor ({ userId, preBlockDuration }: {
    userId: string,
    preBlockDuration: number
  }) {
    super()

    assertIdWithinFamily({ actionType, field: 'userId', value: userId })
    assertSafeInteger({ actionType, field: 'preBlockDuration', value: preBlockDuration })

    if (preBlockDuration < 0 || preBlockDuration > maxPreBlockDuration) {
      throwOutOfRange({ actionType, field: 'preBlockDuration', value: preBlockDuration })
    }

    this.userId = userId
    this.preBlockDuration = preBlockDuration
  }

  static parse = ({ userId, preBlockDuration }: SerializedUpdateUserLimitLoginPreBlockDuration) => (
    new UpdateUserLimitLoginPreBlockDuration({
      userId,
      preBlockDuration
    })
  )
}

export interface SerializedUpdateUserLimitLoginPreBlockDuration {
  type: 'UPDATE_USER_LIMIT_LOGIN_PRE_BLOCK_DURATION'
  userId: string
  preBlockDuration: number
}
