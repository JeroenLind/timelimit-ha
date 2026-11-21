/*
 * server component for the TimeLimit App
 * Copyright (C) 2019 Jonas Lochmann
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

import { AppRecommendation } from './apprecommendation.js'

export class InstalledApp {
  readonly packageName: string
  readonly title: string
  readonly isLaunchable: boolean
  readonly recommendation: AppRecommendation

  constructor ({ packageName, title, isLaunchable, recommendation }: {packageName: string, title: string, isLaunchable: boolean, recommendation: AppRecommendation}) {
    this.packageName = packageName
    this.title = title
    this.isLaunchable = isLaunchable
    this.recommendation = recommendation
  }

  serialize = (): SerializedInstalledApp => ({
    packageName: this.packageName,
    title: this.title,
    isLaunchable: this.isLaunchable,
    recommendation: this.recommendation
  })

  static parse = ({ packageName, title, isLaunchable, recommendation }: SerializedInstalledApp) => (
    new InstalledApp({ packageName, title, isLaunchable, recommendation })
  )
}

export interface SerializedInstalledApp {
  packageName: string
  title: string
  isLaunchable: boolean
  recommendation: AppRecommendation
}
