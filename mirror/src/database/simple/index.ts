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

import difference from 'lodash/difference.js'
import * as Sequelize from 'sequelize'

import { Database as LegacyDatabase, Transaction as LegacyTransaction } from '../main.js'
import { maxMailNotificationFlags } from '../user.js'
import { generateAuthToken, generateVersionId, generateFamilyId } from '../../util/token.js'

export interface SimpleDatabase {
  legacy: LegacyDatabase
  transaction: <T> (
    inner: (t: SimpleDatabaseTransaction) => Promise<T>
  ) => Promise<T>
}

export interface SimpleDatabaseTransaction {
  transaction: <T> (
    inner: (t: SimpleDatabaseTransaction) => Promise<T>
  ) => Promise<T>

  enqueueAfterCommit(callback: () => void): void

  family: {
    create: (params: { time: number, fullVersionUntil: number }) => Promise<{ familyId: string }>
    getFullVersionUntilAndDebtsByFamilyId: (familyId: string) => Promise<{ fullVersionUntil: number, fullVersionDebts: number } | null>
    getFamilyIdsWithFullVersionUntilLowerThan: (time: number) => Promise<Array<string>>,
    hasFullVersionByFamilyId: (familyId: string) => Promise<boolean> // returns false if the family was not found
    updateDeviceListVersion: (params: { familyId: string, deviceListVersion: string }) => Promise<void>
    updateUserListVersion: (params: { familyId: string, userListVersion: string }) => Promise<void>
    updateU2fKeysVersion: (params: { familyId: string, u2fKeysVersion: string }) => Promise<void>
    destroyByFamilyIds: (familyIds: Array<string>) => Promise<void>
  }

  device: {
    create: (params: {
      familyId: string
      time: number
      userId: string
      deviceAuthToken: string
      deviceId: string
      deviceName: string
      deviceModel: string
      isUserKeptSignedIn: boolean
    }) => Promise<void>
    getFamilyIdByAuthToken: (deviceAuthToken: string) => Promise<string | null>
    getFamilyIdAndDeviceNameByAuthToken: (deviceAuthToken: string) => Promise<{familyId: string, deviceName: string} | null>
    getFamilyIdAndDeviceIdByAuthToken: (deviceAuthToken: string) => Promise<{familyId: string, deviceId: string} | null>
    getFamilyIdAndCurrentUserByAuthToken: (deviceAuthToken: string) => Promise<{familyId: string, currentUserId: string } | null>
    getFamilyIdAndDeviceIdAndCurrentUserAndKeptSignedInByAuthToken: (deviceAuthToken: string) => Promise<{familyId: string, deviceId: string, currentUserId: string, isUserKeptSignedIn: boolean} | null>
    getFamilyIdAndDeviceIdAndLastConnectivityByAuthToken: (deviceAuthToken: string) => Promise<{familyId: string, deviceId: string, lastConnectivity: number} | null>
    getDeviceAuthTokenByDeviceId: (params: { familyId: string, deviceId: string }) => Promise<string | null>
    getDeviceIdsByCurrentUserId: (params: { familyId: string, currentUserId: string }) => Promise<Array<string>>
    getDeviceIdsAndAuthTokensByFamilyId: (familyId: string) => Promise<Array<{ deviceId: string, deviceAuthToken: string }>>
    getDeviceIdsAndShowDeviceConnectedByFamilyId: (familyId: string) => Promise<Array<{ deviceId: string, showDeviceConnected: boolean }>>
    getRecentlyConnectedDeviceFamilyIdsByFamilyIds: (params: { familyIds: Array<string>, lastConnectivityNewerThan: number }) => Promise<Array<string>>
    updateLastConnectivityByDeviceAuthToken: (params: { deviceAuthToken: string, lastConnectivity: number }) => Promise<void>
    updateDeviceAuthToken: (params: { oldDeviceAuthToken: string, newDeviceAuthToken: string }) => Promise<void>
    updateDeviceReportedUninstall: (params: { deviceAuthToken: string, didDeviceReportUninstall: boolean }) => Promise<void>
    destroyByFamilyIdAndDeviceId: (params: { familyId: string, deviceId: string }) => Promise<void>
    destroyByFamilyIdsReturningAuthTokens: (familyIds: Array<string>) => Promise<Array<string>>
  }

  oldDevice: {
    insertMissingTokens: (tokenList: Array<string>) => Promise<void>
    hasAuthToken: (deviceAuthToken: string) => Promise<boolean>
  }

  user: {
    create: (params: {
      familyId: string
      userId: string
      name: string
      passwordHash: string
      secondPasswordHash: string
      secondPasswordSalt: string
      type: 'parent' | 'child'
      mail: string
      timeZone: string
    }) => Promise<void>
    doesFamilyHaveUserWithMail: (params: { familyId: string, mail: string }) => Promise<boolean>
    doesSpecificParentUserExist: (params: { familyId: string, userId: string, mail: string }) => Promise<boolean>
    getSmallestMailAddressByFamilyId: (familyId: string) => Promise<string | null>
    getAllMailAddressesByFamilyId: (familyId: string) => Promise<Array<string>>
    getMailAddressByUserId: (params: { familyId: string, userId: string }) => Promise<string> // returns the empty string if the user was not found
    getFamilyIdAndUserIdByMailAddress: (mail: string) => Promise<{ familyId: string, userId: string } | null>
    getCurrentDeviceIdByUserId: (params: { familyId: string, userId: string }) => Promise<{ currentDeviceId: string } | null>
    getParentUserMailAndSecondPasswordHash: (params: { familyId: string, userId: string }) => Promise<{ mail: string, secondPasswordHash: string, secondPasswordSalt: string } | null>
    doesParentUserExist: (params: { familyId: string, userId: string }) => Promise<boolean>
    doesParentUserWithSpecificSecondPasswordHashExist: (params: { familyId: string, userId: string, secondPasswordHash: string }) => Promise<boolean>
    updateCurrentDevice: (params: { familyId: string, userId: string, currentDeviceId: string }) => Promise<void>
    updateCurrentDeviceForAllUsers: (params: { familyId: string, oldCurrentDeviceId: string }) => Promise<void>
    updateParentUserMailAddress: (params: { familyId: string, userId: string, newMailAddress: string }) => Promise<void>
    updatePassword: (who: { familyId: string, userId: string }, what: { passwordHash: string, secondPasswordHash: string, secondPasswordSalt: string }) => Promise<void>
    destroyByFamilyIds: (familyIds: Array<string>) => Promise<void>
  }

  category: {
    destroyByFamilyIds: (familyIds: Array<string>) => Promise<void>
  }

  categoryApp: {
    destroyByFamilyIds: (familyIds: Array<string>) => Promise<void>
  }

  timelimitRule: {
    destroyByFamilyIds: (familyIds: Array<string>) => Promise<void>
  }

  usedTime: {
    destroyByFamilyIds: (familyIds: Array<string>) => Promise<void>
  }

  sessionDuration: {
    destroyByFamilyIds: (familyIds: Array<string>) => Promise<void>
  }

  mailLoginToken: {
    create: (params: { time: number, mail: string, code: string, locale: string }) => Promise<{ token: string }>
    query: (token: string) => Promise<{ mail: string, code: string, locale: string, remainingAttempts: number } | null>
    updateRemainingAttempts: (token: string, attempts: number) => Promise<{ found: boolean }>
    destroy: (token: string) => Promise<{ found: boolean }>
  }

  authToken: {
    create: (params: { time: number, mail: string, locale: string }) => Promise<string>
    checkAndKeep: (token: string) => Promise<{ mail: string, locale: string } | null>
    checkAndDestroy: (token: string) => Promise<{ mail: string, locale: string } | null>
  }

  deviceDhKey: {
    query: (params: { familyId: string, deviceId: string, keyId: string }) => Promise<{ expireAt: number | null, privateKey: Buffer, publicKey: Buffer } | null>
    updateExpireAt: (params: { familyId: string, deviceId: string, keyId: string, expireAt: bigint }) => Promise<void>
  }

  addDeviceToken: {
    create: (params: { familyId: string, time: number, deviceId: string, token: string }) => Promise<void>
    getAndDestroy: (token: string) => Promise<{familyId: string, deviceId: string} | null>
    destroyByFamilyId: (familyId: string) => Promise<void>
    destroyOlderThan: (time: number) => Promise<void>
  }

  purchase: {
    getFamilyIdByPurchaseId: (purchaseId: string) => Promise<string | null>
    getLastPurchaseByFamilyId: (familyId: string) => Promise<{ purchaseId: string, loggedAt: number } | null>
    destroyByFamilyIds: (familyIds: Array<string>) => Promise<void>
  }

  legacy: {
    database: LegacyDatabase
    transaction: LegacyTransaction
  }
}

export function fromLegacy(database: LegacyDatabase): SimpleDatabase {
  return {
    legacy: database,
    transaction: (inner) => database.transaction((legacyTransaction) => inner(fromLegacyTransaction(database, legacyTransaction)))
  }
}

function fromLegacyTransaction(database: LegacyDatabase, legacyTransaction: LegacyTransaction): SimpleDatabaseTransaction {
  return {
    transaction: (inner) => database.transaction(
      (innerTransaction) => inner(fromLegacyTransaction(database, innerTransaction)),
      { transaction: legacyTransaction }
    ),
    family: {
      create: async ({ time, fullVersionUntil }) => {
        const familyId = generateFamilyId()

        await database.family.create({
          familyId,
          name: '',
          createdAt: time.toString(10),
          userListVersion: generateVersionId(),deviceListVersion: generateVersionId(),
          fullVersionUntil: fullVersionUntil.toString(10),
          hasFullVersion: true,
          nextServerKeyRequestSeq: '1',
          u2fKeysVersion: generateVersionId(),
          fullVersionDebts: '0'
        }, { transaction: legacyTransaction })

        return { familyId }
      },
      getFullVersionUntilAndDebtsByFamilyId: async (familyId: string) => {
        const item = await database.family.findOne({
          where: {
            familyId
          },
          transaction: legacyTransaction
        })

        if (item) {
          return {
            fullVersionUntil: parseInt(item.fullVersionUntil),
            fullVersionDebts: parseInt(item.fullVersionDebts),
          }
        } else return null
      },
      getFamilyIdsWithFullVersionUntilLowerThan: async (time: number) => {
        const items = await database.family.findAll({
          where: {
            fullVersionUntil: {
              [Sequelize.Op.lt]: time.toString(10)
            }
          },
          attributes: ['familyId'],
          transaction: legacyTransaction
        })

        return items.map((item) => item.familyId)
      },
      hasFullVersionByFamilyId: async (familyId: string) => {
        const item = await database.family.findOne({
          where: {
            familyId
          },
          transaction: legacyTransaction,
          attributes: ['hasFullVersion']
        })

        return !!(item && item.hasFullVersion)
      },
      updateDeviceListVersion: async ({ familyId, deviceListVersion}) => {
        await database.family.update({
          deviceListVersion
        }, {
          where: {
            familyId
          },
          transaction: legacyTransaction
        })
      },
      updateUserListVersion: async ({ familyId, userListVersion }) => {
        await database.family.update({
          userListVersion
        }, {
          where: {
            familyId
          },
          transaction: legacyTransaction
        })
      },
      updateU2fKeysVersion: async ({ familyId, u2fKeysVersion }) => {
        await database.family.update({
          u2fKeysVersion
        }, {
          where: {
            familyId
          },
          transaction: legacyTransaction
        })
      },
      destroyByFamilyIds: async (familyIds: Array<string>) => {
        await database.family.destroy({
          where: {
            familyId: {
              [Sequelize.Op.in]: familyIds
            }
          },
          transaction: legacyTransaction
        })
      },
    },
    device: {
      create: async ({ time, familyId, userId, deviceAuthToken, deviceId, deviceName, deviceModel, isUserKeptSignedIn }) => {
        await database.device.create({
          familyId,
          deviceId,
          currentUserId: userId,
          installedAppsVersion: generateVersionId(),
          name: deviceName,
          model: deviceModel,
          addedAt: time.toString(10),
          deviceAuthToken,
          networkTime: 'disabled',
          nextSequenceNumber: 0,
          currentProtectionLevel: 'none',
          highestProtectionLevel: 'none',
          currentUsageStatsPermission: 'not granted',
          highestUsageStatsPermission: 'not granted',
          currentNotificationAccessPermission: 'not granted',
          highestNotificationAccessPermission: 'not granted',
          currentAppVersion: 0,
          highestAppVersion: 0,
          triedDisablingDeviceAdmin: false,
          didReboot: false,
          hadManipulation: false,
          hadManipulationFlags: 0,
          lastConnectivity: '0',
          notSeenForLongTime: false,
          didDeviceReportUninstall: false,
          isUserKeptSignedIn,
          showDeviceConnected: false,
          defaultUserId: '',
          defaultUserTimeout: 0,
          considerRebootManipulation: false,
          currentOverlayPermission: 'not granted',
          highestOverlayPermission: 'not granted',
          asEnabled: false,
          wasAsEnabled: false,
          activityLevelBlocking: false,
          isQorLater: false,
          manipulationFlags: 0,
          publicKey: null,
          nextKeyReplySequenceNumber: '1',
          platformType: null,
          platformLevel: 0
        }, { transaction: legacyTransaction })
      },
      getFamilyIdByAuthToken: async (deviceAuthToken) => {
        const deviceEntry = await database.device.findOne({
          where: { deviceAuthToken },
          attributes: ['familyId'],
          transaction: legacyTransaction
        })

        if (deviceEntry) return deviceEntry.familyId
        else return null
      },
      getFamilyIdAndDeviceNameByAuthToken: async (deviceAuthToken) => {
        const deviceEntry = await database.device.findOne({
          where: { deviceAuthToken },
          attributes: ['familyId', 'name'],
          transaction: legacyTransaction
        })

        if (deviceEntry) {
          return {
            familyId: deviceEntry.familyId,
            deviceName: deviceEntry.name,
          }
        } else return null
      },
      getFamilyIdAndDeviceIdByAuthToken: async (deviceAuthToken) => {
        const deviceEntry = await database.device.findOne({
          where: { deviceAuthToken },
          attributes: ['familyId', 'deviceId'],
          transaction: legacyTransaction
        })

        if (deviceEntry) {
          return {
            familyId: deviceEntry.familyId,
            deviceId: deviceEntry.deviceId,
          }
        } else return null
      },
      getFamilyIdAndCurrentUserByAuthToken: async (deviceAuthToken: string) => {
        const item = await database.device.findOne({
          where: { deviceAuthToken },
          attributes: ['familyId', 'currentUserId'],
          transaction: legacyTransaction
        })

        if (item) {
          return {
            familyId: item.familyId,
            currentUserId: item.currentUserId
          }
        } else return null
      },
      getFamilyIdAndDeviceIdAndCurrentUserAndKeptSignedInByAuthToken: async (deviceAuthToken: string) => {
        const deviceEntry = await database.device.findOne({
          where: { deviceAuthToken },
          attributes: ['familyId', 'deviceId', 'currentUserId', 'isUserKeptSignedIn'],
          transaction: legacyTransaction
        })

        if (deviceEntry) {
          return {
            familyId: deviceEntry.familyId,
            deviceId: deviceEntry.deviceId,
            currentUserId: deviceEntry.currentUserId,
            isUserKeptSignedIn: deviceEntry.isUserKeptSignedIn
          }
        } else return null
      },
      getFamilyIdAndDeviceIdAndLastConnectivityByAuthToken: async (deviceAuthToken: string) => {
        const deviceEntry = await database.device.findOne({
          where: { deviceAuthToken },
          attributes: ['familyId', 'deviceId', 'lastConnectivity'],
          transaction: legacyTransaction
        })

        if (deviceEntry) {
          return {
            familyId: deviceEntry.familyId,
            deviceId: deviceEntry.deviceId,
            lastConnectivity: parseInt(deviceEntry.lastConnectivity)
          }
        } else return null
      },
      getDeviceAuthTokenByDeviceId: async ({ familyId, deviceId }) => {
        const item = await database.device.findOne({
          where: {
            familyId,
            deviceId
          },
          attributes: ['deviceAuthToken'],
          transaction: legacyTransaction
        })

        if (item) {
          return item.deviceAuthToken
        } else return null
      },
      getDeviceIdsByCurrentUserId: async ({ familyId, currentUserId }) => {
        const items = await database.device.findAll({
          where: {
            familyId,
            currentUserId
          },
          transaction: legacyTransaction,
          attributes: ['deviceId']
        })

        return items.map((item) => item.deviceId)
      },
      getDeviceIdsAndAuthTokensByFamilyId: async (familyId) => {
        return (await database.device.findAll({
          where: {
            familyId
          },
          attributes: ['deviceId', 'deviceAuthToken'],
          transaction: legacyTransaction
        })).map((item) => ({
          deviceId: item.deviceId,
          deviceAuthToken: item.deviceAuthToken
        }))
      },
      getDeviceIdsAndShowDeviceConnectedByFamilyId: async (familyId: string) => {
        const items = await database.device.findAll({
          where: {
            familyId
          },
          attributes: [
            'deviceId',
            'showDeviceConnected'
          ],
          transaction: legacyTransaction
        })

        return items.map(({ deviceId, showDeviceConnected }) => ({
          deviceId, showDeviceConnected
        }))
      },
      getRecentlyConnectedDeviceFamilyIdsByFamilyIds: async ({ familyIds, lastConnectivityNewerThan }) => {
        const items = await database.device.findAll({
          where: {
            familyId: {
              [Sequelize.Op.in]: familyIds
            },
            lastConnectivity: {
              [Sequelize.Op.gt]: lastConnectivityNewerThan.toString(10)
            }
          },
          attributes: ['familyId'],
          transaction: legacyTransaction
        })

        return items.map((item) => item.familyId)

      },
      updateLastConnectivityByDeviceAuthToken: async ({ deviceAuthToken, lastConnectivity }) => {
        await database.device.update({
          lastConnectivity: lastConnectivity.toString(10)
        }, {
          where: {
            deviceAuthToken
          },
          transaction: legacyTransaction
        })
      },
      updateDeviceAuthToken: async ({ oldDeviceAuthToken, newDeviceAuthToken }) => {
        await database.device.update({
          deviceAuthToken: newDeviceAuthToken
        }, {
          where: {
            deviceAuthToken: oldDeviceAuthToken
          },
          transaction: legacyTransaction
        })
      },
      updateDeviceReportedUninstall: async ({ deviceAuthToken, didDeviceReportUninstall }) => {
        await database.device.update({
          didDeviceReportUninstall
        }, {
          where: {
            deviceAuthToken
          },
          transaction: legacyTransaction
        })
      },
      destroyByFamilyIdAndDeviceId: async ({ familyId, deviceId }) => {
        await database.device.destroy({
          where: {
            familyId,
            deviceId
          },
          transaction: legacyTransaction
        })
      },
      destroyByFamilyIdsReturningAuthTokens: async (familyIds: Array<string>) => {
        const oldDeviceAuthTokens = (await database.device.findAll({
          where: {
            familyId: {
              [Sequelize.Op.in]: familyIds
            }
          },
          attributes: ['deviceAuthToken'],
          transaction: legacyTransaction
        })).map((item) => item.deviceAuthToken)

        await database.device.destroy({
          where: {
            familyId: {
              [Sequelize.Op.in]: familyIds
            }
          },
          transaction: legacyTransaction
        })

        return oldDeviceAuthTokens
      },
    },
    oldDevice: {
      insertMissingTokens: async (tokenList: Array<string>) => {
        const knownOldItems = await database.oldDevice.findAll({
          where: {
            deviceAuthToken: {
              [Sequelize.Op.in]: tokenList
            }
          },
          transaction: legacyTransaction
        })

        const knownOldTokens = knownOldItems.map((item) => item.deviceAuthToken)

        const itemsToAdd = difference(tokenList, knownOldTokens)

        if (itemsToAdd.length > 0) {
          await database.oldDevice.bulkCreate(
            itemsToAdd.map((item) => ({
              deviceAuthToken: item
            })),
            { transaction: legacyTransaction }
          )
        }
      },
      hasAuthToken: async (deviceAuthToken) => {
        const item = await database.oldDevice.findOne({
          where: {
            deviceAuthToken
          },
          transaction: legacyTransaction
        })

        return !!item
      },
    },
    user: {
      create: async ({ familyId, userId, name, passwordHash, secondPasswordHash, secondPasswordSalt, type, mail, timeZone }) => {
        await database.user.create({
          familyId,
          userId,
          name,
          passwordHash,
          secondPasswordHash,
          secondPasswordSalt,
          type,
          mail,
          timeZone,
          disableTimelimitsUntil: '0',
          currentDevice: '',
          categoryForNotAssignedApps: '',
          relaxPrimaryDeviceRule: false,
          mailNotificationFlags: maxMailNotificationFlags,
          blockedTimes: '',
          flags: '0'
        }, { transaction: legacyTransaction })
      },
      doesFamilyHaveUserWithMail: async ({ familyId, mail }) => {
        if (mail === '') return false

        const userEntryCounter = await database.user.count({
          where: {
            familyId: familyId,
            mail
          },
          transaction: legacyTransaction
        })

        return userEntryCounter === 1
      },
      doesSpecificParentUserExist: async ({ familyId, userId, mail }) => {
        const counter = await database.user.count({
          where: {
            familyId,
            userId,
            mail,
            type: 'parent'
          },
          transaction: legacyTransaction
        })

        return counter === 1
      },
      getSmallestMailAddressByFamilyId: async (familyId: string) => {
        const userEntryWithMail = await database.user.findOne({
          where: {
            familyId,
            mail: {
              [Sequelize.Op.ne]: ''
            },
            type: 'parent'
          },
          order: [['mail', 'ASC']],
          transaction: legacyTransaction
        })

        if (userEntryWithMail) return userEntryWithMail.mail
        else return null
      },
      getAllMailAddressesByFamilyId: async (familyId: string) => {
        const items = await database.user.findAll({
          where: {
            familyId,
            mail: {
              [Sequelize.Op.ne]: ''
            },
            type: 'parent'
          },
          transaction: legacyTransaction
        })

        return items.map((item) => item.mail)
      },
      getMailAddressByUserId: async ({ familyId, userId }) => {
        const item = await database.user.findOne({
          where: {
            familyId,
            userId,
          },
          transaction: legacyTransaction
        })

        if (item) return item.mail || ''
        else return ''
      },
      getFamilyIdAndUserIdByMailAddress: async (mail: string) => {
        const item = await database.user.findOne({
          where: {
            mail
          },
          attributes: ['familyId', 'userId'],
          transaction: legacyTransaction
        })

        if (item) {
          return {
            familyId: item.familyId,
            userId: item.userId
          }
        } else return null
      },
      getCurrentDeviceIdByUserId: async ({ familyId, userId }) => {
        const item = await database.user.findOne({
          where: {
            familyId,
            userId,
          },
          transaction: legacyTransaction,
          attributes: ['currentDevice']
        })

        if (item) {
          return {
            currentDeviceId: item.currentDevice || ''
          }
        } else return null
      },
      getParentUserMailAndSecondPasswordHash: async ({ familyId, userId }) => {
        const item = await database.user.findOne({
          where: {
            type: 'parent',
            familyId,
            userId
          },
          transaction: legacyTransaction
        })

        if (item) {
          return {
            mail: item.mail,
            secondPasswordHash: item.secondPasswordHash,
            secondPasswordSalt: item.secondPasswordSalt,
          }
        } else return null
      },
      doesParentUserExist: async ({ familyId, userId }) => {
        const counter = await database.user.count({
          where: {
            familyId,
            type: 'parent',
            userId,
          },
          transaction: legacyTransaction
        })

        return counter === 1
      },
      doesParentUserWithSpecificSecondPasswordHashExist: async ({ familyId, userId, secondPasswordHash }) => {
        const counter = await database.user.count({
          where: {
            familyId,
            type: 'parent',
            userId,
            secondPasswordHash: secondPasswordHash
          },
          transaction: legacyTransaction
        })

        return counter === 1
      },
      updateCurrentDevice: async ({ familyId, userId, currentDeviceId }) => {
        await database.user.update({
          currentDevice: currentDeviceId
        }, {
          where: {
            familyId,
            userId
          },
          transaction: legacyTransaction
        })
      },
      updateCurrentDeviceForAllUsers: async ({ familyId, oldCurrentDeviceId }) => {
        await database.user.update({
          currentDevice: ''
        }, {
          where: {
            familyId,
            currentDevice: oldCurrentDeviceId
          },
          transaction: legacyTransaction
        })
      },
      updateParentUserMailAddress: async ({ familyId, userId, newMailAddress }) => {
        await database.user.update({
          mail: newMailAddress
        }, {
          where: {
            familyId,
            userId,
            type: 'parent'
          },
          transaction: legacyTransaction
        })
      },
      updatePassword: async ({ familyId, userId }, { passwordHash, secondPasswordHash, secondPasswordSalt }) => {
        await database.user.update({
          passwordHash,
          secondPasswordHash,
          secondPasswordSalt
        }, {
          where: {
            familyId,
            userId
          },
          transaction: legacyTransaction
        })
      },
      destroyByFamilyIds: async (familyIds: Array<string>) => {
        await database.user.destroy({
          where: {
            familyId: {
              [Sequelize.Op.in]: familyIds
            }
          },
          transaction: legacyTransaction
        })
      },
    },
    category: {
      destroyByFamilyIds: async (familyIds: Array<string>) => {
        await database.category.destroy({
          where: {
            familyId: {
              [Sequelize.Op.in]: familyIds
            }
          },
          transaction: legacyTransaction
        })
      },
    },
    categoryApp: {
      destroyByFamilyIds: async (familyIds: Array<string>) => {
        await database.categoryApp.destroy({
          where: {
            familyId: {
              [Sequelize.Op.in]: familyIds
            }
          },
          transaction: legacyTransaction
        })
      },
    },
    timelimitRule: {
      destroyByFamilyIds: async (familyIds: Array<string>) => {
        await database.timelimitRule.destroy({
          where: {
            familyId: {
              [Sequelize.Op.in]: familyIds
            }
          },
          transaction: legacyTransaction
        })
      },
    },
    usedTime: {
      destroyByFamilyIds: async (familyIds: Array<string>) => {
        await database.usedTime.destroy({
          where: {
            familyId: {
              [Sequelize.Op.in]: familyIds
            }
          },
          transaction: legacyTransaction
        })
      },
    },
    sessionDuration: {
      destroyByFamilyIds: async (familyIds: Array<string>) => {
        await database.sessionDuration.destroy({
          where: {
            familyId: {
              [Sequelize.Op.in]: familyIds
            }
          },
          transaction: legacyTransaction
        })
      },
    },
    mailLoginToken: {
      create: async ({ time, mail, code, locale }) => {
        const mailLoginToken = generateAuthToken()

        await database.mailLoginToken.create({
          mailLoginToken,
          receivedCode: code,
          mail,
          createdAt: time.toString(10),
          remainingAttempts: 3,
          locale
        }, { transaction: legacyTransaction })

        return { token: mailLoginToken }
      },
      query: async (token) => {
        const entry = await database.mailLoginToken.findOne({
          where: {
            mailLoginToken: token
          },
          transaction: legacyTransaction
        })

        if (entry) {
          return {
            mail: entry.mail,
            code: entry.receivedCode,
            locale: entry.locale,
            remainingAttempts: entry.remainingAttempts
          }
        } else return null
      },
      updateRemainingAttempts: async (token: string, attempts: number) => {
        const [counter] = await database.mailLoginToken.update({
          remainingAttempts: attempts
        }, {
          where: {
            mailLoginToken: token
          },
          transaction: legacyTransaction
        })

        return { found: counter === 1 }
      },
      destroy: async (token: string) => {
        const counter = await database.mailLoginToken.destroy({
          where: {
            mailLoginToken: token
          },
          transaction: legacyTransaction
        })

        return { found: counter === 1 }
      }
    },
    authToken: {
      create: async ({ time, mail, locale }) => {
        const token = generateAuthToken()

        await database.authtoken.create({
          token,
          mail,
          createdAt: time.toString(),
          locale
        }, { transaction: legacyTransaction })

        return token
      },
      checkAndKeep: async (token: string) => {
        const item = await database.authtoken.findOne({
          where: {
            token
          },
          transaction: legacyTransaction
        })

        if (item) {
          return {
            mail: item.mail,
            locale: item.locale
          }
        } else return null
      },
      checkAndDestroy: async (token: string) => {
        const item = await database.authtoken.findOne({
          where: {
            token
          },
          transaction: legacyTransaction
        })

        if (item) {
          const counter = await database.authtoken.destroy({
            where: {
              token
            },
            transaction: legacyTransaction
          })

          if (counter !== 1) {
            return null
          }

          return {
            mail: item.mail,
            locale: item.locale
          }
        } else return null
      },
    },
    deviceDhKey: {
      query: async ({ familyId, deviceId, keyId }) => {
        const item = await database.deviceDhKey.findOne({
          where: {
            familyId,
            deviceId,
            version: keyId
          },
          transaction: legacyTransaction
        })

        if (item) {
          return {
            expireAt: item.expireAt !== null ? parseInt(item.expireAt) : null,
            privateKey: item.privateKey,
            publicKey: item.publicKey,
          }
        } else return null
      },
      updateExpireAt: async ({ familyId, deviceId, keyId, expireAt }) => {
        await database.deviceDhKey.update({
          expireAt: expireAt.toString(10)
        }, {
          where: {
            familyId,
            deviceId,
            version: keyId
          },
          transaction: legacyTransaction
        })
      },
    },
    addDeviceToken: {
      create: async ({ familyId, time, deviceId, token }) => {
        await database.addDeviceToken.create({
          familyId,
          token,
          deviceId,
          createdAt: time.toString()
        }, { transaction: legacyTransaction })
      },
      getAndDestroy: async (token: string) => {
        const item = await database.addDeviceToken.findOne({
          where: {
            token
          },
          transaction: legacyTransaction
        })

        if (item) {
          return {
            familyId: item.familyId,
            deviceId: item.deviceId,
          }
        } else return null
      },
      destroyByFamilyId: async (familyId: string) => {
        await database.addDeviceToken.destroy({
          where: {
            familyId
          },
          transaction: legacyTransaction
        })
      },
      destroyOlderThan: async (time: number) => {
        await database.addDeviceToken.destroy({
          where: {
            createdAt: {
              [Sequelize.Op.lt]: time.toString()
            }
          },
          transaction: legacyTransaction
        })
      },
    },
    purchase: {
      getFamilyIdByPurchaseId: async (purchaseId: string) => {
        const item = await database.purchase.findOne({
          where: {
            service: 'directpurchase',
            transactionId: purchaseId
          },
          transaction: legacyTransaction
        })

        if (item) return item.familyId
        else return null
      },
      getLastPurchaseByFamilyId: async (familyId: string) => {
        const item = await database.purchase.findOne({
          where: {
            familyId: familyId
          },
          transaction: legacyTransaction,
          order: [['loggedAt', 'DESC']],
          limit: 1
        })

        if (item) {
          return {
            purchaseId: item.transactionId,
            loggedAt: parseInt(item.loggedAt)
          }
        } else return null
      },
      destroyByFamilyIds: async (familyIds: Array<string>) => {
        await database.purchase.destroy({
          where: {
            familyId: {
              [Sequelize.Op.in]: familyIds
            }
          },
          transaction: legacyTransaction
        })
      },
    },
    enqueueAfterCommit: (afterCommitAction) => legacyTransaction.afterCommit(afterCommitAction),
    legacy: {
      database,
      transaction: legacyTransaction
    }
  }
}
