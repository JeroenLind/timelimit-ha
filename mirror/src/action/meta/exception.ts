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

import { StaticMessageException } from '../../exception/index.js'

export class InvalidActionParameterException extends StaticMessageException {
  constructor ({ actionType, staticMessage, dynamicMessage }: {
    actionType: string
    staticMessage: string
    dynamicMessage?: string
  }) {
    super({
      staticMessage: 'invalid action paramters:' + actionType + ':' + staticMessage,
      dynamicMessage: dynamicMessage ? 'invalid action paramters:' + actionType + ':' + dynamicMessage : undefined
    })
  }
}

export class UnknownActionTypeException extends InvalidActionParameterException {
  constructor ({ group }: { group: string }) {
    super({
      actionType: group,
      staticMessage: 'unknown action type'
    })
  }
}
