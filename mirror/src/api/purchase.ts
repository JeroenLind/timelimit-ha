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
import { SimpleDatabase } from '../database/simple/index.js'
import { canDoNextPurchase } from '../function/purchase/index.js'
import { isCanDoPurchaseRequest } from './validator.js'

export const createPurchaseRouter = ({ database }: { database: SimpleDatabase }) => {
  const router = Router()

  router.post('/can-do-purchase', BodyParser.json(), async (req, res, next) => {
    try {
      if (!isCanDoPurchaseRequest(req.body)) {
        throw new HttpErrors.BadRequest()
      }

      const result: boolean = await database.transaction(async (transaction) => {
        const familyId = await transaction.device.getFamilyIdByAuthToken(req.body.deviceAuthToken)

        if (familyId === null) throw new HttpErrors.Unauthorized()

        const canDoNextPurchaseData = await transaction.family.getFullVersionUntilAndDebtsByFamilyId(familyId)

        if (!canDoNextPurchaseData) throw new HttpErrors.InternalServerError()

        return canDoNextPurchase(canDoNextPurchaseData)
      })

      const canDoPurchase = result ? 'yes' : 'no due to old purchase'

      if (canDoPurchase === 'yes' && req.body.type === 'googleplay') {
        res.json({
          canDoPurchase: 'yes',
          googlePlayPublicKey: 'dW5zdXBwb3J0ZWQK' // unsupported as base64
        })
      } else {
        res.json({
          canDoPurchase
        })
      }
    } catch (ex) {
      next(ex)
    }
  })

  return router
}
