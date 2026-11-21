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

import { InvalidActionParameterException } from '../../../action/meta/exception.js'
import { ClientPushChangesRequestAction } from '../../../api/schema.js'
import { BadEncodedActionJsonException, InvalidActionParamterException } from './exception/invalidaction.js'

export function parseEncodedAction (action: ClientPushChangesRequestAction): object {
  try {
    const result = JSON.parse(action.encodedAction)

    if (typeof result !== 'object') throw new BadEncodedActionJsonException()

    return result
  } catch (ex) {
    if (ex instanceof SyntaxError) {
      throw new BadEncodedActionJsonException()
    } else if (ex instanceof InvalidActionParameterException) {
      throw new InvalidActionParamterException(ex)
    } else throw ex
  }
}
