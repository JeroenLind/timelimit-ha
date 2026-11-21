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

import { SetChildPasswordAction } from '../../../../action/index.js'
import { Cache } from '../cache.js'
import { MissingUserException } from '../exception/missing-item.js'
import { decryptParentPassword } from '../../../dh/index.js'

export async function dispatchSetChildPassword ({ action, cache }: {
  action: SetChildPasswordAction
  cache: Cache
}) {
  const childEntry = await cache.transaction.legacy.database.user.findOne({
    where: {
      familyId: cache.familyId,
      userId: action.childUserId,
      type: 'child'
    },
    transaction: cache.transaction.legacy.transaction
  })

  if (!childEntry) {
    throw new MissingUserException()
  }

  const newPassword = await decryptParentPassword({ cache, password: action.newPassword })

  childEntry.passwordHash = newPassword.hash
  childEntry.secondPasswordSalt = newPassword.secondSalt
  childEntry.secondPasswordHash = newPassword.secondHash

  await childEntry.save({ transaction: cache.transaction.legacy.transaction })

  {
    const clear = cache.getSecondPasswordHashOfChild.cache.clear

    if (clear) clear()
  }

  cache.invalidiateUserList = true
  cache.incrementTriggeredSyncLevel(2)
}
