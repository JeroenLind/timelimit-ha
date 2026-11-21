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

import { checkIfHexString } from '../../util/hexstring.js'
import { hasDuplicates } from '../../util/list.js'
import { isIdWithinFamily } from '../../util/token.js'
import { InvalidActionParameterException } from './exception.js'

export const assertIdWithinFamily = ({ value, actionType, field }: {
  value: string
  actionType: string
  field: string
}) => {
  if (!isIdWithinFamily(value)) {
    throw new InvalidActionParameterException({
      actionType,
      staticMessage: 'invalid id within family for ' + field,
      dynamicMessage: 'invalid id within family for ' + field + ': ' + value
    })
  }
}

export const assertHexString = ({ value, actionType, field }: {
  value: string
  actionType: string
  field: string
}) => {
  if (!checkIfHexString(value)) {
    throw new InvalidActionParameterException({
      actionType,
      staticMessage: 'invalid hex string for ' + field,
      dynamicMessage: 'invalid hex string for ' + field + ': ' + value
    })
  }
}

export const assertSafeInteger = ({ value, actionType, field }: {
  value: number
  actionType: string
  field: string
}) => {
  if (!Number.isSafeInteger(value)) {
    throw new InvalidActionParameterException({
      actionType,
      staticMessage: 'require number for ' + field,
      dynamicMessage: 'require number for ' + field + ': ' + value
    })
  }
}

export const throwOutOfRange = ({ value, actionType, field }: {
  value: number
  actionType: string
  field: string
}) => {
  throw new InvalidActionParameterException({
    actionType,
    staticMessage: field + ' out of range',
    dynamicMessage: field + ' out of range: ' + value
  })
}

export function assertNonEmptyListWithoutDuplicates ({ list, actionType, field }: {
  list: Array<string>
  actionType: string
  field: string
}) {
  assertListWithoutDuplicates({ list, actionType, field })

  if (hasDuplicates(list)) {
    throw new InvalidActionParameterException({
      actionType,
      staticMessage: 'empty list for ' + field
    })
  }
}

export function assertListWithoutDuplicates ({ list, actionType, field }: {
  list: Array<string>
  actionType: string
  field: string
}) {
  if (hasDuplicates(list)) {
    throw new InvalidActionParameterException({
      actionType,
      staticMessage: 'list has duplicates for ' + field,
      dynamicMessage: 'list has duplicates for ' + field + ': ' + list.join(';')
    })
  }
}
