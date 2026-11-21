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

import memoize from 'lodash/memoize.js'
import * as Sequelize from 'sequelize'
import { AlwaysProConfig } from '../../../config.js'
import { VisibleConnectedDevicesManager } from '../../../connected-devices/index.js'
import { SimpleDatabaseTransaction } from '../../../database/simple/index.js'
import { setToList } from '../../../util/list.js'
import { MailTransport } from '../../../util/mail.js'
import { generateVersionId } from '../../../util/token.js'
import { SourceUserNotFoundException } from './exception/illegal-state.js'
import { InvalidChildActionIntegrityValue } from './exception/integrity.js'

export class Cache {
  readonly familyId: string
  readonly deviceId: string
  readonly hasFullVersion: boolean
  mailTransport: MailTransport
  transaction: SimpleDatabaseTransaction
  readonly connectedDevicesManager: VisibleConnectedDevicesManager
  private requireSenderDoFullSync = false

  categoriesWithModifiedApps = new Set<string>()
  categoriesWithModifiedBaseData = new Set<string>()
  categoriesWithModifiedTimeLimitRules = new Set<string>()
  categoriesWithModifiedUsedTimes = new Set<string>()
  categoriesWithModifiedTasks = new Set<string>()

  devicesWithModifiedShowDeviceConnected = new Map<string, boolean>()

  invalidiateUserList = false
  invalidiateDeviceList = false
  invalidateU2fList = false
  triggeredSyncLevel: 0 | 1 | 2 = 0 // 0 = no, 1 = unimportant, 2 = important
  targetedTriggeredSyncLevels = new Map<string, 0 | 1 | 2>()

  constructor ({ familyId, deviceId, hasFullVersion, transaction, config, connectedDevicesManager, mailTransport }: {
    familyId: string
    deviceId: string
    hasFullVersion: boolean
    transaction: SimpleDatabaseTransaction
    config: AlwaysProConfig
    connectedDevicesManager: VisibleConnectedDevicesManager
    mailTransport: MailTransport
  }) {
    this.familyId = familyId
    this.deviceId = deviceId
    this.hasFullVersion = hasFullVersion || config.alwaysPro
    this.transaction = transaction
    this.connectedDevicesManager = connectedDevicesManager
    this.mailTransport = mailTransport
  }

  incrementTriggeredSyncLevel(newLevel: 1 | 2) {
    if (newLevel > this.triggeredSyncLevel) this.triggeredSyncLevel = newLevel
  }

  incrementTargetedTriggeredSyncLevel(deviceId: string, newLevel: 1 | 2) {
    const oldLevel = this.targetedTriggeredSyncLevels.get(deviceId) || 0

    if (newLevel > oldLevel) this.targetedTriggeredSyncLevels.set(deviceId, newLevel)
  }

  async subtransaction<T> (callback: () => Promise<T>): Promise<T> {
    const oldTransaction = this.transaction

    return this.transaction.transaction(async (newTransaction) => {
      try {
        this.transaction = newTransaction

        const result = await callback()

        return result
      } finally {
        this.transaction = oldTransaction
      }
    })
  }

  getSecondPasswordHashOfParent = memoize(async (parentId: string) => {
    const userEntryUnsafe = await this.transaction.legacy.database.user.findOne({
      where: {
        familyId: this.familyId,
        userId: parentId,
        type: 'parent'
      },
      attributes: ['secondPasswordHash'],
      transaction: this.transaction.legacy.transaction
    })

    if (!userEntryUnsafe) {
      throw new SourceUserNotFoundException()
    }

    return userEntryUnsafe.secondPasswordHash
  })

  getSecondPasswordHashOfChild = memoize(async (childId: string) => {
    const userEntryUnsafe = await this.transaction.legacy.database.user.findOne({
      where: {
        familyId: this.familyId,
        userId: childId,
        type: 'child'
      },
      attributes: ['secondPasswordHash'],
      transaction: this.transaction.legacy.transaction
    })

    if (!userEntryUnsafe) {
      throw new SourceUserNotFoundException()
    }

    if (!userEntryUnsafe.secondPasswordHash) {
      throw new InvalidChildActionIntegrityValue()
    }

    return userEntryUnsafe.secondPasswordHash
  })

  doesCategoryExist = memoize(async (categoryId: string) => {
    const categoryEntry = await this.transaction.legacy.database.category.findOne({
      where: {
        familyId: this.familyId,
        categoryId
      },
      transaction: this.transaction.legacy.transaction
    })

    return !!categoryEntry
  })

  doesUserExist = memoize(async (userId: string) => {
    const userEntry = await this.transaction.legacy.database.user.findOne({
      where: {
        familyId: this.familyId,
        userId
      },
      transaction: this.transaction.legacy.transaction
    })

    return !!userEntry
  })

  isSenderDoFullSyncTrue = () => this.requireSenderDoFullSync
  requireSenderFullSync: () => void = () => this.requireSenderDoFullSync = true

  async saveModifiedVersionNumbers () {
    const { familyId } = this

    if (this.categoriesWithModifiedApps.size > 0) {
      await this.transaction.legacy.database.category.update({
        assignedAppsVersion: generateVersionId()
      }, {
        where: {
          familyId,
          categoryId: {
            [Sequelize.Op.in]: setToList(this.categoriesWithModifiedApps)
          }
        },
        transaction: this.transaction.legacy.transaction
      })

      this.categoriesWithModifiedApps.clear()
    }

    if (this.categoriesWithModifiedBaseData.size > 0) {
      await this.transaction.legacy.database.category.update({
        baseVersion: generateVersionId()
      }, {
        where: {
          familyId,
          categoryId: {
            [Sequelize.Op.in]: setToList(this.categoriesWithModifiedBaseData)
          }
        },
        transaction: this.transaction.legacy.transaction
      })

      this.categoriesWithModifiedBaseData.clear()
    }

    if (this.categoriesWithModifiedTimeLimitRules.size > 0) {
      await this.transaction.legacy.database.category.update({
        timeLimitRulesVersion: generateVersionId()
      }, {
        where: {
          familyId,
          categoryId: {
            [Sequelize.Op.in]: setToList(this.categoriesWithModifiedTimeLimitRules)
          }
        },
        transaction: this.transaction.legacy.transaction
      })

      this.categoriesWithModifiedTimeLimitRules.clear()
    }

    if (this.categoriesWithModifiedUsedTimes.size > 0) {
      await this.transaction.legacy.database.category.update({
        usedTimesVersion: generateVersionId()
      }, {
        where: {
          familyId,
          categoryId: {
            [Sequelize.Op.in]: setToList(this.categoriesWithModifiedUsedTimes)
          }
        },
        transaction: this.transaction.legacy.transaction
      })

      this.categoriesWithModifiedUsedTimes.clear()
    }

    if (this.categoriesWithModifiedTasks.size > 0) {
      await this.transaction.legacy.database.category.update({
        taskListVersion: generateVersionId()
      }, {
        where: {
          familyId,
          categoryId: {
            [Sequelize.Op.in]: setToList(this.categoriesWithModifiedTasks)
          }
        },
        transaction: this.transaction.legacy.transaction
      })

      this.categoriesWithModifiedUsedTimes.clear()
    }

    if (this.invalidiateUserList) {
      await this.transaction.family.updateUserListVersion({
        familyId,
        userListVersion: generateVersionId()
      })

      this.invalidiateUserList = false
    }

    if (this.invalidiateDeviceList) {
      await this.transaction.family.updateDeviceListVersion({
        familyId,
        deviceListVersion: generateVersionId()
      })

      this.invalidiateDeviceList = false
    }

    if (this.invalidateU2fList) {
      await this.transaction.family.updateU2fKeysVersion({
        familyId,
        u2fKeysVersion: generateVersionId()
      })

      this.invalidateU2fList = false
    }

    this.devicesWithModifiedShowDeviceConnected.forEach((showDeviceConnected, deviceId) => {
      this.connectedDevicesManager.notifyShareConnectedChanged({
        familyId: this.familyId,
        deviceId,
        showDeviceConnected
      })
    })
  }
}
