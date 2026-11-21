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
import { ClientPushChangesRequest } from '../../../api/schema.js'
import { VisibleConnectedDevicesManager } from '../../../connected-devices/index.js'
import { AlwaysProConfig } from '../../../config.js'
import { SimpleDatabase } from '../../../database/simple/index.js'
import { shouldRetryWithException } from '../../../database/index.js'
import { EventHandler } from '../../../monitoring/eventhandler.js'
import { MailTransport } from '../../../util/mail.js'
import { WebsocketApi } from '../../../websocket/index.js'
import { notifyClientsAboutChangesDelayed } from '../../websocket/index.js'
import { getApplyActionBaseInfo } from './baseinfo.js'
import { Cache } from './cache.js'
import { dispatchAppLogicAction, dispatchChildAction, dispatchParentAction } from './dispatch-helper/index.js'
import { ApplyActionException } from './exception/index.js'
import { IllegalStateException } from './exception/illegal-state.js'
import { SequenceNumberRepeatedException } from './exception/sequence.js'
import { assertActionIntegrity } from './integrity.js'

export const applyActionsFromDevice = async ({ config, database, mailTransport, request, websocket, connectedDevicesManager, eventHandler }: {
  config: AlwaysProConfig
  database: SimpleDatabase
  mailTransport: MailTransport
  websocket: WebsocketApi
  request: ClientPushChangesRequest
  connectedDevicesManager: VisibleConnectedDevicesManager
  eventHandler: EventHandler
  // no transaction here because this is directly called from an API endpoint
}): Promise<{ shouldDoFullSync: boolean }> => {
  eventHandler.countEvent('applyActionsFromDevice')

  if (request.actions.length > 50) {
    eventHandler.countEvent('applyActionsFromDevice tooMuchActionsPerRequest')

    throw new HttpErrors.BadRequest()
  }

  return database.transaction(async (transaction) => {
    const baseInfo = await getApplyActionBaseInfo({ transaction, deviceAuthToken: request.deviceAuthToken })

    const cache = new Cache({
      transaction,
      hasFullVersion: baseInfo.hasFullVersion,
      familyId: baseInfo.familyId,
      deviceId: baseInfo.deviceId,
      config,
      connectedDevicesManager,
      mailTransport,
    })

    let { nextSequenceNumber } = baseInfo

    for (const action of request.actions) {
      try {
        if (action.sequenceNumber < nextSequenceNumber) {
          // action was already received
          throw new SequenceNumberRepeatedException()
        }

        await cache.subtransaction(async () => {
          // update the next sequence number
          nextSequenceNumber = action.sequenceNumber + 1

          if (action.type === 'appLogic') {
            await dispatchAppLogicAction({
              action,
              cache,
              deviceId: baseInfo.deviceId,
              eventHandler
            })
          } else if (action.type === 'parent') {
            const { isChildLimitAdding, authentication } = await assertActionIntegrity({
              deviceId: baseInfo.deviceId,
              cache,
              action
            })

            await dispatchParentAction({
              action,
              cache,
              deviceId: baseInfo.deviceId,
              eventHandler,
              isChildLimitAdding,
              authentication
            })
          } else if (action.type === 'child') {
            await assertActionIntegrity({
              deviceId: baseInfo.deviceId,
              cache,
              action
            })

            await dispatchChildAction({
              action,
              cache,
              childUserId: action.userId,
              deviceId: baseInfo.deviceId,
              eventHandler
            })
          } else {
            throw new IllegalStateException({ staticMessage: 'not possible action.type value' })
          }
        })
      } catch (ex) {
        if (shouldRetryWithException(transaction.legacy.database, ex)) {
          eventHandler.countEvent('applyActionsFromDevice got exception which should cause retry')

          throw ex
        } else if (ex instanceof ApplyActionException) {
          eventHandler.countEvent('applyActionsFromDevice errorDispatchingAction:' + ex.staticMessage)
        } else {
          const stack = ex instanceof Error && ex.stack ? ex.stack.substring(0, 4096) : 'no stack'

          eventHandler.countEvent('applyActionsFromDevice errorDispatchingAction:other:' + stack)
        }

        cache.requireSenderFullSync()
      }
    }

    // save new next sequence number
    if (nextSequenceNumber !== baseInfo.nextSequenceNumber) {
      eventHandler.countEvent('applyActionsFromDevice updateSequenceNumber')

      await transaction.legacy.database.device.update({
        nextSequenceNumber
      }, {
        where: {
          familyId: baseInfo.familyId,
          deviceId: baseInfo.deviceId
        },
        transaction: transaction.legacy.transaction
      })
    }

    await cache.saveModifiedVersionNumbers()

    await notifyClientsAboutChangesDelayed({
      familyId: baseInfo.familyId,
      sourceDeviceId: baseInfo.deviceId,
      websocket,
      transaction,
      generalLevel: cache.triggeredSyncLevel,
      targetedLevels: cache.targetedTriggeredSyncLevels
    })

    if (cache.triggeredSyncLevel === 2) {
      transaction.enqueueAfterCommit(() => {
        eventHandler.countEvent('applyActionsFromDevice areChangesImportant')
      })
    } else if ([...cache.targetedTriggeredSyncLevels.entries()].some((entry) => entry[1] === 2)) {
      transaction.enqueueAfterCommit(() => {
        eventHandler.countEvent('applyActionsFromDevice areChangesImportantTargeted')
      })
    }

    return {
      shouldDoFullSync: cache.isSenderDoFullSyncTrue()
    }
  })
}
