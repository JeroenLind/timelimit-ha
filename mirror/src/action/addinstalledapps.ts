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

import { InstalledApp, SerializedInstalledApp } from '../model/installedapp.js'
import { AppLogicAction } from './basetypes.js'
import { assertNonEmptyListWithoutDuplicates } from './meta/util.js'

const actionType = 'AddInstalledAppsAction'

export class AddInstalledAppsAction extends AppLogicAction {
  readonly apps: Array<InstalledApp>

  constructor ({ apps }: {apps: Array<InstalledApp>}) {
    super()

    assertNonEmptyListWithoutDuplicates({ actionType, field: 'apps', list: apps.map((app) => app.packageName) })

    this.apps = apps
  }

  static parse = ({ apps }: SerializedAddInstalledAppsAction) => (
    new AddInstalledAppsAction({
      apps: apps.map((app) => InstalledApp.parse(app))
    })
  )
}

export interface SerializedAddInstalledAppsAction {
  type: 'ADD_INSTALLED_APPS'
  apps: Array<SerializedInstalledApp>
}
