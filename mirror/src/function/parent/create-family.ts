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

import HttpErrors from 'http-errors'
import { generateServerDataStatus } from '../sync/get-server-data-status/index.js'
import { NewDeviceInfo, PlaintextParentPassword, assertPlaintextParentPasswordValid } from '../../api/schema.js'
import { AlwaysProConfig } from '../../config.js'
import { SimpleDatabase } from '../../database/simple/index.js'
import { EventHandler } from '../../monitoring/eventhandler.js'
import { ServerDataStatus } from '../../object/serverdatastatus.js'
import { createEmptyClientDataStatus } from '../../object/clientdatastatus.js'
import { generateAuthToken, generateIdWithinFamily } from '../../util/token.js'
import { requireMailAndLocaleByAuthToken } from '../authentication/index.js'

export async function createFamily ({
  config, database, eventHandler, mailAuthToken, firstParentDevice,
  password, timeZone, parentName, deviceName, clientLevel
}: {
  config: AlwaysProConfig
  database: SimpleDatabase
  eventHandler: EventHandler
  mailAuthToken: string
  firstParentDevice: NewDeviceInfo
  password: PlaintextParentPassword
  timeZone: string
  parentName: string
  deviceName: string
  clientLevel: number | null
  // no transaction here because this is directly called from an API endpoint
}): Promise<{
  deviceAuthToken: string
  deviceId: string
  data: ServerDataStatus
}> {
  assertPlaintextParentPasswordValid(password)

  return database.transaction(async (transaction) => {
    const time = Date.now()

    const mailInfo = await requireMailAndLocaleByAuthToken({ transaction, mailAuthToken, invalidate: true })

    const existingUserEntry = await transaction.user.getFamilyIdAndUserIdByMailAddress(mailInfo.mail)

    if (existingUserEntry) {
      throw new HttpErrors.Conflict()
    }

    const userId = generateIdWithinFamily()
    const deviceId = generateIdWithinFamily()
    const deviceAuthToken = generateAuthToken()

    // create family
    const { familyId } = await transaction.family.create({
      time,
      fullVersionUntil: time + 1000 * 60 * 60 * 24 * 14, // 14 days demo
    })

    // create parent user
    await transaction.user.create({
      familyId,
      userId,
      name: parentName,
      passwordHash: password.hash,
      secondPasswordHash: password.secondHash,
      secondPasswordSalt: password.secondSalt,
      type: 'parent',
      mail: mailInfo.mail,
      timeZone,
    })

    // add parent device
    await transaction.device.create({
      familyId,
      time,
      deviceId,
      deviceName,
      deviceModel: firstParentDevice.model,
      userId,
      deviceAuthToken,
      isUserKeptSignedIn: true
    })

    const data = await generateServerDataStatus({
      transaction,
      clientStatus: createEmptyClientDataStatus({ clientLevel }),
      familyId,
      deviceId,
      config,
      eventHandler
    })

    return {
      deviceAuthToken,
      deviceId,
      data
    }
  })
}
