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

import { createHash } from 'crypto'

const updateMessage =
  'Please update the TimeLimit App to the latest release. ' +
  'In your current version, synchronization and purchases may not work as expected.' +
  '\n\n' +
  'Bitte die TimeLimit-App aktualisieren. ' +
  'Mit der momentan installierten Version kann es zu Einschränkungen bei der Synchronisation und bei Käufen kommen.'

export function getCampaign({ familyId, isClient750OrNewer }: {
  familyId: string
  isClient750OrNewer: boolean
}): string | undefined {
  const now = Date.now()

  const campaigns = [
    {
      enable: !isClient750OrNewer,
      seed: 'Q05NwM4nyUfiYg6K', // require('crypto').randomBytes(12).toString('base64')
      startTime: 1784160000000, // new Date('2026-07-16').valueOf()
      endTime: 1785369600000, // new Date('2026-07-30').valueOf()
      startPercentage: 0,
      endPercentage: 10,
      message: updateMessage,
    },
    {
      enable: !isClient750OrNewer,
      seed: 'Q05NwM4nyUfiYg6K', // require('crypto').randomBytes(12).toString('base64')
      startTime: 1788220800000, // new Date('2026-09-01').valueOf()
      endTime: 1796083200000, // new Date('2026-12-01').valueOf()
      startPercentage: 10,
      endPercentage: 100,
      message: updateMessage,
    },
  ]

  for (const campaign of campaigns) {
    if (!campaign.enable) continue
    if (now < campaign.startTime) continue

    const progress = Math.min((now - campaign.startTime) / (campaign.endTime - campaign.startTime), 1)
    const chanceInPercent = campaign.startPercentage + progress * (campaign.endPercentage - campaign.startPercentage)

    const hasher = createHash('SHA3-224')

    hasher.update(campaign.seed, 'base64')
    hasher.update(familyId)

    const hash = hasher.digest().readUInt32BE(0)
    const match = hash < chanceInPercent * Math.pow(2, 32) / 100

    if (match) return campaign.message
  }

  return undefined
}
