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

import { parseChildAction } from '../../../../action/serialization/index.js'
import { ClientPushChangesRequestAction } from '../../../../api/schema.js'
import { isSerializedChildAction } from '../../../../api/validator.js'
import { EventHandler } from '../../../../monitoring/eventhandler.js'
import { Cache } from '../cache.js'
import { dispatchChildAction as dispatchChildActionInternal } from '../dispatch-child-action/index.js'
import { dispatch } from './helper.js'

export async function dispatchChildAction ({ action, eventHandler, deviceId, cache, childUserId }: {
  action: ClientPushChangesRequestAction
  deviceId: string
  cache: Cache
  eventHandler: EventHandler
  childUserId: string
}) {
  return dispatch({
    action,
    eventHandler,
    type: 'child',
    validator: isSerializedChildAction,
    parser: parseChildAction,
    applier: async (action) => {
      await dispatchChildActionInternal({ action, cache, deviceId, childUserId })
    }
  })
}
