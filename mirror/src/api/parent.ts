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
import { createHmac } from 'crypto'
import { Router } from 'express'
import HttpErrors from 'http-errors'
import { AlwaysProConfig, SignSecretConfig, DisableSignupConfig } from '../config.js'
import { SimpleDatabase, SimpleDatabaseTransaction } from '../database/simple/index.js'
import { deleteAccount } from '../function/cleanup/account-deletion.js'
import { removeDevice } from '../function/device/remove-device.js'
import { createAddDeviceToken } from '../function/parent/create-add-device-token.js'
import { createFamily } from '../function/parent/create-family.js'
import { getStatusByMailToken } from '../function/parent/get-status-by-mail-address.js'
import { linkMailAddress } from '../function/parent/link-mail-address.js'
import { recoverParentPassword } from '../function/parent/recover-parent-password.js'
import { signInIntoFamily } from '../function/parent/sign-in-into-family.js'
import { MailTransport } from '../util/mail.js'
import { validateU2fIntegrity, U2fValidationError } from '../function/u2f/index.js'
import { createIdentityToken, MissingSignSecretException } from '../util/identity-token.js'
import { WebsocketApi } from '../websocket/index.js'
import { EventHandler } from '../monitoring/eventhandler.js'
import {
  isCreateFamilyByMailTokenRequest,
  isCreateRegisterDeviceTokenRequest, isLinkParentMailAddressRequest,
  isMailAuthTokenRequestBody, isRecoverParentPasswordRequest,
  isRemoveDeviceRequest, isSignIntoFamilyRequest, isRequestIdentityTokenRequest,
  isDeleteAccountPayload
} from './validator.js'

export const createParentRouter = ({
  config, database, mailTransport, websocket, eventHandler
}: {
  config: AlwaysProConfig & SignSecretConfig & DisableSignupConfig
  database: SimpleDatabase
  mailTransport: MailTransport
  websocket: WebsocketApi
  eventHandler: EventHandler
}) => {
  const router = Router()

  router.post('/get-status-by-mail-address', BodyParser.json(), async (req, res, next) => {
    try {
      if (!isMailAuthTokenRequestBody(req.body)) {
        throw new HttpErrors.BadRequest()
      }

      const { mailAuthToken } = req.body
      const { status, mail } = await database.transaction(async (transaction) => {
        return getStatusByMailToken({ transaction, mailAuthToken })
      })

      res.json({
        status,
        mail,
        canCreateFamily: !config.disableSignup,
        alwaysPro: config.alwaysPro
      })
    } catch (ex) {
      next(ex)
    }
  })

  router.post('/create-family', BodyParser.json(), async (req, res, next) => {
    try {
      if (config.disableSignup) {
        throw new HttpErrors.Forbidden()
      }

      if (!isCreateFamilyByMailTokenRequest(req.body)) {
        throw new HttpErrors.BadRequest()
      }

      const result = await createFamily({
        config,
        database,
        eventHandler,
        firstParentDevice: req.body.parentDevice,
        mailAuthToken: req.body.mailAuthToken,
        password: req.body.parentPassword,
        deviceName: req.body.deviceName,
        parentName: req.body.parentName,
        timeZone: req.body.timeZone,
        clientLevel: req.body.clientLevel || null
      })

      res.json({
        deviceAuthToken: result.deviceAuthToken,
        ownDeviceId: result.deviceId,
        data: result.data
      })
    } catch (ex) {
      next(ex)
    }
  })

  router.post('/sign-in-into-family', BodyParser.json(), async (req, res, next) => {
    try {
      if (!isSignIntoFamilyRequest(req.body)) {
        throw new HttpErrors.BadRequest()
      }

      const result = await signInIntoFamily({
        config,
        database,
        eventHandler,
        mailTransport,
        newDeviceInfo: req.body.parentDevice,
        mailAuthToken: req.body.mailAuthToken,
        deviceName: req.body.deviceName,
        clientLevel: req.body.clientLevel || null,
        websocket
      })

      res.json({
        deviceAuthToken: result.deviceAuthToken,
        ownDeviceId: result.deviceId,
        data: result.data
      })
    } catch (ex) {
      next(ex)
    }
  })

  router.post('/recover-parent-password', BodyParser.json(), async (req, res, next) => {
    try {
      if (!isRecoverParentPasswordRequest(req.body)) {
        throw new HttpErrors.BadRequest()
      }

      await recoverParentPassword({
        database,
        mailTransport,
        websocket,
        password: req.body.password,
        mailAuthToken: req.body.mailAuthToken
      })

      res.json({ ok: true })
    } catch (ex) {
      next(ex)
    }
  })

  async function assertAuthValidAndReturnDetails ({ deviceAuthToken, parentId, secondPasswordHash, transaction }: {
    deviceAuthToken: string
    parentId: string
    secondPasswordHash: string
    transaction: SimpleDatabaseTransaction
  }): Promise<{
    familyId: string
    parentUserId: string
  }> {
    if (secondPasswordHash === 'device') {
      const deviceEntry = await transaction.device.getFamilyIdAndDeviceIdAndCurrentUserAndKeptSignedInByAuthToken(deviceAuthToken)

      if (!deviceEntry) {
        throw new HttpErrors.Unauthorized()
      }

      const { familyId } = deviceEntry

      if (!deviceEntry.isUserKeptSignedIn) {
        throw new HttpErrors.Unauthorized()
      }

      const parentFound = await transaction.user.doesParentUserExist({
        familyId,
        userId: deviceEntry.currentUserId
      })

      if (!parentFound) {
        throw new HttpErrors.Unauthorized()
      }

      return { familyId, parentUserId: deviceEntry.currentUserId }
    } else if (secondPasswordHash.startsWith('u2f:')) {
      try {
        const deviceEntry = await transaction.device.getFamilyIdAndDeviceIdByAuthToken(deviceAuthToken)

        if (!deviceEntry) {
          throw new HttpErrors.Unauthorized()
        }

        const { familyId, deviceId } = deviceEntry

        const hasFullVersion = config.alwaysPro || await transaction.family.hasFullVersionByFamilyId(familyId)

        const u2fResult = await validateU2fIntegrity({
          integrity: secondPasswordHash,
          hasFullVersion,
          familyId,
          deviceId,
          transaction,
          calculateHmac: (secret) => createHmac('sha256', secret)
            .update('direct action')
            .digest()
        })

        if (u2fResult.userId !== parentId) throw new HttpErrors.Unauthorized()

        const parentFound = await transaction.user.doesParentUserExist({
          familyId,
          userId: u2fResult.userId
        })

        if (!parentFound) {
          throw new HttpErrors.Unauthorized()
        }

        return { familyId, parentUserId: u2fResult.userId }
      } catch (ex) {
        if (ex instanceof U2fValidationError) throw new HttpErrors.Unauthorized()
        else throw ex
      }
    } else {
      const familyId = await transaction.device.getFamilyIdByAuthToken(deviceAuthToken)

      if (familyId === null) {
        throw new HttpErrors.Unauthorized()
      }

      const parentFound = await transaction.user.doesParentUserWithSpecificSecondPasswordHashExist({
        familyId,
        userId: parentId,
        secondPasswordHash: secondPasswordHash
      })

      if (!parentFound) {
        throw new HttpErrors.Unauthorized()
      }

      return { familyId, parentUserId: parentId }
    }
  }

  router.post('/create-add-device-token', BodyParser.json(), async (req, res, next) => {
    try {
      if (!isCreateRegisterDeviceTokenRequest(req.body)) {
        throw new HttpErrors.BadRequest()
      }

      const { token, deviceId } = await database.transaction(async (transaction) => {
        const { familyId } = await assertAuthValidAndReturnDetails({
          deviceAuthToken: req.body.deviceAuthToken,
          parentId: req.body.parentId,
          secondPasswordHash: req.body.parentPasswordSecondHash,
          transaction
        })

        return createAddDeviceToken({ familyId, transaction })
      })

      res.json({ token, deviceId })
    } catch (ex) {
      next(ex)
    }
  })

  router.post('/link-mail-address', BodyParser.json(), async (req, res, next) => {
    try {
      if (!isLinkParentMailAddressRequest(req.body)) {
        throw new HttpErrors.BadRequest()
      }

      await linkMailAddress({
        mailAuthToken: req.body.mailAuthToken,
        deviceAuthToken: req.body.deviceAuthToken,
        parentPasswordSecondHash: req.body.parentPasswordSecondHash,
        parentUserId: req.body.parentUserId,
        websocket,
        database
      })

      res.json({ ok: true })
    } catch (ex) {
      next(ex)
    }
  })

  router.post('/remove-device', BodyParser.json(), async (req, res, next) => {
    try {
      if (!isRemoveDeviceRequest(req.body)) {
        throw new HttpErrors.BadRequest()
      }

      await database.transaction(async (transaction) => {
        const { familyId } = await assertAuthValidAndReturnDetails({
          deviceAuthToken: req.body.deviceAuthToken,
          parentId: req.body.parentUserId,
          secondPasswordHash: req.body.parentPasswordSecondHash,
          transaction
        })

        await removeDevice({
          transaction,
          familyId,
          deviceId: req.body.deviceId,
          websocket
        })
      })

      res.json({ ok: true })
    } catch (ex) {
      next(ex)
    }
  })

  router.post('/create-identity-token', BodyParser.json(), async (req, res, next) => {
    try {
      if (!isRequestIdentityTokenRequest(req.body)) {
        throw new HttpErrors.BadRequest()
      }

      const body = req.body

      await database.transaction(async (transaction) => {
        const { familyId, parentUserId } = await assertAuthValidAndReturnDetails({
          deviceAuthToken: body.deviceAuthToken,
          parentId: body.parentUserId,
          secondPasswordHash: body.parentPasswordSecondHash,
          transaction
        })

        const token = await createIdentityToken(config, {
          purpose: body.purpose,
          familyId,
          userId: parentUserId,
          mail: await transaction.user.getMailAddressByUserId({ familyId, userId: parentUserId })
        })

        res.json({ token })
      })
    } catch (ex) {
      if (ex instanceof MissingSignSecretException) res.sendStatus(404)
      else next(ex)
    }
  })

  router.post('/delete-account', BodyParser.json(), async (req, res, next) => {
    try {
      if (!isDeleteAccountPayload(req.body)) {
        throw new HttpErrors.BadRequest()
      }

      await deleteAccount({ database, mailTransport, request: req.body, websocket })

      res.sendStatus(200)
    } catch (ex) {
      next(ex)
    }
  })

  return router
}
