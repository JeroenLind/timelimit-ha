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

import max from 'lodash/max.js'
import { AddInstalledAppsAction, AppLogicAction, UpdateAppActivitiesAction } from '../../../../action/index.js'
import { parseAppLogicAction } from '../../../../action/serialization/index.js'
import { ClientPushChangesRequestAction } from '../../../../api/schema.js'
import { isSerializedAppLogicAction } from '../../../../api/validator.js'
import { EventHandler } from '../../../../monitoring/eventhandler.js'
import { Cache } from '../cache.js'
import { dispatchAppLogicAction as dispatchAppLogicActionInternal } from '../dispatch-app-logic-action/index.js'
import { dispatch } from './helper.js'

function getAppRelatedMaxValues (action: AppLogicAction): {
  packageNameLength: number | null
  activityNameLength: number | null
} {
  if (action instanceof AddInstalledAppsAction) {
    const packageNameLength = max(action.apps.map((item) => item.packageName.length)) || null

    return { packageNameLength, activityNameLength: null }
  } else if (action instanceof UpdateAppActivitiesAction) {
    const packageNameLength = max(action.updatedOrAdded.map((item) => item.packageName.length)) || null
    const activityNameLength = max(action.updatedOrAdded.map((item) => item.activityName.length)) || null

    return { packageNameLength, activityNameLength }
  } else return { packageNameLength: null, activityNameLength: null }
}

function roundCounterUp (input: number, factor: number) {
  if (input % factor === 0) {
    return input
  } else {
    return input - (input % factor) + factor
  }
}

export async function dispatchAppLogicAction ({ action, eventHandler, deviceId, cache }: {
  action: ClientPushChangesRequestAction
  deviceId: string
  cache: Cache
  eventHandler: EventHandler
}) {
  return dispatch({
    action,
    eventHandler,
    type: 'app logic',
    validator: isSerializedAppLogicAction,
    parser: parseAppLogicAction,
    applier: async (action) => {
      const maxValues = getAppRelatedMaxValues(action)

      if (maxValues.packageNameLength) eventHandler.reportMax('packageNameLength', roundCounterUp(maxValues.packageNameLength, 10))
      if (maxValues.activityNameLength) eventHandler.reportMax('activityNameLength', roundCounterUp(maxValues.activityNameLength, 10))

      await dispatchAppLogicActionInternal({ action, cache, eventHandler, deviceId })
    }
  })
}
