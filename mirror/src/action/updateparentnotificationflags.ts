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

import { maxMailNotificationFlags } from '../database/user.js'
import { ParentAction } from './basetypes.js'
import { assertIdWithinFamily, assertSafeInteger, throwOutOfRange } from './meta/util.js'

const actionType = 'UpdateParentNotificationFlagsAction'

export class UpdateParentNotificationFlagsAction extends ParentAction {
  readonly parentId: string
  readonly flags: number
  readonly set: boolean

  constructor ({ parentId, flags, set }: {
    parentId: string
    flags: number
    set: boolean
  }) {
    super()

    assertIdWithinFamily({ actionType, field: 'parentId', value: parentId })

    assertSafeInteger({ actionType, field: 'flags', value: flags })

    if (flags < 0 || flags > maxMailNotificationFlags) {
      throwOutOfRange({ actionType, field: 'flags', value: flags })
    }

    this.parentId = parentId
    this.flags = flags
    this.set = set
  }

  static parse = ({ parentId, flags, set }: SerializedUpdateParentNotificationFlagsAction) => (
    new UpdateParentNotificationFlagsAction({ parentId, flags, set })
  )
}

export interface SerializedUpdateParentNotificationFlagsAction {
  type: 'UPDATE_PARENT_NOTIFICATION_FLAGS'
  parentId: string
  flags: number
  set: boolean
}
