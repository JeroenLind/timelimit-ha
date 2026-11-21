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

export function checkIfHexString (value: string) {
  if (value.length % 2 !== 0) {
    return false
  }

  for (let i = 0; i < value.length; i++) {
    const char = value[i]

    if ('0123456789abcdef'.indexOf(char) === -1) {
      return false
    }
  }

  return true
}

export function assertIsHexString (value: string) {
  if (!checkIfHexString(value)) {
    throw new HexStringValidationException('wanted hex string but did not get one')
  }
}

export class HexStringValidationException extends Error {}
