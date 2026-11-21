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
import { assertIdWithinFamily } from './meta/util.js'

const actionType = 'DeleteTimeLimitRuleAction'

export class DeleteTimeLimitRuleAction extends ParentAction {
  readonly ruleId: string

  constructor ({ ruleId }: {ruleId: string}) {
    super()

    assertIdWithinFamily({ actionType, field: 'ruleId', value: ruleId })

    this.ruleId = ruleId
  }

  static parse = ({ ruleId }: SerializedDeleteTimeLimitRuleAction) => (
    new DeleteTimeLimitRuleAction({ ruleId })
  )
}

export interface SerializedDeleteTimeLimitRuleAction {
  type: 'DELETE_TIMELIMIT_RULE'
  ruleId: string
}
