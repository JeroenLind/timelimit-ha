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

import { createDecipheriv, createHash } from 'crypto'
import { ParentAction } from './basetypes.js'
import { InvalidActionParameterException } from './meta/exception.js'
import { assertHexString, assertIdWithinFamily } from './meta/util.js'

const actionType = 'ChangeParentPasswordAction'

export class ChangeParentPasswordAction extends ParentAction {
  readonly parentUserId: string
  readonly newPasswordFirstHash: string
  readonly newPasswordSecondSalt: string
  readonly newPasswordSecondHashEncrypted: string
  readonly integrity: string

  constructor ({ parentUserId, newPasswordFirstHash, newPasswordSecondSalt, newPasswordSecondHashEncrypted, integrity }: {
    parentUserId: string
    newPasswordFirstHash: string
    newPasswordSecondSalt: string
    newPasswordSecondHashEncrypted: string
    integrity: string
  }) {
    super()

    assertIdWithinFamily({ actionType, field: 'parentUserId', value: parentUserId })

    if (
      (!parentUserId) ||
      (!newPasswordFirstHash) ||
      (!newPasswordSecondSalt) ||
      (!newPasswordSecondHashEncrypted) ||
      (!integrity)
    ) {
      throw new InvalidActionParameterException({
        actionType,
        staticMessage: 'missing required parameter for change parent password'
      })
    }

    if (integrity.length !== 128) {
      throw new InvalidActionParameterException({
        actionType,
        staticMessage: 'wrong length of integrity data'
      })
    }

    assertHexString({ actionType, field: 'newPasswordSecondHashEncrypted', value: newPasswordSecondHashEncrypted })
    assertHexString({ actionType, field: 'integrity', value: integrity })

    if (newPasswordSecondHashEncrypted.length <= 70) {
      throw new InvalidActionParameterException({ actionType, staticMessage: 'wrong length of the new password' })
    }

    this.parentUserId = parentUserId
    this.newPasswordFirstHash = newPasswordFirstHash
    this.newPasswordSecondSalt = newPasswordSecondSalt
    this.newPasswordSecondHashEncrypted = newPasswordSecondHashEncrypted
    this.integrity = integrity
  }

  static parse = ({ userId, hash, secondSalt, secondHashEncrypted, integrity }: SerializedChangeParentPasswordAction) => (
    new ChangeParentPasswordAction({
      parentUserId: userId,
      newPasswordFirstHash: hash,
      newPasswordSecondSalt: secondSalt,
      newPasswordSecondHashEncrypted: secondHashEncrypted,
      integrity
    })
  )

  assertIntegrityValid ({ oldPasswordSecondHash }: {oldPasswordSecondHash: string}) {
    const integrityData = oldPasswordSecondHash +
      this.parentUserId +
      this.newPasswordFirstHash +
      this.newPasswordSecondSalt +
      this.newPasswordSecondHashEncrypted

    const expected = createHash('sha512').update(integrityData).digest('hex')

    if (expected !== this.integrity) {
      throw new InvalidChangeParentPasswordIntegrityException()
    }
  }

  decryptSecondHash ({ oldPasswordSecondHash }: { oldPasswordSecondHash: string }) {
    const ivHex = this.newPasswordSecondHashEncrypted.substring(0, 32)
    const salt = this.newPasswordSecondHashEncrypted.substring(32, 64)
    const encryptedData = this.newPasswordSecondHashEncrypted.substring(64)

    const keyData = oldPasswordSecondHash + salt
    const key = createHash('sha512').update(keyData).digest().slice(0, 16)

    const decipher = createDecipheriv('aes-128-ctr', key, Buffer.from(ivHex, 'hex'))
    decipher.setAutoPadding(false)

    const decryptedSecondHash = decipher.update(Buffer.from(encryptedData, 'hex')).toString() + decipher.final().toString()

    return decryptedSecondHash
  }
}

export interface SerializedChangeParentPasswordAction {
  type: 'CHANGE_PARENT_PASSWORD'
  userId: string
  hash: string
  secondSalt: string
  secondHashEncrypted: string
  integrity: string
}

export class InvalidChangeParentPasswordIntegrityException extends Error {
  constructor () { super('invalid integrity for change parent password action') }
}
