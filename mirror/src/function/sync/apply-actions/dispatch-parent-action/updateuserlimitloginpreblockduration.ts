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

import { UpdateUserLimitLoginPreBlockDuration } from '../../../../action/index.js'
import { Cache } from '../cache.js'
import { ApplyActionException } from '../exception/index.js'
import { MissingItemException, MissingUserException } from '../exception/missing-item.js'

export async function dispatchUpdateUserLimitPreBlockDuration ({ action, cache, parentUserId }: {
  action: UpdateUserLimitLoginPreBlockDuration
  cache: Cache
  parentUserId: string
}) {
  const userEntry = await cache.transaction.legacy.database.user.findOne({
    where: {
      familyId: cache.familyId,
      userId: action.userId,
      type: 'parent'
    },
    transaction: cache.transaction.legacy.transaction
  })

  if (!userEntry) {
    throw new MissingUserException()
  }

  if (action.preBlockDuration !== 0 && parentUserId !== action.userId) {
    throw new ApplyActionException({
      staticMessage: 'only the parent user itself can add a limit login pre block duration'
    })
  }

  const preBlockItem = await cache.transaction.legacy.database.userLimitLoginCategory.findOne({
    transaction: cache.transaction.legacy.transaction,
    where: {
      familyId: cache.familyId,
      userId: action.userId
    }
  })

  if (preBlockItem === null) {
    throw new MissingItemException({
      staticMessage: 'you can not set a pre block duration if there is no pre block item'
    })
  }

  await cache.transaction.legacy.database.userLimitLoginCategory.update({
    preBlockDuration: action.preBlockDuration
  }, {
    transaction: cache.transaction.legacy.transaction,
    where: {
      familyId: cache.familyId,
      userId: action.userId
    }
  })

  cache.invalidiateUserList = true
  cache.incrementTriggeredSyncLevel(2)
}
