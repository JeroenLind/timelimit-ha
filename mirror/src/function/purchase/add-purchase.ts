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

import HttpErrors from 'http-errors'
import { SimpleDatabaseTransaction } from '../../database/simple/index.js'
import { notifyClientsAboutChangesDelayed } from '../../function/websocket/index.js'
import { WebsocketApi } from '../../websocket/index.js'

const day = 1000 * 60 * 60 * 24
const week = day * 7
const month = day * 31
const year = day * 366

export const addPurchase = async ({ familyId, type, transactionId, websocket, transaction }: {
  transaction: SimpleDatabaseTransaction
  familyId: string
  type: 'month' | 'year' | 'unpaid14'
  transactionId: string
  websocket: WebsocketApi
}) => {
  const service = 'directpurchase'

  const oldPurchaseEntry = await transaction.legacy.database.purchase.findOne({
    where: {
      service,
      transactionId
    },
    transaction: transaction.legacy.transaction
  })

  if (oldPurchaseEntry) {
    return
  }

  const familyEntry = await transaction.legacy.database.family.findOne({
    where: {
      familyId
    },
    transaction: transaction.legacy.transaction
  })

  if (!familyEntry) {
    throw new HttpErrors.Conflict()
  }

  const previousFullVersionEndTime = familyEntry.fullVersionUntil
  const previousFullVersionDebts = parseInt(familyEntry.fullVersionDebts, 10)

  if (type === 'month' || type === 'year') {
    const typeDuration = type === 'year' ? year : month

    if (typeDuration > previousFullVersionDebts) {
      const newFullVersionUntil = Math.max(parseInt(familyEntry.fullVersionUntil, 10), Date.now()) + typeDuration - previousFullVersionDebts

      familyEntry.fullVersionUntil = newFullVersionUntil.toString(10)
      familyEntry.fullVersionDebts = '0'
      familyEntry.hasFullVersion = true
    } else {
      familyEntry.fullVersionDebts = (previousFullVersionDebts - typeDuration).toString(10)
    }
  } else if (type === 'unpaid14') {
    const debtsAdd = 2 * week
    const debtsMax = 3 * week

    const newDebts = Math.min(debtsMax, previousFullVersionDebts + debtsAdd)

    if (newDebts <= previousFullVersionDebts) {
      // do not save anything

      return
    }

    const durationToAdd = newDebts - previousFullVersionDebts

    const newFullVersionUntil = Math.max(parseInt(familyEntry.fullVersionUntil, 10), Date.now()) + durationToAdd

    familyEntry.fullVersionUntil = newFullVersionUntil.toString(10)
    familyEntry.fullVersionDebts = newDebts.toString(10)
    familyEntry.hasFullVersion = true
  } else {
    throw new Error()
  }

  await familyEntry.save({ transaction: transaction.legacy.transaction })

  await transaction.legacy.database.purchase.create({
    familyId,
    service,
    transactionId,
    type,
    loggedAt: Date.now().toString(10),
    previousFullVersionEndTime,
    newFullVersionEndTime: familyEntry.fullVersionUntil
  }, {
    transaction: transaction.legacy.transaction
  })

  await notifyClientsAboutChangesDelayed({
    familyId,
    sourceDeviceId: null,
    transaction,
    websocket,
    generalLevel: 2,
    targetedLevels: new Map()
  })
}
