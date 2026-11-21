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

import basicAuth from 'basic-auth'
import express from 'express'
import { VisibleConnectedDevicesManager } from '../connected-devices/index.js'
import { AlwaysProConfig, SignSecretConfig, MailWhitelistConfig, DisableSignupConfig } from '../config.js'
import { SimpleDatabase } from '../database/simple/index.js'
import { EventHandler } from '../monitoring/eventhandler.js'
import { MailTransport } from '../util/mail.js'
import { WebsocketApi } from '../websocket/index.js'
import { createAdminRouter } from './admin.js'
import { createAuthRouter } from './auth.js'
import { createChildRouter } from './child.js'
import { createParentRouter } from './parent.js'
import { createPurchaseRouter } from './purchase.js'
import { createSyncRouter } from './sync.js'

const adminToken = process.env.ADMIN_TOKEN || ''

export const createApi = ({ config, database, mailTransport, websocket, connectedDevicesManager, eventHandler}: {
  config: AlwaysProConfig & SignSecretConfig & MailWhitelistConfig & DisableSignupConfig
  database: SimpleDatabase
  mailTransport: MailTransport
  websocket: WebsocketApi
  connectedDevicesManager: VisibleConnectedDevicesManager
  eventHandler: EventHandler
}) => {
  const app = express()

  app.disable('x-powered-by')

  app.get('/time', (_, res) => {
    res.json({
      ms: Date.now()
    })
  })

  app.use('/auth', createAuthRouter({ config, database, mailTransport }))
  app.use('/child', createChildRouter({ config, database, websocket, eventHandler }))
  app.use('/parent', createParentRouter({ config, database, mailTransport, websocket, eventHandler }))
  app.use('/purchase', createPurchaseRouter({ database }))
  app.use('/sync', createSyncRouter({ config, database, mailTransport, websocket, connectedDevicesManager, eventHandler }))

  app.use(
    '/admin',
    (req, res, next) => {
      // required for webbrowser CORS support
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Headers', 'Authorization, Content-Type, Accept')
      res.header('Access-Control-Allow-Methods', 'GET, POST')

      // without it, browsers ignore the cors headers
      if (req.method === 'OPTIONS') {
        res.sendStatus(204)

        return
      }

      const user = basicAuth(req)

      if (adminToken !== '' && user && user.pass === adminToken) {
        next()
      } else {
        res.setHeader('WWW-Authenticate', 'Basic realm="login"')
        res.sendStatus(401)
      }
    },
    createAdminRouter({ config, database, websocket, eventHandler })
  )

  return app
}
