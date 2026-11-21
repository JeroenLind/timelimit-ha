import assert from 'assert'
import { describe, it } from 'node:test'

import HttpErrors from 'http-errors'

import { withTestDatabase, testPassword1, testPassword2, SimpleDatabase } from '../helper/database.js'
import { createFamily } from '../../src/function/parent/create-family.js'
import { recoverParentPassword } from '../../src/function/parent/recover-parent-password.js'
import { InMemoryEventHandler } from '../../src/monitoring/inmemoryeventhandler.js'
import { createMailTransport } from '../../src/util/mail.js'
import { dummyWebsocketApi } from '../../src/websocket/index.js'

describe('functionality', () => {
  describe('recover parent password', () => {
    const mail1 = 'user1@a.timelmit.io'
    const mail2 = 'user2@b.timelmit.io'
    const mail3 = 'user3@c.timelmit.io'
    const mail4 = 'user4@d.timelmit.io'

    const clientLevel = 0
    const websocket = dummyWebsocketApi
    const eventHandler = new InMemoryEventHandler()
    const config = { alwaysPro: false }
    const mailTransport = createMailTransport({ mailTransport: { type: 'test' } })

    async function setupBase(database: SimpleDatabase) {
      for (const mail of [mail1, mail2, mail3]) {
        const mailAuthToken = await database.transaction(async (transaction) => {
          return await transaction.authToken.create({ time: 1, mail, locale: 'de' })
        })

        await createFamily({
          config,
          database,
          eventHandler,
          mailAuthToken,
          firstParentDevice: { model: 'Mega Phone' },
          password: testPassword1,
          timeZone: 'Europe/Berlin',
          parentName: 'P1',
          deviceName: 'D1',
          clientLevel
        })
      }
    }

    it('should run without exception', async () => {
      withTestDatabase(async (database) => {
        await setupBase(database)

        const mailAuthToken = await database.transaction(async (transaction) => {
          return await transaction.authToken.create({ time: 2, mail: mail2, locale: 'de' })
        })

        await recoverParentPassword({
          database,
          mailTransport,
          websocket,
          password: testPassword2,
          mailAuthToken
        })
      })
    })

    it('should update the password of the requested user', async () => {
      withTestDatabase(async (database) => {
        await setupBase(database)

        const mailAuthToken = await database.transaction(async (transaction) => {
          return await transaction.authToken.create({ time: 2, mail: mail2, locale: 'de' })
        })

        await recoverParentPassword({
          database,
          mailTransport,
          websocket,
          password: testPassword2,
          mailAuthToken
        })

        await database.transaction(async (transaction) => {
          const userInfo1 = await transaction.user.getFamilyIdAndUserIdByMailAddress(mail2)

          if (!userInfo1) throw new Error()

          const userInfo2 = await transaction.user.getParentUserMailAndSecondPasswordHash(userInfo1)

          assert.strictEqual(userInfo2?.secondPasswordSalt, testPassword2.secondSalt)
          assert.strictEqual(userInfo2?.secondPasswordHash, testPassword2.secondHash)
        })
      })
    })

    it('should keep the password of the other users', async () => {
      withTestDatabase(async (database) => {
        await setupBase(database)

        const mailAuthToken = await database.transaction(async (transaction) => {
          return await transaction.authToken.create({ time: 2, mail: mail2, locale: 'de' })
        })

        await recoverParentPassword({
          database,
          mailTransport,
          websocket,
          password: testPassword2,
          mailAuthToken
        })

        await database.transaction(async (transaction) => {
          for (const mail of [mail1, mail3]) {
            const userInfo1 = await transaction.user.getFamilyIdAndUserIdByMailAddress(mail)

            if (!userInfo1) throw new Error()

            const userInfo2 = await transaction.user.getParentUserMailAndSecondPasswordHash(userInfo1)

            assert.strictEqual(userInfo2?.secondPasswordSalt, testPassword1.secondSalt)
            assert.strictEqual(userInfo2?.secondPasswordHash, testPassword1.secondHash)
          }
        })
      })
    })

    it('should run twice without exception', async () => {
      withTestDatabase(async (database) => {
        await setupBase(database)

        const mailAuthToken1 = await database.transaction(async (transaction) => {
          return await transaction.authToken.create({ time: 2, mail: mail2, locale: 'de' })
        })

        await recoverParentPassword({
          database,
          mailTransport,
          websocket,
          password: testPassword2,
          mailAuthToken: mailAuthToken1
        })

        const mailAuthToken2 = await database.transaction(async (transaction) => {
          return await transaction.authToken.create({ time: 4, mail: mail2, locale: 'de' })
        })

        await recoverParentPassword({
          database,
          mailTransport,
          websocket,
          password: testPassword1,
          mailAuthToken: mailAuthToken2
        })
      })
    })

    it('should not run twice with the same mail auth token', async () => {
      withTestDatabase(async (database) => {
        await setupBase(database)

        const mailAuthToken = await database.transaction(async (transaction) => {
          return await transaction.authToken.create({ time: 2, mail: mail2, locale: 'de' })
        })

        await recoverParentPassword({
          database,
          mailTransport,
          websocket,
          password: testPassword2,
          mailAuthToken: mailAuthToken
        })

        await assert.rejects(
          recoverParentPassword({
            database,
            mailTransport,
            websocket,
            password: testPassword1,
            mailAuthToken
          }),
          HttpErrors.Unauthorized
        )
      })
    })

    it('should fail for unregistered users', async () => {
      withTestDatabase(async (database) => {
        await setupBase(database)

        const mailAuthToken = await database.transaction(async (transaction) => {
          return await transaction.authToken.create({ time: 2, mail: mail4, locale: 'de' })
        })

        await assert.rejects(
          recoverParentPassword({
            database,
            mailTransport,
            websocket,
            password: testPassword2,
            mailAuthToken
          }),
          HttpErrors.Conflict
        )
      })
    })

    it('should fail for invalid passwords', async () => {
      withTestDatabase(async (database) => {
        await setupBase(database)

        const mailAuthToken = await database.transaction(async (transaction) => {
          return await transaction.authToken.create({ time: 2, mail: mail2, locale: 'de' })
        })

        await assert.rejects(
          recoverParentPassword({
            database,
            mailTransport,
            websocket,
            password: {
              hash: 'something',
              secondSalt: 'test',
              secondHash: 'garbage',
            },
            mailAuthToken
          }),
          HttpErrors.BadRequest
        )
      })
    })
  })
})
