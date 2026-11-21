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
import { InvalidActionParameterException } from './meta/exception.js'
import { assertIdWithinFamily, assertSafeInteger } from './meta/util.js'

const actionType = 'SetUserDisableLimitsUntilAction'

export class SetUserDisableLimitsUntilAction extends ParentAction {
  readonly childId: string
  readonly timestamp: number

  constructor ({ childId, timestamp }: {
    childId: string
    timestamp: number
  }) {
    super()

    assertIdWithinFamily({ actionType, field: 'childId', value: childId })
    assertSafeInteger({ actionType, field: 'timestamp', value: timestamp })

    if (timestamp < 0) {
      throw new InvalidActionParameterException({
        actionType,
        staticMessage: 'timestamp for set user disabe limits until must be >= 0',
        dynamicMessage: 'timestamp for set user disabe limits until must be >= 0, but was ' + timestamp
      })
    }

    this.childId = childId
    this.timestamp = timestamp
  }

  static parse = ({ childId, time }: SerializedSetUserDisableLimitsUntilAction) => (
    new SetUserDisableLimitsUntilAction({
      childId,
      timestamp: time
    })
  )
}

export interface SerializedSetUserDisableLimitsUntilAction {
  type: 'SET_USER_DISABLE_LIMITS_UNTIL'
  childId: string
  time: number
}
