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
import { AlwaysProConfig } from '../config.js'
import { SimpleDatabase } from '../database/simple/index.js'
import { addChildDevice } from '../function/child/add-device.js'
import { logoutAtPrimaryDevice } from '../function/child/logout-at-primary-device.js'
import { setPrimaryDevice } from '../function/child/set-primary-device.js'
import { WebsocketApi } from '../websocket/index.js'
import { isRegisterChildDeviceRequest, isRequestWithAuthToken, isUpdatePrimaryDeviceRequest } from './validator.js'
import { EventHandler } from '../monitoring/eventhandler.js'

export const createChildRouter = ({ config, database, websocket, eventHandler }: {
  config: AlwaysProConfig
  database: SimpleDatabase
  websocket: WebsocketApi
  eventHandler: EventHandler
}) => {
  const router = Router()

  router.post('/add-device', BodyParser.json(), async (req, res, next) => {
    try {
      if (!isRegisterChildDeviceRequest(req.body)) {
        throw new HttpErrors.BadRequest()
      }

      const { deviceAuthToken, deviceId, data } = await addChildDevice({
        request: req.body,
        config,
        database,
        eventHandler,
        websocket
      })

      res.json({
        deviceAuthToken,
        ownDeviceId: deviceId,
        data
      })
    } catch (ex) {
      next(ex)
    }
  })

  router.post('/update-primary-device', BodyParser.json(), async (req, res, next) => {
    try {
      if (!isUpdatePrimaryDeviceRequest(req.body)) {
        throw new HttpErrors.BadRequest()
      }

      const response = await setPrimaryDevice({
        config,
        database,
        deviceAuthToken: req.body.authToken,
        currentUserId: req.body.currentUserId,
        websocket,
        action: req.body.action
      })

      res.json({
        status: response
      })
    } catch (ex) {
      next(ex)
    }
  })

  router.post('/logout-at-primary-device', BodyParser.json(), async (req, res, next) => {
    try {
      if (!isRequestWithAuthToken(req.body)) {
        throw new HttpErrors.BadRequest()
      }

      await logoutAtPrimaryDevice({
        deviceAuthToken: req.body.deviceAuthToken,
        database,
        websocket
      })

      res.json({
        ok: true
      })
    } catch (ex) {
      next(ex)
    }
  })

  return router
}
