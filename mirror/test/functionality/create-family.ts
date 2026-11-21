import assert from 'assert'
import { describe, it } from 'node:test'

import HttpErrors from 'http-errors'

import { withTestDatabase, testPassword1, SimpleDatabase } from '../helper/database.js'
import { createFamily } from '../../src/function/parent/create-family.js'
import { InMemoryEventHandler } from '../../src/monitoring/inmemoryeventhandler.js'

describe('functionality', () => {
  describe('create family', () => {
    const mail1 = 'user1@a.timelmit.io'

    async function createFamilyEasy(database: SimpleDatabase, mailAuthToken: string) {
      return await createFamily({
        config: { alwaysPro: false },
        database,
        eventHandler: new InMemoryEventHandler(),
        mailAuthToken,
        firstParentDevice: { model: 'Mega Phone' },
        password: testPassword1,
        timeZone: 'Europe/Berlin',
        parentName: 'P1',
        deviceName: 'D1',
        clientLevel: 1
      })
    }

    async function happyPath(database: SimpleDatabase) {
      const mailAuthToken = await database.transaction(async (transaction) => {
        return await transaction.authToken.create({ time: 1, mail: mail1, locale: 'de' })
      })

      return await createFamilyEasy(database, mailAuthToken)
    }

    it('should consume the mail auth token', async () => {
      withTestDatabase(async (database) => {
        const mailAuthToken = await database.transaction(async (transaction) => {
          return await transaction.authToken.create({ time: 1, mail: mail1, locale: 'de' })
        })

        await database.transaction(async (transaction) => {
          const tokenInfo = await transaction.authToken.checkAndKeep(mailAuthToken)

          assert.strictEqual(tokenInfo !== null, true)
        })

        await createFamilyEasy(database, mailAuthToken)

        await database.transaction(async (transaction) => {
          const tokenInfo = await transaction.authToken.checkAndKeep(mailAuthToken)

          assert.strictEqual(tokenInfo !== null, false)
        })
      })
    })

    it('should create the family with matching device id and auth token', async () => {
      withTestDatabase(async (database) => {
        const result = await happyPath(database)

        await database.transaction(async (transaction) => {
          const deviceInfo = await transaction.device.getFamilyIdAndDeviceIdByAuthToken(result.deviceAuthToken)

          assert.strictEqual(deviceInfo !== null, true)
          assert.strictEqual(deviceInfo?.deviceId, result.deviceId)
        })
      })
    })

    it('should create the family with premium', async () => {
      withTestDatabase(async (database) => {
        const result = await happyPath(database)

        await database.transaction(async (transaction) => {
          const familyId = await transaction.device.getFamilyIdByAuthToken(result.deviceAuthToken)

          if (familyId === null) throw new Error()

          const hasPremium = await transaction.family.hasFullVersionByFamilyId(familyId)

          assert.strictEqual(hasPremium, true)
        })
      })
    })

    it('should detect already assigned mail addresses', async () => {
      withTestDatabase(async (database) => {
        await happyPath(database)

        await assert.rejects(
          happyPath(database),
          HttpErrors.Conflict
        )
      })
    })

    it('should reject used auth tokens', async () => {
      withTestDatabase(async (database) => {
        const mailAuthToken = await database.transaction(async (transaction) => {
          return await transaction.authToken.create({ time: 1, mail: mail1, locale: 'de' })
        })

        await database.transaction(async (transaction) => {
          const tokenInfo = await transaction.authToken.checkAndDestroy(mailAuthToken)

          assert.strictEqual(tokenInfo !== null, true)
        })

        await assert.rejects(
          createFamilyEasy(database, mailAuthToken),
          HttpErrors.Unauthorized
        )
      })
    })
  })
})
