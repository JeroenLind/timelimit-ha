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

import { randomInt } from 'crypto'
import { ValidationException } from '../exception/index.js'

const defaultAlphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

function randomString(chars: string, length: number) {
  let result = ''

  for (let i = 0; i < length; i++) {
    result += chars[randomInt(chars.length)]
  }

  if (result.length !== length) throw new Error()

  return result
}

export const generateAuthToken = randomString.bind(null, defaultAlphabet, 32)

export const generateIdWithinFamily = randomString.bind(null, defaultAlphabet, 6)
export const isIdWithinFamily = (id: string) => id.length === 6 && /^[a-zA-Z0-9]+$/.test(id)
export const assertIdWithinFamily = (id: string) => {
  if (!isIdWithinFamily(id)) {
    throw new ValidationException({
      staticMessage: 'invalid id within family',
      dynamicMessage: 'invalid id within family: ' + id
    })
  }
}

export const generateVersionId = randomString.bind(null, defaultAlphabet, 4)

export const isVersionId = (id: string) => id.length === 4 && /^[a-zA-Z0-9]+$/.test(id)

export const generateFamilyId = randomString.bind(null, defaultAlphabet, 10)
export const generatePurchaseId = randomString.bind(null, defaultAlphabet, 10)
