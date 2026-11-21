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

import { ParentAction } from './basetypes.js'
import { assertIdWithinFamily, assertSafeInteger, throwOutOfRange } from './meta/util.js'

const actionType = 'ReviewChildTaskAction'

export class ReviewChildTaskAction extends ParentAction {
  readonly taskId: string
  readonly ok: boolean
  readonly time: number
  readonly day?: number

  constructor ({ taskId, ok, time, day }: {
    taskId: string
    ok: boolean
    time: number
    day?: number
  }) {
    super()

    assertIdWithinFamily({ actionType, field: 'taskId', value: taskId })
    assertSafeInteger({ actionType, field: 'time', value: time })

    if (time <= 0) {
      throwOutOfRange({ actionType, field: 'time', value: time })
    }

    if (day !== undefined) {
      assertSafeInteger({ actionType, field: 'day', value: day })

      if (day < 0) {
        throwOutOfRange({ actionType, field: 'day', value: day })
      }
    }

    this.taskId = taskId
    this.ok = ok
    this.time = time
    this.day = day
  }

  static parse = ({ taskId, ok, time, day }: SerializedReviewChildTaskAction) => (
    new ReviewChildTaskAction({ taskId, ok, time, day })
  )
}

export interface SerializedReviewChildTaskAction {
  type: 'REVIEW_CHILD_TASK'
  taskId: string
  ok: boolean
  time: number
  day?: number
}
