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

export class IllegalStateException extends ApplyActionException {
  constructor ({ staticMessage }: { staticMessage: string }) {
    super({ staticMessage })
  }
}

export class SourceDeviceNotFoundException extends IllegalStateException {
  constructor () {
    super({ staticMessage: 'source device not found' })
  }
}

export class SourceUserNotFoundException extends IllegalStateException {
  constructor () {
    super({ staticMessage: 'source user not found' })
  }
}

export class SourceFamilyNotFoundException extends IllegalStateException {
  constructor () {
    super({ staticMessage: 'family entry not found' })
  }
}

export class ActionObjectTypeNotHandledException extends IllegalStateException {
  constructor () {
    super({ staticMessage: 'action object type not handled' })
  }
}
