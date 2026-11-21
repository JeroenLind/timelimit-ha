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

import { SimpleDatabaseTransaction } from '../../../database/simple/index.js'
import { ServerUserList } from '../../../object/serverdatastatus.js'
import { FamilyEntry } from './family-entry.js'

export async function getUserList ({ transaction, familyEntry }: {
  transaction: SimpleDatabaseTransaction
  familyEntry: FamilyEntry
}): Promise<ServerUserList> {
  const users = (await transaction.legacy.database.user.findAll({
    where: {
      familyId: familyEntry.familyId
    },
    attributes: [
      'userId',
      'name',
      'passwordHash',
      'secondPasswordSalt',
      'type',
      'timeZone',
      'disableTimelimitsUntil',
      'mail',
      'currentDevice',
      'categoryForNotAssignedApps',
      'relaxPrimaryDeviceRule',
      'mailNotificationFlags',
      'flags'
    ],
    transaction: transaction.legacy.transaction
  })).map((item) => ({
    userId: item.userId,
    name: item.name,
    passwordHash: item.passwordHash,
    secondPasswordSalt: item.secondPasswordSalt,
    type: item.type,
    timeZone: item.timeZone,
    disableTimelimitsUntil: item.disableTimelimitsUntil,
    mail: item.mail,
    currentDevice: item.currentDevice,
    categoryForNotAssignedApps: item.categoryForNotAssignedApps,
    relaxPrimaryDeviceRule: item.relaxPrimaryDeviceRule,
    mailNotificationFlags: item.mailNotificationFlags,
    flags: item.flags
  }))

  const limitLoginCategories = (await transaction.legacy.database.userLimitLoginCategory.findAll({
    where: {
      familyId: familyEntry.familyId
    },
    attributes: [
      'userId',
      'categoryId',
      'preBlockDuration'
    ],
    transaction: transaction.legacy.transaction
  })).map((item) => ({
    userId: item.userId,
    categoryId: item.categoryId,
    preBlockDuration: item.preBlockDuration
  }))

  const getLimitLoginCategory = (userId: string) => {
    const item = limitLoginCategories.find((item) => item.userId === userId)

    if (item) {
      return item
    } else {
      return undefined
    }
  }

  return {
    version: familyEntry.userListVersion,
    data: users.map((item) => {
      const limitLoginCategory = getLimitLoginCategory(item.userId)

      return {
        id: item.userId,
        name: item.name,
        password: item.passwordHash,
        secondPasswordSalt: item.secondPasswordSalt,
        type: item.type,
        timeZone: item.timeZone,
        disableLimitsUntil: parseInt(item.disableTimelimitsUntil, 10),
        mail: item.mail,
        currentDevice: item.currentDevice,
        categoryForNotAssignedApps: item.categoryForNotAssignedApps,
        relaxPrimaryDevice: item.relaxPrimaryDeviceRule,
        mailNotificationFlags: item.mailNotificationFlags,
        blockedTimes: '',
        flags: parseInt(item.flags, 10),
        llc: limitLoginCategory?.categoryId,
        pbd: limitLoginCategory?.preBlockDuration
      }
    })
  }
}
