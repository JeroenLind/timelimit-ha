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
import { VisibleConnectedDevicesManager } from '../connected-devices/index.js'
import { SimpleDatabase } from '../database/simple/index.js'
import { reportDeviceRemoved } from '../function/device/report-device-removed.js'
import { applyActionsFromDevice } from '../function/sync/apply-actions/index.js'
import { generateServerDataStatus } from '../function/sync/get-server-data-status/index.js'
import { EventHandler } from '../monitoring/eventhandler.js'
import { MailTransport } from '../util/mail.js'
import { WebsocketApi } from '../websocket/index.js'
import { isClientPullChangesRequest, isClientPushChangesRequest, isRequestWithAuthToken } from './validator.js'

const getRoundedTimestampForLastConnectivity = () => {
  const now = Date.now()

  return now - (now % (1000 * 60 * 60 * 12 /* 12 hours */))
}

export const createSyncRouter = ({ config, database, mailTransport, websocket, connectedDevicesManager, eventHandler }: {
  config: AlwaysProConfig
  database: SimpleDatabase
  mailTransport: MailTransport
  websocket: WebsocketApi
  connectedDevicesManager: VisibleConnectedDevicesManager
  eventHandler: EventHandler
}) => {
  const router = Router()

  router.post('/push-actions', BodyParser.json({
    limit: '5120kb'
  }), async (req, res, next) => {
    try {
      eventHandler.countEvent('pushChangesRequest')

      if (!isClientPushChangesRequest(req.body)) {
        eventHandler.countEvent('pushChangesRequest invalid')

        throw new HttpErrors.BadRequest()
      }

      const { shouldDoFullSync } = await applyActionsFromDevice({
        request: req.body,
        config,
        database,
        websocket,
        connectedDevicesManager,
        eventHandler,
        mailTransport,
      })

      if (shouldDoFullSync) {
        eventHandler.countEvent('pushChangesRequest shouldDoFullSync')
      }

      res.json({
        shouldDoFullSync
      })
    } catch (ex) {
      next(ex)
    }
  })

  router.post('/pull-status', BodyParser.json(), async (req, res, next) => {
    try {
      eventHandler.countEvent('pullStatusRequest')

      const { body } = req

      if (!isClientPullChangesRequest(body)) {
        eventHandler.countEvent('pullStatusRequest invalid')

        throw new HttpErrors.BadRequest()
      }

      const serverStatus = await database.transaction(async (transaction) => {
        const deviceEntry = await transaction.device.getFamilyIdAndDeviceIdAndLastConnectivityByAuthToken(body.deviceAuthToken)

        if (!deviceEntry) {
          throw new HttpErrors.Unauthorized()
        }

        const { familyId, deviceId, lastConnectivity } = deviceEntry
        const now = getRoundedTimestampForLastConnectivity()

        if (lastConnectivity !== now) {
          await transaction.device.updateLastConnectivityByDeviceAuthToken({
            deviceAuthToken: body.deviceAuthToken,
            lastConnectivity: now
          })
        }

        return generateServerDataStatus({
          transaction,
          familyId,
          deviceId,
          clientStatus: body.status,
          config,
          eventHandler
        })
      })

      if (serverStatus.devices) { eventHandler.countEvent('pullStatusRequest devices') }
      if (serverStatus.apps) { eventHandler.countEvent('pullStatusRequest apps') }
      if (serverStatus.categoryBase) { eventHandler.countEvent('pullStatusRequest categoryBase') }
      if (serverStatus.categoryApp) { eventHandler.countEvent('pullStatusRequest categoryApp') }
      if (serverStatus.usedTimes) { eventHandler.countEvent('pullStatusRequest usedTimes') }
      if (serverStatus.rules) { eventHandler.countEvent('pullStatusRequest rules') }
      if (serverStatus.users) { eventHandler.countEvent('pullStatusRequest users') }
      if (serverStatus.krq) { eventHandler.countEvent('pullStatusRequest pendingKeyRequests') }
      if (serverStatus.kr) { eventHandler.countEvent('pullStatusRequest keyResponses') }
      if (serverStatus.dh) { eventHandler.countEvent('pullStatusRequest dh') }
      if (serverStatus.u2f) { eventHandler.countEvent('pullStatusRequest u2f') }

      res.json(serverStatus)
    } catch (ex) {
      next(ex)
    }
  })

  router.post('/report-removed', BodyParser.json(), async (req, res, next) => {
    try {
      if (!isRequestWithAuthToken(req.body)) {
        throw new HttpErrors.BadRequest()
      }

      await reportDeviceRemoved({
        database,
        deviceAuthToken: req.body.deviceAuthToken,
        mailTransport,
        websocket
      })

      res.json({ ok: true })
    } catch (ex) {
      next(ex)
    }
  })

  router.post('/is-device-removed', BodyParser.json(), async (req, res, next) => {
    try {
      if (!isRequestWithAuthToken(req.body)) {
        throw new HttpErrors.BadRequest()
      }

      const isDeviceRemoved: boolean = await database.transaction(async (transaction) => {
        return await transaction.oldDevice.hasAuthToken(req.body.deviceAuthToken)
      })

      res.json({
        isDeviceRemoved
      })
    } catch (ex) {
      next(ex)
    }
  })

  return router
}
