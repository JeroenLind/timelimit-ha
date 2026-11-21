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

export class ApplyActionIntegrityException extends ApplyActionException {}

export class ParentDeviceActionWithoutParentDeviceException extends ApplyActionIntegrityException {
  constructor () { super({ staticMessage: 'parent device action but no parent device' }) }
}

export class InvalidParentActionIntegrityValue extends ApplyActionIntegrityException {
  constructor () { super({ staticMessage: 'invalid parent action integrity value' }) }
}

export class InvalidU2fIntegrityValue extends ApplyActionIntegrityException {
  constructor (message: string) { super({ staticMessage: 'invalid parent action u2f integrity value: ' + message }) }
}

export class InvalidChildActionIntegrityValue extends ApplyActionIntegrityException {
  constructor () { super({ staticMessage: 'invalid child action integrity value' }) }
}
