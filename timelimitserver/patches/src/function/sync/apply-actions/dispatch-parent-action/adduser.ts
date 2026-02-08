/*
 * server component for the TimeLimit App
 * Copyright (C) 2019 - 2022 Jonas Lochmann
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

import { AddUserAction } from '../../../../action'
import { decryptParentPassword } from '../../../dh'
import { Cache } from '../cache'

export async function dispatchAddUser ({ action, cache }: {
  action: AddUserAction
  cache: Cache
}) {
  console.log('[ADD-USER] Processing action:', {
    userId: action.userId,
    userType: action.userType,
    name: action.name,
    timeZone: action.timeZone,
    hasPassword: !!action.password
  })

  const password =
    action.password ?
    await decryptParentPassword({ cache, password: action.password }) :
    null

  try {
    console.log('[ADD-USER] Creating user in database...')
    
    await cache.database.user.create({
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
    }, { transaction: cache.transaction })

    console.log('[ADD-USER] ✅ User created successfully:', action.userId)
  } catch (err) {
    console.error('[ADD-USER] ❌ FAILED to create user:', {
      userId: action.userId,
      error: err instanceof Error ? err.message : String(err),
      name: err instanceof Error ? err.name : 'unknown',
      code: (err as any)?.code,
      field: (err as any)?.fields,
      originalError: JSON.stringify(err, null, 2).substring(0, 500)
    })
    throw err
  }

  cache.invalidiateUserList = true
  cache.incrementTriggeredSyncLevel(1)

  cache.doesUserExist.cache.set(action.userId, true)
}
