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

import { ApplyActionException } from './index.js'

export class SelfLimitationException extends ApplyActionException {}

export class CanNotModifyOtherUsersBySelfLimitationException extends SelfLimitationException {
  constructor () {
    super({ staticMessage: 'can not modify other users with the self limitation' })
  }
}

export class ActionNotSupportedBySelfLimitationException extends SelfLimitationException {
  constructor () {
    super({ staticMessage: 'can not dispatch this action with the self limitation' })
  }
}

export class SelfLimitNotPossibleException extends SelfLimitationException {}

export class CanNotRelaxRestrictionsSelfLimitException extends SelfLimitationException {
  constructor () {
    super({ staticMessage: 'can not relax restrictions with the self limitation' })
  }
}
