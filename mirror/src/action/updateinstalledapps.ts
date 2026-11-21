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

import { AppLogicAction } from './basetypes.js'
import { InvalidActionParameterException } from './meta/exception.js'

const actionType = 'UpdateInstalledAppsAction'
const SIZE_LIMIT = 1024 * 512

export class UpdateInstalledAppsAction extends AppLogicAction {
  readonly base?: Buffer
  readonly diff?: Buffer
  readonly wipe: boolean

  constructor ({ base, diff, wipe }: {
    base?: Buffer,
    diff?: Buffer,
    wipe: boolean
  }) {
    super()

    if (base && base.length > SIZE_LIMIT) {
      throw new InvalidActionParameterException({
        actionType,
        staticMessage: 'base data too big'
      })
    }

    if (diff && diff.length > SIZE_LIMIT) {
      throw new InvalidActionParameterException({
        actionType,
        staticMessage: 'diff data too big'
      })
    }

    this.base = base
    this.diff = diff
    this.wipe = wipe
  }

  static parse = ({ b, d, w }: SerializedUpdateInstalledAppsAction) => (
    new UpdateInstalledAppsAction({
      base: b !== undefined ? Buffer.from(b, 'base64') : undefined,
      diff: d !== undefined ? Buffer.from(d, 'base64') : undefined,
      wipe: w
    })
  )
}

export interface SerializedUpdateInstalledAppsAction {
  type: 'UPDATE_INSTALLED_APPS'
  b?: string
  d?: string
  w: boolean
}
