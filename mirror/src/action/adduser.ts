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

import { assertParentPasswordValid, EncryptableParentPassword, ParentPasswordValidationException } from '../api/schema.js'
import { ParentAction } from './basetypes.js'
import { InvalidActionParameterException } from './meta/exception.js'
import { assertIdWithinFamily } from './meta/util.js'

const actionType = 'AddUserAction'

export class AddUserAction extends ParentAction {
  readonly userId: string
  readonly name: string
  readonly userType: 'parent' | 'child'
  readonly password?: EncryptableParentPassword
  readonly timeZone: string

  constructor ({ userId, name, userType, password, timeZone }: {
    userId: string
    name: string
    userType: 'parent' | 'child'
    password?: EncryptableParentPassword
    timeZone: string
  }) {
    super()

    assertIdWithinFamily({ actionType, field: 'userId', value: userId })

    this.userId = userId
    this.name = name
    this.userType = userType
    this.password = password
    this.timeZone = timeZone

    if (userType === 'parent') {
      if (!password) {
        throw new InvalidActionParameterException({
          actionType,
          staticMessage: 'parent users must have got an password'
        })
      }
    }

    if (password) {
      try {
        assertParentPasswordValid(password)
      } catch (ex) {
        if (ex instanceof ParentPasswordValidationException) {
          throw new InvalidActionParameterException({
            actionType,
            staticMessage: 'invalid password data'
          })
        } else throw ex
      }
    }
  }

  static parse = ({ name, userId, userType, password, timeZone }: SerializedAddUserAction) => (
    new AddUserAction({
      name,
      userId,
      userType,
      password,
      timeZone
    })
  )
}

export interface SerializedAddUserAction {
  type: 'ADD_USER'
  name: string
  userType: 'parent' | 'child'
  userId: string
  password?: EncryptableParentPassword
  timeZone: string
}
