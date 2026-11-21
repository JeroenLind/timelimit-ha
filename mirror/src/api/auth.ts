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
import { MailWhitelistConfig } from '../config.js'
import { SimpleDatabase } from '../database/simple/index.js'
import { sendLoginCode, signInByMailCode } from '../function/authentication/login-by-mail.js'
import { MailTransport, isMailAddressCoveredByWhitelist, isMailServerBlacklisted, sanitizeMailAddress } from '../util/mail.js'
import {
  isSendMailLoginCodeRequest,
  isSignInByMailCodeRequest
} from './validator.js'

export const createAuthRouter = ({ config, database, mailTransport }: {
  config: MailWhitelistConfig
  database: SimpleDatabase
  mailTransport: MailTransport
}) => {
  const router = Router()

  router.post('/send-mail-login-code-v2', BodyParser.json(), async (req, res, next) => {
    try {
      if (!isSendMailLoginCodeRequest(req.body)) {
        throw new HttpErrors.BadRequest()
      }

      const mail = sanitizeMailAddress(req.body.mail)

      if (!mail) {
        throw new HttpErrors.BadRequest()
      }

      if (!isMailAddressCoveredByWhitelist(config, mail)) {
        res.json({ mailAddressNotWhitelisted: true })
      } else if (isMailServerBlacklisted(mail)) {
        res.json({ mailServerBlacklisted: true })
      } else {
        const { mailLoginToken } = await sendLoginCode({
          mail,
          deviceAuthToken: req.body.deviceAuthToken,
          locale: req.body.locale,
          database,
          mailTransport
        })

        res.json({ mailLoginToken })
      }
    } catch (ex) {
      next(ex)
    }
  })

  router.post('/sign-in-by-mail-code', BodyParser.json(), async (req, res, next) => {
    try {
      if (!isSignInByMailCodeRequest(req.body)) {
        throw new HttpErrors.BadRequest()
      }

      const { mailAuthToken } = await signInByMailCode({
        receivedCode: req.body.receivedCode,
        mailLoginToken: req.body.mailLoginToken,
        database
      })

      res.json({ mailAuthToken })
    } catch (ex) {
      next(ex)
    }
  })

  return router
}
