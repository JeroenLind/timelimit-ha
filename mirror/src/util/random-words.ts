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
import { readFileSync } from 'fs'
import range from 'lodash/range.js'
import { resolve } from 'path'

const wordlist = readFileSync(resolve(import.meta.dirname, '../../../other/wordlist/de.txt'))
  .toString()
  .split('\n')
  .filter((item) => item.trim().length > 0)

const randomWord = () => wordlist[randomInt(wordlist.length)]

export const randomWords = (numberOfWords: number) => (
  range(numberOfWords)
    .map(() => randomWord())
    .join(' ')
)

const preprocessStringForComparing = (input: string) => (
  input
    .replace(/ |\*/g, '')
    .toLowerCase()
)

export const areWordSequencesEqual = (a: string, b: string) => (
  preprocessStringForComparing(a) === preprocessStringForComparing(b)
)
