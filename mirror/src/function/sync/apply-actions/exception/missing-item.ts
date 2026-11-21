/*
 * server component for the TimeLimit App
 * Copyright (C) 2019 - 2020 Jonas Lochmann
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

export class MissingItemException extends ApplyActionException {}

export class MissingCategoryException extends MissingItemException {
  constructor () {
    super({ staticMessage: 'referenced category which does not exist' })
  }
}

export class MissingUserException extends MissingItemException {
  constructor () {
    super({ staticMessage: 'referenced user which does not exist' })
  }
}

export class MissingRuleException extends MissingItemException {
  constructor () {
    super({ staticMessage: 'referenced rule which does not exist' })
  }
}

export class MissingDeviceException extends MissingItemException {
  constructor () {
    super({ staticMessage: 'referenced device which does not exist' })
  }
}

export class MissingTaskException extends MissingItemException {
  constructor () {
    super({ staticMessage: 'referenced task which does not exist' })
  }
}
