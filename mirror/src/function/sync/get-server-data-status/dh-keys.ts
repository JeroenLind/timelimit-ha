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
import { config, calculateExpireTime } from '../../../database/devicedhkey.js'
import { ServerDhKey } from '../../../object/serverdatastatus.js'
import { generateVersionId } from '../../../util/token.js'
import { EventHandler } from '../../../monitoring/eventhandler.js'
import { generateDhKeypair } from '../../../function/dh/index.js'
import { FamilyEntry } from './family-entry.js'

export async function getDeviceDhKeys ({
  transaction, familyEntry, deviceId, lastVersionId, eventHandler
}: {
  transaction: SimpleDatabaseTransaction
  familyEntry: FamilyEntry
  deviceId: string
  lastVersionId: string | null
  eventHandler: EventHandler
}): Promise<ServerDhKey | null> {
  const savedData = await transaction.legacy.database.deviceDhKey.findAll({
    where: {
      familyId: familyEntry.familyId,
      deviceId
    },
    transaction: transaction.legacy.transaction
  })

  const now = BigInt(Date.now())
  const oldCurrentKey = savedData.find((item) => item.expireAt === null)
  const needsNewKey =
    oldCurrentKey === undefined ||
    BigInt(oldCurrentKey.createdAt) + BigInt(config.generateNewKeyAfterAge) <= now ||
    BigInt(oldCurrentKey.createdAt) > now

  if (needsNewKey) {
    eventHandler.countEvent('getDeviceDhKeys:needsNewKey')

    const newVersion = generateVersionId()
    const newKeypair = await generateDhKeypair()

    if (savedData.length >= 8) {
      eventHandler.countEvent('getDeviceDhKeys:gc')

      const elementToRemove = savedData.reduce((a, currentItem, currentIndex) => {
        const b = { item: currentItem, index: currentIndex }

        const createdA = BigInt(a.item.createdAt)
        const createdB = BigInt(b.item.createdAt)

        if (createdA > createdB) return b
        else if (createdA < createdB) return a
        else {
          if (a.item.createdAtSubsequence > b.item.createdAtSubsequence) return b
          else return a
        }
      }, { index: 0, item: savedData[0] })

      await transaction.legacy.database.deviceDhKey.destroy({
        where: {
          familyId: familyEntry.familyId,
          deviceId,
          version: elementToRemove.item.version
        },
        transaction: transaction.legacy.transaction
      })

      savedData.splice(elementToRemove.index, 1)
    }

    await transaction.legacy.database.deviceDhKey.update({
      expireAt: calculateExpireTime(now).toString(10)
    }, {
      where: {
        familyId: familyEntry.familyId,
        deviceId,
        expireAt: null
      },
      transaction: transaction.legacy.transaction
    })

    const newItemCreatedAt = (now - now % BigInt(config.generationTimeRounding))

    const newItemExistingSubsequenceValues =
      savedData
        .filter((item) => BigInt(item.createdAt) === newItemCreatedAt)
        .map((item) => item.createdAtSubsequence)

    const newItemCreatedAtSubsequence =
      newItemExistingSubsequenceValues.reduce((max, item) => Math.max(max, item + 1), 0)

    await transaction.legacy.database.deviceDhKey.create({
      familyId: familyEntry.familyId,
      deviceId,
      version: newVersion,
      createdAt: newItemCreatedAt.toString(10),
      createdAtSubsequence: Math.min(newItemCreatedAtSubsequence, 1 << 30),
      expireAt: null,
      publicKey: newKeypair.publicKey,
      privateKey: newKeypair.privateKey
    }, { transaction: transaction.legacy.transaction })

    return {
      k: newKeypair.publicKey.toString('base64'),
      v: newVersion
    }
  } else {
    if (lastVersionId === oldCurrentKey.version) return null
    else return {
      k: oldCurrentKey.publicKey.toString('base64'),
      v: oldCurrentKey.version
    }
  }
}
