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

import { maxExtraTime, maxTitleLength } from '../database/childtask.js'
import { ParentAction } from './basetypes.js'
import { InvalidActionParameterException } from './meta/exception.js'
import { assertIdWithinFamily, assertSafeInteger, throwOutOfRange } from './meta/util.js'

const actionType = 'UpdateChildTaskAction'

export class UpdateChildTaskAction extends ParentAction {
  readonly isNew: boolean
  readonly taskId: string
  readonly categoryId: string
  readonly taskTitle: string
  readonly extraTimeDuration: number

  constructor ({ isNew, taskId, categoryId, taskTitle, extraTimeDuration }: {
    isNew: boolean
    taskId: string
    categoryId: string
    taskTitle: string
    extraTimeDuration: number
  }) {
    super()

    assertIdWithinFamily({ actionType, field: 'taskId', value: taskId })
    assertIdWithinFamily({ actionType, field: 'categoryId', value: categoryId })
    assertSafeInteger({ actionType, field: 'extraTimeDuration', value: extraTimeDuration })

    if (taskTitle === '' || taskTitle.length > maxTitleLength) {
      throw new InvalidActionParameterException({ actionType, staticMessage: 'invalid title' })
    }

    if (extraTimeDuration <= 0 || extraTimeDuration > maxExtraTime) {
      throwOutOfRange({ actionType, field: 'extraTimeDuration', value: extraTimeDuration })
    }

    this.isNew = isNew
    this.taskId = taskId
    this.categoryId = categoryId
    this.taskTitle = taskTitle
    this.extraTimeDuration = extraTimeDuration
  }

  static parse = ({ isNew, taskId, categoryId, taskTitle, extraTimeDuration }: SerializedUpdateChildTaskAction) => (
    new UpdateChildTaskAction({ isNew, taskId, categoryId, taskTitle, extraTimeDuration })
  )
}

export interface SerializedUpdateChildTaskAction {
  type: 'UPDATE_CHILD_TASK'
  isNew: boolean
  taskId: string
  categoryId: string
  taskTitle: string
  extraTimeDuration: number
}
