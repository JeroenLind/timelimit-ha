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

const actionType = 'SetRelaxPrimaryDeviceAction'

export class SetRelaxPrimaryDeviceAction extends ParentAction {
  readonly userId: string
  readonly relax: boolean

  constructor ({ userId, relax }: {
    userId: string
    relax: boolean
  }) {
    super()

    assertIdWithinFamily({ actionType, field: 'userId', value: userId })

    this.userId = userId
    this.relax = relax
  }

  static parse = ({ userId, relax }: SerializedSetRelaxPrimaryDeviceAction) => (
    new SetRelaxPrimaryDeviceAction({ userId, relax })
  )
}

export interface SerializedSetRelaxPrimaryDeviceAction {
  type: 'SET_RELAX_PRIMARY_DEVICE'
  userId: string
  relax: boolean
}
