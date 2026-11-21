import assert from 'assert'
import { describe, it } from 'node:test'

import HttpErrors from 'http-errors'

import { withTestDatabase, testPassword1 } from '../helper/database.js'
import { signInIntoFamily } from '../../src/function/parent/sign-in-into-family.js'
import { InMemoryEventHandler } from '../../src/monitoring/inmemoryeventhandler.js'
import { generateIdWithinFamily } from '../../src/util/token.js'
import { createMailTransport } from '../../src/util/mail.js'
import { dummyWebsocketApi } from '../../src/websocket/index.js'

describe('functionality', () => {
  describe('sign in into family', () => {
    const mail1 = 'test@a.timelimit.io'
    const mail2 = 'test@b.timelimit.io'
    const mail3 = 'test@c.timelimit.io'
    const deviceName = 'ND'
    const newDeviceInfo = {
      model: 'Super Phone'
    }
    const timeZone = 'Europe/Berlin'
    const locale = 'en'
    const clientLevel = 0
    const websocket = dummyWebsocketApi
    const eventHandler = new InMemoryEventHandler()
    const config = { alwaysPro: false }
    const mailTransport = createMailTransport({ mailTransport: { type: 'test' } })

    it('should work', async function() {
      await withTestDatabase(async (database) => {
        const { familyId, userId, mailAuthToken } = await database.transaction(async (transaction) => {
          const family1 = await transaction.family.create({ time: 1, fullVersionUntil: 2 })
          const family2 = await transaction.family.create({ time: 1, fullVersionUntil: 2 })
          const family3 = await transaction.family.create({ time: 1, fullVersionUntil: 2 })

          const userId = generateIdWithinFamily()

          await transaction.user.create({
            familyId: family1.familyId,
            userId,
            name: 'P1',
            passwordHash: testPassword1.hash,
            secondPasswordHash: testPassword1.secondHash,
            secondPasswordSalt: testPassword1.secondSalt,
            type: 'parent',
            mail: mail1,
            timeZone,
          })

          await transaction.user.create({
            familyId: family2.familyId,
            userId,
            name: 'P2',
            passwordHash: testPassword1.hash,
            secondPasswordHash: testPassword1.secondHash,
            secondPasswordSalt: testPassword1.secondSalt,
            type: 'parent',
            mail: mail2,
            timeZone,
          })

          await transaction.user.create({
            familyId: family3.familyId,
            userId,
            name: 'P3',
            passwordHash: testPassword1.hash,
            secondPasswordHash: testPassword1.secondHash,
            secondPasswordSalt: testPassword1.secondSalt,
            type: 'parent',
            mail: mail3,
            timeZone,
          })

          const mailAuthToken = await transaction.authToken.create({
            time: 1,
            mail: mail2,
            locale,
          })

          return { familyId: family2.familyId, userId, mailAuthToken }
        })

        const result = await signInIntoFamily({
          config,
          database,
          eventHandler,
          mailAuthToken,
          newDeviceInfo,
          deviceName,
          websocket,
          clientLevel,
          mailTransport,
        })

        await database.transaction(async (transaction) => {
          const reply1 = await transaction.device.getFamilyIdAndDeviceIdByAuthToken(result.deviceAuthToken)
          const reply2 = await transaction.device.getFamilyIdAndCurrentUserByAuthToken(result.deviceAuthToken)

          assert.strictEqual(reply1 !== null, true)
          assert.strictEqual(reply1?.deviceId, result.deviceId)
          assert.strictEqual(reply1?.familyId, familyId)

          assert.strictEqual(reply2 !== null, true)
          assert.strictEqual(reply2?.currentUserId, userId)
          assert.strictEqual(reply2?.familyId, familyId)
        })
      })
    })

    it('should fail for unknown mail addresses', async function() {
      await withTestDatabase(async (database) => {
        const { mailAuthToken } = await database.transaction(async (transaction) => {
          const family1 = await transaction.family.create({ time: 1, fullVersionUntil: 2 })
          const family2 = await transaction.family.create({ time: 1, fullVersionUntil: 2 })

          const userId = generateIdWithinFamily()

          await transaction.user.create({
            familyId: family1.familyId,
            userId,
            name: 'P1',
            passwordHash: testPassword1.hash,
            secondPasswordHash: testPassword1.secondHash,
            secondPasswordSalt: testPassword1.secondSalt,
            type: 'parent',
            mail: mail1,
            timeZone,
          })

          await transaction.user.create({
            familyId: family2.familyId,
            userId,
            name: 'P2',
            passwordHash: testPassword1.hash,
            secondPasswordHash: testPassword1.secondHash,
            secondPasswordSalt: testPassword1.secondSalt,
            type: 'parent',
            mail: mail2,
            timeZone,
          })

          const mailAuthToken = await transaction.authToken.create({
            time: 1,
            mail: mail3,
            locale,
          })

          return { mailAuthToken }
        })

        await assert.rejects(
          signInIntoFamily({
            config,
            database,
            eventHandler,
            mailAuthToken,
            newDeviceInfo,
            deviceName,
            websocket,
            clientLevel,
            mailTransport,
          }),
          HttpErrors.Conflict
        )
      })
    })
  })
})
