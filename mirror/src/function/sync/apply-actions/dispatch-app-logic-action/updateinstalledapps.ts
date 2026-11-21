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

import { UpdateInstalledAppsAction } from '../../../../action/index.js'
import { types } from '../../../../database/encryptedapplist.js'
import { generateVersionId } from '../../../../util/token.js'
import { Cache } from '../cache.js'

export async function dispatchUpdateInstalledApps ({ deviceId, action, cache }: {
  deviceId: string
  action: UpdateInstalledAppsAction
  cache: Cache
}) {
  async function upsert({ type, data }: { type: number, data: Buffer }) {
    await cache.transaction.legacy.database.encryptedAppList.upsert({
      familyId: cache.familyId,
      deviceId,
      type,
      version: generateVersionId(),
      data
    }, { transaction: cache.transaction.legacy.transaction })
  }

  if (action.base) {
    await upsert({ type: types.base, data: action.base })
  }

  if (action.diff) {
    await upsert({ type: types.diff, data: action.diff })
  }

  cache.incrementTriggeredSyncLevel(1)
}
