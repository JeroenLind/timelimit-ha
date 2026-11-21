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

import {
  AppActivityItem, IncompleteAppActivityItemException, RemovedAppActivityItem, SerializedAppActivityItem, SerializedRemovedAppActivityItem
} from '../model/appactivity.js'
import { AppLogicAction } from './basetypes.js'
import { InvalidActionParameterException } from './meta/exception.js'
import { assertListWithoutDuplicates } from './meta/util.js'

const actionType = 'UpdateAppActivitiesAction'

export class UpdateAppActivitiesAction extends AppLogicAction {
  readonly removed: Array<RemovedAppActivityItem>
  readonly updatedOrAdded: Array<AppActivityItem>

  constructor ({ removed, updatedOrAdded }: {
    removed: Array<RemovedAppActivityItem>
    updatedOrAdded: Array<AppActivityItem>
  }) {
    super()

    assertListWithoutDuplicates({
      actionType,
      field: 'removed',
      list: removed.map((item) => item.packageName + ':' + item.activityName)
    })

    assertListWithoutDuplicates({
      actionType,
      field: 'updatedOrAdded',
      list: updatedOrAdded.map((item) => item.packageName + ':' + item.activityName)
    })

    if (removed.length === 0 && updatedOrAdded.length === 0) {
      throw new InvalidActionParameterException({
        actionType,
        staticMessage: 'UpdateAppActivitiesAction is empty'
      })
    }

    this.removed = removed
    this.updatedOrAdded = updatedOrAdded
  }

  static parse = ({ removed, updatedOrAdded }: SerializedUpdateAppActivitiesAction) => {
    try {
      return new UpdateAppActivitiesAction({
        removed: removed.map((item) => RemovedAppActivityItem.parse(item)),
        updatedOrAdded: updatedOrAdded.map((item) => AppActivityItem.parse(item))
      })
    } catch (ex) {
      if (ex instanceof IncompleteAppActivityItemException) {
        throw new InvalidActionParameterException({
          actionType,
          staticMessage: 'invalid app activity item'
        })
      } else throw ex
    }
  }
}

export interface SerializedUpdateAppActivitiesAction {
  type: 'UPDATE_APP_ACTIVITIES'
  removed: Array<SerializedRemovedAppActivityItem>
  updatedOrAdded: Array<SerializedAppActivityItem>
}
