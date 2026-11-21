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

import { InvalidActionParameterException } from '../../../../action/meta/exception.js'
import { ApplyActionException } from './index.js'

export class InvalidActionException extends ApplyActionException {}

export class InvalidActionParamterException extends InvalidActionException {
  constructor (cause: InvalidActionParameterException) {
    super({
      staticMessage: cause.staticMessage,
      dynamicMessage: cause.dynamicMessage
    })
  }
}

export class BadEncodedActionJsonException extends InvalidActionException {
  constructor () { super({ staticMessage: 'bad encoded action JSON' }) }
}

export class BadEncodedActionContentException extends InvalidActionException {}

export class EncodedActionSchemaMismatchException extends BadEncodedActionContentException {
  readonly action: object

  constructor ({ type, action }: { type: 'parent' | 'child' | 'app logic', action: object }) {
    super({
      staticMessage: 'encoded ' + type + ' action does not match schema',
      dynamicMessage: 'encoded action does not match schema: ' + JSON.stringify(action)
    })

    this.action = action
  }
}
