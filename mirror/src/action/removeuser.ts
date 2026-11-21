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

const actionType = 'RemoveUserAction'

export class RemoveUserAction extends ParentAction {
  readonly userId: string
  // required for deleting parent users
  // parent users can only be removed by other parent users
  // this should be the value of sha512(userId + secondPasswordHash + 'remove').substring(0, 16)
  readonly authentication?: string

  constructor ({ userId, authentication }: {
    userId: string
    authentication?: string
  }) {
    super()

    assertIdWithinFamily({ actionType, field: 'userId', value: userId })

    this.userId = userId
    this.authentication = authentication
  }

  static parse = ({ userId, authentication }: SerializedRemoveUserAction) => (
    new RemoveUserAction({ userId, authentication })
  )
}

export interface SerializedRemoveUserAction {
  type: 'REMOVE_USER'
  userId: string
  authentication?: string
}
