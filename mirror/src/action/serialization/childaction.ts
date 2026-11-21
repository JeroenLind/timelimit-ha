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

import { ChildChangePasswordAction, SerializedChildChangePasswordAction } from '../childchangepassword.js'
import { ChildSignInAction, SerializedChildSignInAction } from '../childsignin.js'
import { UnknownActionTypeException } from '../meta/exception.js'

export type SerializedChildAction = SerializedChildChangePasswordAction | SerializedChildSignInAction

export const parseChildAction = (serialized: SerializedChildAction) => {
  if (serialized.type === 'CHILD_CHANGE_PASSWORD') {
    return ChildChangePasswordAction.parse(serialized)
  } else if (serialized.type === 'CHILD_SIGN_IN') {
    return ChildSignInAction.instance
  } else {
    throw new UnknownActionTypeException({ group: 'child' })
  }
}
