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

import { ChangeParentPasswordAction, InvalidChangeParentPasswordIntegrityException } from '../../../../action/changeparentpassword.js'
import { Cache } from '../cache.js'
import { ApplyActionException } from '../exception/index.js'
import { MissingUserException } from '../exception/missing-item.js'

export async function dispatchChangeParentPassword ({ action, cache }: {
  action: ChangeParentPasswordAction
  cache: Cache
}) {
  const parentEntry = await cache.transaction.legacy.database.user.findOne({
    where: {
      familyId: cache.familyId,
      userId: action.parentUserId,
      type: 'parent'
    },
    transaction: cache.transaction.legacy.transaction
  })

  if (!parentEntry) {
    throw new MissingUserException()
  }

  try {
    action.assertIntegrityValid({ oldPasswordSecondHash: parentEntry.secondPasswordHash })
  } catch (ex) {
    if (ex instanceof InvalidChangeParentPasswordIntegrityException) {
      throw new ApplyActionException({ staticMessage: 'invalid new password integrity' })
    } else throw ex
  }

  const newSecondPasswordHash = action.decryptSecondHash({ oldPasswordSecondHash: parentEntry.secondPasswordHash })

  parentEntry.passwordHash = action.newPasswordFirstHash
  parentEntry.secondPasswordSalt = action.newPasswordSecondSalt
  parentEntry.secondPasswordHash = newSecondPasswordHash

  await parentEntry.save({ transaction: cache.transaction.legacy.transaction })

  {
    const clear = cache.getSecondPasswordHashOfParent.cache.clear

    if (clear) clear()
  }

  cache.invalidiateUserList = true
  cache.incrementTriggeredSyncLevel(2)
}
