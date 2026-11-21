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

import BodyParser from 'body-parser'
import { Router } from 'express'
import HttpErrors from 'http-errors'
import { SignSecretConfig } from '../config.js'
import { SimpleDatabase } from '../database/simple/index.js'
import { addPurchase, canDoNextPurchase } from '../function/purchase/index.js'
import { getStatusMessage, setStatusMessage } from '../function/statusmessage/index.js'
import { EventHandler } from '../monitoring/eventhandler.js'
import { verifyIdentitifyToken, TokenValidationException } from '../util/identity-token.js'
import { WebsocketApi } from '../websocket/index.js'

export const createAdminRouter = ({ config, database, websocket, eventHandler }: {
  config: SignSecretConfig
  database: SimpleDatabase
  websocket: WebsocketApi
  eventHandler: EventHandler
}) => {
  const router = Router()

  router.get('/status', async (_, res, next) => {
    try {
      const { counters, maxValues } = await eventHandler.getValues()

      res.json({
        websocketClients: websocket.countConnections(),
        counters,
        maxValues
      })
    } catch (ex) {
      next(ex)
    }
  })

  router.post('/reset-counters', async (_, res, next) => {
    try {
      await eventHandler.reset()

      res.json({ ok: true })
    } catch (ex) {
      next(ex)
    }
  })

  router.get('/status-message', async (_, res, next) => {
    try {
      const currentStatusMessage = await database.transaction(async (transaction) => {
        return getStatusMessage({ transaction })
      })

      res.json({
        statusMessage: currentStatusMessage
      })
    } catch (ex) {
      next(ex)
    }
  })

  router.post('/status-message', BodyParser.json(), async (req, res, next) => {
    try {
      if (typeof req.body !== 'object' || typeof req.body.message !== 'string') {
        throw new HttpErrors.BadRequest()
      }

      const newStatusMessage = req.body.message as string

      await setStatusMessage({ database, newStatusMessage })

      websocket.triggerImportantSyncAtAllDevicesInBackground()

      res.json({ ok: true })
    } catch (ex) {
      next(ex)
    }
  })

  router.post('/unlock-premium-v2', BodyParser.json(), async (req, res, next) => {
    try {
      if (
        typeof req.body !== 'object' ||
        typeof req.body.purchaseToken !== 'string' ||
        typeof req.body.purchaseId !== 'string' ||
        typeof req.body.dryRun !== 'boolean' ||
        typeof req.body.type !== 'string'
      ) {
        throw new HttpErrors.BadRequest()
      }

      const purchaseToken: string = req.body.purchaseToken
      const purchaseId: string = req.body.purchaseId
      const dryRun: boolean = req.body.dryRun
      const type: string = req.body.type

      if (type !== 'month' && type !== 'year' && type !== 'unpaid14') {
        throw new HttpErrors.BadRequest()
      }

      const tokenContent = await verifyIdentitifyToken(config, purchaseToken, dryRun)

      if (tokenContent.purpose !== 'purchase') {
        res.json({ ok: false, error: 'token invalid', detail: 'wrong purpose' })

        return
      }

      const response = await database.transaction(async (transaction) => {
        const userValid = await transaction.user.doesSpecificParentUserExist({
          familyId: tokenContent.familyId,
          userId: tokenContent.userId,
          mail: tokenContent.mail,
        })

        if (!userValid) return {
          ok: false,
          error: 'token invalid',
          detail: 'user not found'
        }

        let mailToReturn: string

        if (tokenContent.mail !== '') mailToReturn = tokenContent.mail
        else {
          const familyMail = await transaction.user.getSmallestMailAddressByFamilyId(tokenContent.familyId)

          if (!familyMail) return {
            ok: false,
            error: 'illegal state',
            detail: 'no user with mail found'
          }

          mailToReturn = familyMail
        }

        let wasAlreadyExecuted: boolean

        const existingPurchaseFamilyId = await transaction.purchase.getFamilyIdByPurchaseId(purchaseId)

        if (existingPurchaseFamilyId === null) wasAlreadyExecuted = false
        else if (existingPurchaseFamilyId === tokenContent.familyId) wasAlreadyExecuted = true
        else return {
          ok: false,
          error: 'purchase id already used'
        }

        if (!wasAlreadyExecuted) {
          const canDoNextPurchaseData = await transaction.family.getFullVersionUntilAndDebtsByFamilyId(tokenContent.familyId)

          if (!canDoNextPurchaseData) return {
            ok: false,
            error: 'family not found'
          }

          const canDoPurchase = canDoNextPurchase(canDoNextPurchaseData)

          if (!canDoPurchase) {
            const lastPurchase = await transaction.purchase.getLastPurchaseByFamilyId(tokenContent.familyId)

            return {
              ok: false,
              error: 'can not renew now',
              lastPurchase: lastPurchase ? {
                purchaseId: lastPurchase.purchaseId,
                timestamp: lastPurchase.loggedAt,
                timestring: new Date(lastPurchase.loggedAt).toISOString()
              } : undefined
            }
          }

          if (!dryRun) {
            await addPurchase({
              transaction,
              familyId: tokenContent.familyId,
              type,
              transactionId: purchaseId,
              websocket,
            })
          }
        }

        return {
          ok: true,
          mail: mailToReturn,
          wasAlreadyExecuted
        }
      })

      res.json(response)
    } catch (ex) {
      if (ex instanceof TokenValidationException) res.json({
        ok: false,
        error: 'token invalid',
        detail: ex.message
      })
      else next(ex)
    }
  })

  return router
}
