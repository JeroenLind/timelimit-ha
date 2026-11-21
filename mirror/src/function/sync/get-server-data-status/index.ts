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

import { AlwaysProConfig } from '../../../config.js'
import { SimpleDatabaseTransaction } from '../../../database/simple/index.js'
import { getStatusMessage } from '../../../function/statusmessage/index.js'
import { ClientDataStatus } from '../../../object/clientdatastatus.js'
import { ServerDataStatus } from '../../../object/serverdatastatus.js'
import { EventHandler } from '../../../monitoring/eventhandler.js'
import { getCampaign } from './campaign.js'
import {
  getCategoryAssignedApps, getCategoryBaseDatas, getCategoryDataToSync,
  getRules, getTasks, getUsedTimes
} from './category/index.js'
import { getDeviceDetailList } from './device-detail.js'
import { getDeviceList } from './device-list.js'
import { getDeviceDhKeys } from './dh-keys.js'
import { getFamilyEntry } from './family-entry.js'
import { getPings } from './pings.js'
import { getUserList } from './user-list.js'
import { getKeyRequests } from './key-requests.js'
import { getKeyResponses } from './key-responses.js'
import { getU2f } from './u2f.js'

export const generateServerDataStatus = async ({
  transaction, clientStatus, familyId, deviceId, config, eventHandler
}: {
  transaction: SimpleDatabaseTransaction
  clientStatus: ClientDataStatus
  familyId: string
  deviceId: string
  config: AlwaysProConfig
  eventHandler: EventHandler
}): Promise<ServerDataStatus> => {
  const clientLevel = clientStatus.clientLevel || 0

  const familyEntry = await getFamilyEntry({ familyId, transaction })
  const doesClientSupportTasks = clientLevel >= 3
  const doesClientSupportCryptoApps = clientLevel >= 4
  const doesClientSupportDh = clientLevel >= 5
  const doesClientSupportU2f = clientLevel >= 6
  const doesClientSupportPing = clientLevel >= 7
  const isClient750OrNewer = clientLevel >= 8 // first release in the post gplay time

  const message: string | undefined =
    await getStatusMessage({ transaction }) ||
    getCampaign({ familyId, isClient750OrNewer }) ||
    undefined

  const result: ServerDataStatus = {
    fullVersion: config.alwaysPro ? 1 : (
      familyEntry.hasFullVersion ? parseInt(familyEntry.fullVersionUntil, 10) : 0
    ),
    message,
    apiLevel: 10
  }

  if (familyEntry.deviceListVersion !== clientStatus.devices) {
    result.devices = await getDeviceList({ transaction, familyEntry })
  }

  if (familyEntry.userListVersion !== clientStatus.users) {
    result.users = await getUserList({ transaction, familyEntry })
  }

  const categoryDataToSync = await getCategoryDataToSync({ transaction, familyEntry, categoriesStatus: clientStatus.categories })

  if (categoryDataToSync.removedCategoryIds.length > 0) {
    result.rmCategories = categoryDataToSync.removedCategoryIds
  }

  if (categoryDataToSync.categoryIdsToSyncBaseData.length > 0) {
    result.categoryBase = await getCategoryBaseDatas({
      transaction, familyEntry,
      categoryIdsToSyncBaseData: categoryDataToSync.categoryIdsToSyncBaseData
    })
  }

  if (categoryDataToSync.categoryIdsToSyncAssignedApps.length > 0) {
    result.categoryApp = await getCategoryAssignedApps({
      transaction, familyEntry,
      serverCategoriesVersions: categoryDataToSync.serverCategoriesVersions,
      categoryIdsToSyncAssignedApps: categoryDataToSync.categoryIdsToSyncAssignedApps
    })
  }

  if (categoryDataToSync.categoryIdsToSyncRules.length > 0) {
    result.rules = await getRules({
      transaction, familyEntry,
      serverCategoriesVersions: categoryDataToSync.serverCategoriesVersions,
      categoryIdsToSyncRules: categoryDataToSync.categoryIdsToSyncRules
    })
  }

  if (categoryDataToSync.categoryIdsToSyncUsedTimes.length > 0) {
    result.usedTimes = await getUsedTimes({
      transaction, familyEntry,
      serverCategoriesVersions: categoryDataToSync.serverCategoriesVersions,
      categoryIdsToSyncUsedTimes: categoryDataToSync.categoryIdsToSyncUsedTimes,
      clientLevel: clientStatus.clientLevel || null
    })
  }

  if (categoryDataToSync.categoryIdsToSyncTasks.length > 0 && doesClientSupportTasks) {
    result.tasks = await getTasks({
      transaction, familyEntry,
      serverCategoriesVersions: categoryDataToSync.serverCategoriesVersions,
      categoryIdsToSyncTasks: categoryDataToSync.categoryIdsToSyncTasks
    })
  }

  if (doesClientSupportCryptoApps) {
    result.devices2 = await getDeviceDetailList({
      transaction,
      familyEntry,
      devicesDetail: clientStatus.devicesDetail || {}
    }) || undefined

    result.krq = await getKeyRequests({
      transaction,
      familyEntry,
      deviceId,
      lastSeenRequestIndex: clientStatus.kri || null
    }) || undefined

    result.kr = await getKeyResponses({
      transaction,
      familyEntry,
      deviceId,
      lastSeenRequestIndex: clientStatus.kr || null
    }) || undefined
  }

  if (doesClientSupportDh) {
    result.dh = await getDeviceDhKeys({
      transaction,
      familyEntry,
      deviceId,
      lastVersionId: clientStatus.dh || null,
      eventHandler
    }) || undefined
  }

  if (doesClientSupportU2f) {
    result.u2f = await getU2f({
      transaction,
      familyEntry,
      lastVersionId: clientStatus.u2f || null
    }) || undefined
  }

  if (doesClientSupportPing) {
    result.pings = await getPings({
      transaction,
      familyEntry,
      deviceId
    })
  }

  return result
}
