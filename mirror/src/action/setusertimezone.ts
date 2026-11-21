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

const actionType = 'SetUserTimezoneAction'

export class SetUserTimezoneAction extends ParentAction {
  readonly userId: string
  readonly timezone: string

  constructor ({ userId, timezone }: {
    userId: string
    timezone: string
  }) {
    super()

    assertIdWithinFamily({ actionType, field: 'userId', value: userId })

    this.userId = userId
    this.timezone = timezone
  }

  static parse = ({ userId, timezone }: SerializedSetUserTimezoneAction) => (
    new SetUserTimezoneAction({ userId, timezone })
  )
}

export interface SerializedSetUserTimezoneAction {
  type: 'SET_USER_TIMEZONE'
  userId: string
  timezone: string
}
