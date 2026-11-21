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

import { AddUserAction } from '../../../../action/index.js'
import { decryptParentPassword } from '../../../dh/index.js'
import { Cache } from '../cache.js'

export async function dispatchAddUser ({ action, cache }: {
  action: AddUserAction
  cache: Cache
}) {
  const password =
    action.password ?
    await decryptParentPassword({ cache, password: action.password }) :
    null

  await cache.transaction.legacy.database.user.create({
    familyId: cache.familyId,
    userId: action.userId,
    type: action.userType,
    name: action.name,
    timeZone: action.timeZone,
    passwordHash: password ? password.hash : '',
    secondPasswordHash: password ? password.secondHash : '',
    secondPasswordSalt: password ? password.secondSalt : '',
    mail: '',
    disableTimelimitsUntil: '0',
    currentDevice: '',
    categoryForNotAssignedApps: '',
    relaxPrimaryDeviceRule: false,
    mailNotificationFlags: 0,
    blockedTimes: '',
    flags: '0'
  }, { transaction: cache.transaction.legacy.transaction })

  cache.invalidiateUserList = true
  cache.incrementTriggeredSyncLevel(1)

  cache.doesUserExist.cache.set(action.userId, true)
}
