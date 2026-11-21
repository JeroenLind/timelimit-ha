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

import * as Sequelize from 'sequelize'
import { AddDeviceTokenModelStatic, createAddDeviceTokenModel } from './adddevicetoken.js'
import { AuthTokenModelStatic, createAuthtokenModel } from './authtoken.js'
import { CategoryModelStatic, createCategoryModel } from './category.js'
import { CategoryAppModelStatic, createCategoryAppModel } from './categoryapp.js'
import { CategoryNetworkIdModelStatic, createCategoryNetworkIdModel } from './categorynetworkid.js'
import { CategoryTimeWarningModelStatic, createCategoryTimeWarningModel } from './categorytimewarning.js'
import { ChildTaskModelStatic, createChildTaskModel } from './childtask.js'
import { ConfigModelStatic, createConfigModel } from './config.js'
import { createDeviceModel, DeviceModelStatic } from './device.js'
import { createDeviceDhKey, DeviceDhKeyModelStatic } from './devicedhkey.js'
import { createEncryptedAppListModel, EncryptedAppListModelStatic } from './encryptedapplist.js'
import { createFamilyModel, FamilyModelStatic } from './family.js'
import { createKeyRequestModel, KeyRequestModelStatic } from './keyrequest.js'
import { createKeyResponseModel, KeyResponseModelStatic } from './keyresponse.js'
import { createMailLoginTokenModel, MailLoginTokenModelStatic } from './maillogintoken.js'
import { createUmzug } from './migration/umzug.js'
import { createOldDeviceModel, OldDeviceModelStatic } from './olddevice.js'
import { createPingModel, PingModelStatic } from './ping.js'
import { createPurchaseModel, PurchaseModelStatic } from './purchase.js'
import { createSessionDurationModel, SessionDurationModelStatic } from './sessionduration.js'
import { createTimelimitRuleModel, TimelimitRuleModelStatic } from './timelimitrule.js'
import { createU2fKeyModel, U2fKeyModelStatic } from './u2fkey.js'
import { createUsedTimeModel, UsedTimeModelStatic } from './usedtime.js'
import { createUserModel, UserModelStatic } from './user.js'
import { createUserLimitLoginCategoryModel, UserLimitLoginCategoryModelStatic } from './userlimitlogincategory.js'
import { shouldRetryWithException } from './utils/serialized.js'

export type Transaction = Sequelize.Transaction

export interface Database {
  addDeviceToken: AddDeviceTokenModelStatic
  authtoken: AuthTokenModelStatic
  category: CategoryModelStatic
  categoryApp: CategoryAppModelStatic
  categoryNetworkId: CategoryNetworkIdModelStatic
  categoryTimeWarning: CategoryTimeWarningModelStatic
  childTask: ChildTaskModelStatic
  config: ConfigModelStatic
  device: DeviceModelStatic
  deviceDhKey: DeviceDhKeyModelStatic
  encryptedAppList: EncryptedAppListModelStatic
  family: FamilyModelStatic
  keyRequest: KeyRequestModelStatic
  keyResponse: KeyResponseModelStatic
  mailLoginToken: MailLoginTokenModelStatic
  oldDevice: OldDeviceModelStatic
  ping: PingModelStatic
  purchase: PurchaseModelStatic
  sessionDuration: SessionDurationModelStatic
  timelimitRule: TimelimitRuleModelStatic
  u2fKey: U2fKeyModelStatic
  usedTime: UsedTimeModelStatic
  user: UserModelStatic
  userLimitLoginCategory: UserLimitLoginCategoryModelStatic
  transaction: <T> (
    autoCallback: (t: Transaction) => Promise<T>,
    options?: TransactionOptions
  ) => Promise<T>
  dialect: string
}

interface TransactionOptions {
  transaction?: Transaction
  disableRetry?: boolean
}

const createDatabase = (sequelize: Sequelize.Sequelize): Database => ({
  addDeviceToken: createAddDeviceTokenModel(sequelize),
  authtoken: createAuthtokenModel(sequelize),
  category: createCategoryModel(sequelize),
  categoryApp: createCategoryAppModel(sequelize),
  childTask: createChildTaskModel(sequelize),
  categoryNetworkId: createCategoryNetworkIdModel(sequelize),
  categoryTimeWarning: createCategoryTimeWarningModel(sequelize),
  config: createConfigModel(sequelize),
  device: createDeviceModel(sequelize),
  deviceDhKey: createDeviceDhKey(sequelize),
  encryptedAppList: createEncryptedAppListModel(sequelize),
  family: createFamilyModel(sequelize),
  keyRequest: createKeyRequestModel(sequelize),
  keyResponse: createKeyResponseModel(sequelize),
  mailLoginToken: createMailLoginTokenModel(sequelize),
  oldDevice: createOldDeviceModel(sequelize),
  ping: createPingModel(sequelize),
  purchase: createPurchaseModel(sequelize),
  sessionDuration: createSessionDurationModel(sequelize),
  timelimitRule: createTimelimitRuleModel(sequelize),
  u2fKey: createU2fKeyModel(sequelize),
  usedTime: createUsedTimeModel(sequelize),
  user: createUserModel(sequelize),
  userLimitLoginCategory: createUserLimitLoginCategoryModel(sequelize),
  async transaction<T>(
    autoCallback: (transaction: Transaction) => Promise<T>,
    options?: TransactionOptions
  ): Promise<T> {
    const runAttempt = () => sequelize.transaction({
      isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE,
      transaction: options?.transaction
    }, autoCallback)

    const delay = (time: number) => new Promise((resolve) => setTimeout(resolve, time))

    try {
      return await runAttempt()
    } catch (ex) {
      if (
        options?.disableRetry ||
        options?.transaction ||
        !shouldRetryWithException(this, ex)
      ) throw ex
    }

    await delay(10 * (1 + Math.random()))

    try {
      return await runAttempt()
    } catch (ex) {
      if (!shouldRetryWithException(this, ex)) throw ex
    }

    await delay(100 * (1 + Math.random()))

    return await runAttempt()
  },
  dialect: sequelize.getDialect()
})

const createSequelizeFromUrl = (url: string) => new Sequelize.Sequelize(url, {
  define: {
    timestamps: false
  },
  logging: false
})

export function openDatabaseFromUrl(url: string, { logging }: { logging: boolean }) {
  const sequelize = createSequelizeFromUrl(url)

  return {
    database: createDatabase(sequelize),
    umzug: createUmzug(sequelize, logging),
  }
}
