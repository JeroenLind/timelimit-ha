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

import { UserFlags } from '../model/userflags.js'
import { ParentAction } from './basetypes.js'
import { InvalidActionParameterException } from './meta/exception.js'
import { assertIdWithinFamily, assertSafeInteger } from './meta/util.js'

const actionType = 'UpdateUserFlagsAction'

export class UpdateUserFlagsAction extends ParentAction {
  readonly userId: string
  readonly modifiedBits: number
  readonly newValues: number

  constructor ({ userId, modifiedBits, newValues }: {
    userId: string
    modifiedBits: number
    newValues: number
  }) {
    super()

    assertIdWithinFamily({ actionType, field: 'userId', value: userId })
    assertSafeInteger({ actionType, field: 'modifiedBits', value: modifiedBits })
    assertSafeInteger({ actionType, field: 'newValues', value: newValues })

    if ((modifiedBits | UserFlags.ALL_FLAGS) !== UserFlags.ALL_FLAGS || (modifiedBits | newValues) !== modifiedBits) {
      throw new InvalidActionParameterException({
        actionType,
        staticMessage: 'flags are out of the valid range',
        dynamicMessage: 'flags are out of the valid range: ' + modifiedBits + ', ' + newValues
      })
    }

    this.userId = userId
    this.modifiedBits = modifiedBits
    this.newValues = newValues
  }

  static parse = ({ userId, modified, values }: SerializedUpdateUserFlagsAction) => (
    new UpdateUserFlagsAction({
      userId,
      modifiedBits: modified,
      newValues: values
    })
  )
}

export interface SerializedUpdateUserFlagsAction {
  type: 'UPDATE_USER_FLAGS'
  userId: string
  modified: number
  values: number
}
