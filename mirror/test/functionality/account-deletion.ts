import assert from 'assert'
import { describe, it } from 'node:test'

import HttpErrors from 'http-errors'

import { withTestDatabase, testPassword1, SimpleDatabaseTransaction } from '../helper/database.js'
import { deleteAccount } from '../../src/function/cleanup/account-deletion.js'
import { createMailTransport } from '../../src/util/mail.js'
import { generateIdWithinFamily, generateAuthToken } from '../../src/util/token.js'
import { dummyWebsocketApi } from '../../src/websocket/index.js'

describe('functionality', () => {
  describe('account deletion', () => {
    const mail1 = 'user1@a.timelmit.io'
    const mail2 = 'user2@a.timelmit.io'
    const mail3 = 'user3@a.timelmit.io'
    const mail4 = 'user4@a.timelmit.io'
    const mail5 = 'user5@a.timelmit.io'
    const mail6 = 'user6@a.timelmit.io'
    const mail7 = 'user7@a.timelmit.io'
    const mail8 = 'user8@a.timelmit.io'
    const mail9 = 'user9@a.timelmit.io'

    const mailTransport = createMailTransport({ mailTransport: { type: 'test' }})
    const websocket = dummyWebsocketApi

    interface FamilyInfo {
      familyId: string
      deviceAuthToken: string
    }

    interface FamiliesInfo {
      family1: FamilyInfo
      family2: FamilyInfo
      family3: FamilyInfo
    }

    async function createFamily(transaction: SimpleDatabaseTransaction, mails: Array<string>): Promise<FamilyInfo> {
      const { familyId } = await transaction.family.create({ time: 1, fullVersionUntil: 2 })

      for (const mail of mails) {
        await transaction.user.create({
          familyId,
          userId: generateIdWithinFamily(),
          name: 'P ' + mail,
          passwordHash: testPassword1.hash,
          secondPasswordHash: testPassword1.secondHash,
          secondPasswordSalt: testPassword1.secondSalt,
          type: 'parent',
          mail,
          timeZone: 'Europe/Berlin',
        })
      }

      const childUserId = generateIdWithinFamily()
      const deviceAuthToken = generateAuthToken()

      await transaction.user.create({
        familyId,
        userId: childUserId,
        name: 'C',
        passwordHash: '',
        secondPasswordHash: '',
        secondPasswordSalt: '',
        type: 'child',
        mail: '',
        timeZone: 'Europe/Berlin',
      })

      await transaction.device.create({
        familyId,
        time: 1,
        userId: childUserId,
        deviceAuthToken,
        deviceId: generateIdWithinFamily(),
        deviceName: 'D',
        deviceModel: 'M',
        isUserKeptSignedIn: false
      })

      return { familyId, deviceAuthToken }
    }

    async function createFamilies(transaction: SimpleDatabaseTransaction): Promise<FamiliesInfo> {
      return {
        family1: await createFamily(transaction, [ mail1, mail2, mail3 ]),
        family2: await createFamily(transaction, [ mail4, mail5, mail6 ]),
        family3: await createFamily(transaction, [ mail7, mail8, mail9 ]),
      }
    }

    async function checkFamilyExistence(transaction: SimpleDatabaseTransaction, setup: FamiliesInfo, family1: boolean, family2: boolean, family3: boolean) {
      assert.strictEqual(await transaction.family.getFullVersionUntilAndDebtsByFamilyId(setup.family1.familyId) !== null, family1)
      assert.strictEqual(await transaction.family.getFullVersionUntilAndDebtsByFamilyId(setup.family2.familyId) !== null, family2)
      assert.strictEqual(await transaction.family.getFullVersionUntilAndDebtsByFamilyId(setup.family3.familyId) !== null, family3)
    }

    async function checkMailAuthTokenExistence(transaction: SimpleDatabaseTransaction, token: string, exists: boolean) {
      assert.strictEqual(await transaction.authToken.checkAndKeep(token) !== null, exists)
    }

    it('should work', async () => {
      await withTestDatabase(async (database) => {
        const setup = await database.transaction(createFamilies)

        await database.transaction(async (transaction) => {
          await checkFamilyExistence(transaction, setup, true, true, true)
        })

        const mailAuthTokens = await database.transaction(async (transaction) => {
          return [
            await transaction.authToken.create({ time: 1, mail: mail4, locale: 'de' }),
            await transaction.authToken.create({ time: 1, mail: mail5, locale: 'de' }),
            await transaction.authToken.create({ time: 1, mail: mail6, locale: 'de' }),
          ]
        })

        await database.transaction(async (transaction) => {
          for (const mailAuthToken of mailAuthTokens) {
            await checkMailAuthTokenExistence(transaction, mailAuthToken, true)
          }
        })

        await database.transaction(async (transaction) => {
          for (const mailAuthToken of mailAuthTokens) {
            await checkMailAuthTokenExistence(transaction, mailAuthToken, true)
          }
        })

        await deleteAccount({
          request: {
            deviceAuthToken: setup.family2.deviceAuthToken,
            mailAuthTokens,
          },
          database,
          mailTransport,
          websocket,
        })

        await database.transaction(async (transaction) => {
          await checkFamilyExistence(transaction, setup, true, false, true)
        })

        await database.transaction(async (transaction) => {
          for (const mailAuthToken of mailAuthTokens) {
            await checkMailAuthTokenExistence(transaction, mailAuthToken, false)
          }
        })
      })
    })

    it('should fail for an invalid device auth token', async () => {
      await withTestDatabase(async (database) => {
        const setup = await database.transaction(createFamilies)

        const mailAuthTokens = await database.transaction(async (transaction) => {
          return [
            await transaction.authToken.create({ time: 1, mail: mail4, locale: 'de' }),
            await transaction.authToken.create({ time: 1, mail: mail5, locale: 'de' }),
            await transaction.authToken.create({ time: 1, mail: mail6, locale: 'de' }),
          ]
        })

        await assert.rejects(
          deleteAccount({
            request: {
              deviceAuthToken: generateAuthToken(),
              mailAuthTokens,
            },
            database,
            mailTransport,
            websocket,
          }),
          HttpErrors.UnauthorizedError
        )

        await database.transaction(async (transaction) => {
          await checkFamilyExistence(transaction, setup, true, true, true)
        })
      })
    })

    it('should fail in case of missing mail addresses', async () => {
      await withTestDatabase(async (database) => {
        const setup = await database.transaction(createFamilies)

        const mailAuthTokens = await database.transaction(async (transaction) => {
          return [
            await transaction.authToken.create({ time: 1, mail: mail4, locale: 'de' }),
            await transaction.authToken.create({ time: 1, mail: mail6, locale: 'de' }),
          ]
        })

        await assert.rejects(
          deleteAccount({
            request: {
              deviceAuthToken: setup.family2.deviceAuthToken,
              mailAuthTokens,
            },
            database,
            mailTransport,
            websocket,
          }),
          HttpErrors.UnauthorizedError
        )

        await database.transaction(async (transaction) => {
          await checkFamilyExistence(transaction, setup, true, true, true)
        })
      })
    })

    it('should not fail in case of duplicate mail addresses', async () => {
      await withTestDatabase(async (database) => {
        const setup = await database.transaction(createFamilies)

        const mailAuthTokens = await database.transaction(async (transaction) => {
          return [
            await transaction.authToken.create({ time: 1, mail: mail4, locale: 'de' }),
            await transaction.authToken.create({ time: 1, mail: mail5, locale: 'de' }),
            await transaction.authToken.create({ time: 1, mail: mail6, locale: 'de' }),
            await transaction.authToken.create({ time: 1, mail: mail6, locale: 'de' }),
          ]
        })

        await deleteAccount({
          request: {
            deviceAuthToken: setup.family2.deviceAuthToken,
            mailAuthTokens,
          },
          database,
          mailTransport,
          websocket,
        })

        await database.transaction(async (transaction) => {
          await checkFamilyExistence(transaction, setup, true, false, true)
        })
      })
    })

    it('should fail in case of extra mail addresses', async () => {
      await withTestDatabase(async (database) => {
        const setup = await database.transaction(createFamilies)

        const mailAuthTokens = await database.transaction(async (transaction) => {
          return [
            await transaction.authToken.create({ time: 1, mail: mail4, locale: 'de' }),
            await transaction.authToken.create({ time: 1, mail: mail5, locale: 'de' }),
            await transaction.authToken.create({ time: 1, mail: mail6, locale: 'de' }),
            await transaction.authToken.create({ time: 1, mail: mail7, locale: 'de' }),
          ]
        })

        await assert.rejects(
          deleteAccount({
            request: {
              deviceAuthToken: setup.family2.deviceAuthToken,
              mailAuthTokens,
            },
            database,
            mailTransport,
            websocket,
          }),
          HttpErrors.UnauthorizedError
        )

        await database.transaction(async (transaction) => {
          await checkFamilyExistence(transaction, setup, true, true, true)
        })
      })
    })

    it('should fail in case of replacing one mail address by another one', async () => {
      await withTestDatabase(async (database) => {
        const setup = await database.transaction(createFamilies)

        const mailAuthTokens = await database.transaction(async (transaction) => {
          return [
            await transaction.authToken.create({ time: 1, mail: mail4, locale: 'de' }),
            await transaction.authToken.create({ time: 1, mail: mail5, locale: 'de' }),
            await transaction.authToken.create({ time: 1, mail: mail9, locale: 'de' }),
          ]
        })

        await assert.rejects(
          deleteAccount({
            request: {
              deviceAuthToken: setup.family2.deviceAuthToken,
              mailAuthTokens,
            },
            database,
            mailTransport,
            websocket,
          }),
          HttpErrors.UnauthorizedError
        )

        await database.transaction(async (transaction) => {
          await checkFamilyExistence(transaction, setup, true, true, true)
        })
      })
    })
  })
})
