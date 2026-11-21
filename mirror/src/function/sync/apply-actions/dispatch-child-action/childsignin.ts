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

import { ChildSignInAction, SetDeviceUserAction } from '../../../../action/index.js'
import { Cache } from '../cache.js'
import { dispatchSetDeviceUser } from '../dispatch-parent-action/setdeviceuser.js'
import { SourceUserNotFoundException } from '../exception/illegal-state.js'
import { PremiumVersionMissingException } from '../exception/premium.js'

export const dispatchChildSignIn = async ({ deviceId, childUserId, cache }: {
  action: ChildSignInAction
  deviceId: string
  childUserId: string
  cache: Cache
}) => {
  if (!cache.hasFullVersion) {
    throw new PremiumVersionMissingException()
  }

  await dispatchSetDeviceUser({
    action: new SetDeviceUserAction({
      deviceId,
      userId: childUserId
    }),
    cache
  })

  const userEntryUnsafe = await cache.transaction.legacy.database.user.findOne({
    where: {
      familyId: cache.familyId,
      type: 'child',
      userId: childUserId
    },
    transaction: cache.transaction.legacy.transaction,
    attributes: [
      'currentDevice'
    ]
  })

  if (!userEntryUnsafe) {
    throw new SourceUserNotFoundException()
  }

  if (userEntryUnsafe.currentDevice === deviceId) {
    // unassign to prevent way aroundprimary device rule

    await cache.transaction.legacy.database.user.update({
      currentDevice: ''
    }, {
      where: {
        familyId: cache.familyId,
        type: 'child',
        userId: childUserId
      },
      transaction: cache.transaction.legacy.transaction
    })

    cache.invalidiateUserList = true
  }

  cache.incrementTriggeredSyncLevel(1)
}
