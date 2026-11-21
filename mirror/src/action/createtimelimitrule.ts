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

import { ParseTimeLimitRuleException, SerializedTimeLimitRule, TimelimitRule } from '../model/timelimitrule.js'
import { ParentAction } from './basetypes.js'
import { InvalidActionParameterException } from './meta/exception.js'

const actionType = 'CreateTimeLimitRuleAction'

export class CreateTimeLimitRuleAction extends ParentAction {
  rule: TimelimitRule

  constructor ({ rule }: {rule: TimelimitRule}) {
    super()

    this.rule = rule
  }

  static parse = ({ rule }: SerializedCreateTimelimtRuleAction) => {
    try {
      return new CreateTimeLimitRuleAction({
        rule: TimelimitRule.parse(rule)
      })
    } catch (ex) {
      if (ex instanceof ParseTimeLimitRuleException) {
        throw new InvalidActionParameterException({
          actionType,
          staticMessage: 'invalid time limit rule',
          dynamicMessage: 'invalid time limit rule: ' + ex.toString()
        })
      } else throw ex
    }
  }
}

export interface SerializedCreateTimelimtRuleAction {
  type: 'CREATE_TIMELIMIT_RULE'
  rule: SerializedTimeLimitRule
}
