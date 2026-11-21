import assert from 'assert'
import { describe, it } from 'node:test'

import { withTestDatabase } from '../helper/database.js'
import { generateIdWithinFamily, generateAuthToken } from '../../src/util/token.js'
import { dummyWebsocketApi } from '../../src/websocket/index.js'
import { runWorkersOnce } from '../../src/worker/index.js'

describe('background worker', () => {
  describe('delete old families', () => {
    const month = 1000 * 60 * 60 * 24 * 31
    const websocket = dummyWebsocketApi

    it('should not delete families before premium expires', async () => {
      await withTestDatabase(async (database) => {
        const { family1, family2, family3 } = await database.transaction(async (transaction) => {
          const family1 = await transaction.family.create({ time: 10, fullVersionUntil: month * 20 })
          const family2 = await transaction.family.create({ time: 10, fullVersionUntil: month * 10 })
          const family3 = await transaction.family.create({ time: 10, fullVersionUntil: month * 30 })

          return { family1, family2, family3 }
        })

        await runWorkersOnce({ database, websocket, time: month * 9 })

        await database.transaction(async (transaction) => {
          const reply1 = await transaction.family.getFullVersionUntilAndDebtsByFamilyId(family1.familyId)
          const reply2 = await transaction.family.getFullVersionUntilAndDebtsByFamilyId(family2.familyId)
          const reply3 = await transaction.family.getFullVersionUntilAndDebtsByFamilyId(family3.familyId)

          assert.strictEqual(reply1 !== null, true)
          assert.strictEqual(reply2 !== null, true)
          assert.strictEqual(reply3 !== null, true)
        })
      })
    })

    it('should not delete families shortly after premium expires', async () => {
      await withTestDatabase(async (database) => {
        const { family1, family2, family3 } = await database.transaction(async (transaction) => {
          const family1 = await transaction.family.create({ time: 10, fullVersionUntil: month * 20 })
          const family2 = await transaction.family.create({ time: 10, fullVersionUntil: month * 10 })
          const family3 = await transaction.family.create({ time: 10, fullVersionUntil: month * 30 })

          return { family1, family2, family3 }
        })

        await runWorkersOnce({ database, websocket, time: month * 11 })

        await database.transaction(async (transaction) => {
          const reply1 = await transaction.family.getFullVersionUntilAndDebtsByFamilyId(family1.familyId)
          const reply2 = await transaction.family.getFullVersionUntilAndDebtsByFamilyId(family2.familyId)
          const reply3 = await transaction.family.getFullVersionUntilAndDebtsByFamilyId(family3.familyId)

          assert.strictEqual(reply1 !== null, true)
          assert.strictEqual(reply2 !== null, true)
          assert.strictEqual(reply3 !== null, true)
        })
      })
    })

    it('should delete one family after its premium expires', async () => {
      await withTestDatabase(async (database) => {
        const { family1, family2, family3 } = await database.transaction(async (transaction) => {
          const family1 = await transaction.family.create({ time: 10, fullVersionUntil: month * 20 })
          const family2 = await transaction.family.create({ time: 10, fullVersionUntil: month * 10 })
          const family3 = await transaction.family.create({ time: 10, fullVersionUntil: month * 30 })

          return { family1, family2, family3 }
        })

        await runWorkersOnce({ database, websocket, time: month * 15 })

        await database.transaction(async (transaction) => {
          const reply1 = await transaction.family.getFullVersionUntilAndDebtsByFamilyId(family1.familyId)
          const reply2 = await transaction.family.getFullVersionUntilAndDebtsByFamilyId(family2.familyId)
          const reply3 = await transaction.family.getFullVersionUntilAndDebtsByFamilyId(family3.familyId)

          assert.strictEqual(reply1 !== null, true)
          assert.strictEqual(reply2 !== null, false)
          assert.strictEqual(reply3 !== null, true)
        })
      })
    })

    it('should delete two family after their premium expires', async () => {
      await withTestDatabase(async (database) => {
        const { family1, family2, family3 } = await database.transaction(async (transaction) => {
          const family1 = await transaction.family.create({ time: 10, fullVersionUntil: month * 20 })
          const family2 = await transaction.family.create({ time: 10, fullVersionUntil: month * 10 })
          const family3 = await transaction.family.create({ time: 10, fullVersionUntil: month * 30 })

          return { family1, family2, family3 }
        })

        await runWorkersOnce({ database, websocket, time: month * 25 })

        await database.transaction(async (transaction) => {
          const reply1 = await transaction.family.getFullVersionUntilAndDebtsByFamilyId(family1.familyId)
          const reply2 = await transaction.family.getFullVersionUntilAndDebtsByFamilyId(family2.familyId)
          const reply3 = await transaction.family.getFullVersionUntilAndDebtsByFamilyId(family3.familyId)

          assert.strictEqual(reply1 !== null, false)
          assert.strictEqual(reply2 !== null, false)
          assert.strictEqual(reply3 !== null, true)
        })
      })
    })

    it('should only delete the family after their premium expires if no device was seen recently', async () => {
      await withTestDatabase(async (database) => {
        const deviceAuthToken1 = generateAuthToken()
        const deviceAuthToken2 = generateAuthToken()

        const { family1, family2, family3 } = await database.transaction(async (transaction) => {
          const family1 = await transaction.family.create({ time: 10, fullVersionUntil: month * 20 })
          const family2 = await transaction.family.create({ time: 10, fullVersionUntil: month * 10 })
          const family3 = await transaction.family.create({ time: 10, fullVersionUntil: month * 30 })

          await transaction.device.create({
            familyId: family1.familyId,
            time: 0,
            userId: '',
            deviceAuthToken: deviceAuthToken1,
            deviceId: generateIdWithinFamily(),
            deviceName: 'D1',
            deviceModel: 'SUPER',
            isUserKeptSignedIn: false,
          })

          await transaction.device.create({
            familyId: family2.familyId,
            time: 0,
            userId: '',
            deviceAuthToken: deviceAuthToken2,
            deviceId: generateIdWithinFamily(),
            deviceName: 'D2',
            deviceModel: 'SUPER',
            isUserKeptSignedIn: false,
          })

          return { family1, family2, family3 }
        })

        // should keep both
        await database.transaction(async (transaction) => {
          await transaction.device.updateLastConnectivityByDeviceAuthToken({
            deviceAuthToken: deviceAuthToken1,
            lastConnectivity: month * 49,
          })

          await transaction.device.updateLastConnectivityByDeviceAuthToken({
            deviceAuthToken: deviceAuthToken2,
            lastConnectivity: month * 51, // slightly in the future
          })
        })

        await runWorkersOnce({ database, websocket, time: month * 50 })

        await database.transaction(async (transaction) => {
          const reply1 = await transaction.family.getFullVersionUntilAndDebtsByFamilyId(family1.familyId)
          const reply2 = await transaction.family.getFullVersionUntilAndDebtsByFamilyId(family2.familyId)
          const reply3 = await transaction.family.getFullVersionUntilAndDebtsByFamilyId(family3.familyId)

          assert.strictEqual(reply1 !== null, true, '1.1')
          assert.strictEqual(reply2 !== null, true, '1.2')
          assert.strictEqual(reply3 !== null, false, '1.3')
        })

        // should delete the older one
        await database.transaction(async (transaction) => {
          await transaction.device.updateLastConnectivityByDeviceAuthToken({
            deviceAuthToken: deviceAuthToken1,
            lastConnectivity: month * 55,
          })

          await transaction.device.updateLastConnectivityByDeviceAuthToken({
            deviceAuthToken: deviceAuthToken2,
            lastConnectivity: month * 60,
          })
        })

        await runWorkersOnce({ database, websocket, time: month * 61 })

        await database.transaction(async (transaction) => {
          const reply1 = await transaction.family.getFullVersionUntilAndDebtsByFamilyId(family1.familyId)
          const reply2 = await transaction.family.getFullVersionUntilAndDebtsByFamilyId(family2.familyId)
          const reply3 = await transaction.family.getFullVersionUntilAndDebtsByFamilyId(family3.familyId)

          assert.strictEqual(reply1 !== null, false, '2.1')
          assert.strictEqual(reply2 !== null, true, '2.2')
          assert.strictEqual(reply3 !== null, false, '2.3')
        })
      })
    })

    it('should consider the newest device per family', async () => {
      await withTestDatabase(async (database) => {
        const deviceAuthToken1 = generateAuthToken()
        const deviceAuthToken2 = generateAuthToken()

        const { family1 } = await database.transaction(async (transaction) => {
          const family1 = await transaction.family.create({ time: 10, fullVersionUntil: month * 20 })

          await transaction.device.create({
            familyId: family1.familyId,
            time: 0,
            userId: '',
            deviceAuthToken: deviceAuthToken1,
            deviceId: generateIdWithinFamily(),
            deviceName: 'D1',
            deviceModel: 'SUPER',
            isUserKeptSignedIn: false,
          })

          await transaction.device.create({
            familyId: family1.familyId,
            time: 0,
            userId: '',
            deviceAuthToken: deviceAuthToken2,
            deviceId: generateIdWithinFamily(),
            deviceName: 'D2',
            deviceModel: 'SUPER',
            isUserKeptSignedIn: false,
          })

          return { family1 }
        })

        await database.transaction(async (transaction) => {
          await transaction.device.updateLastConnectivityByDeviceAuthToken({
            deviceAuthToken: deviceAuthToken1,
            lastConnectivity: month * 50,
          })

          await transaction.device.updateLastConnectivityByDeviceAuthToken({
            deviceAuthToken: deviceAuthToken2,
            lastConnectivity: month * 90,
          })
        })

        await runWorkersOnce({ database, websocket, time: month * 90 })

        await database.transaction(async (transaction) => {
          const reply1 = await transaction.family.getFullVersionUntilAndDebtsByFamilyId(family1.familyId)

          assert.strictEqual(reply1 !== null, true)
        })
      })
    })

    it('should keep families with premium and old devices', async () => {
      await withTestDatabase(async (database) => {
        const deviceAuthToken1 = generateAuthToken()
        const deviceAuthToken2 = generateAuthToken()

        const { family1 } = await database.transaction(async (transaction) => {
          const family1 = await transaction.family.create({ time: 10, fullVersionUntil: month * 20 })

          await transaction.device.create({
            familyId: family1.familyId,
            time: 0,
            userId: '',
            deviceAuthToken: deviceAuthToken1,
            deviceId: generateIdWithinFamily(),
            deviceName: 'D1',
            deviceModel: 'SUPER',
            isUserKeptSignedIn: false,
          })

          await transaction.device.create({
            familyId: family1.familyId,
            time: 0,
            userId: '',
            deviceAuthToken: deviceAuthToken2,
            deviceId: generateIdWithinFamily(),
            deviceName: 'D2',
            deviceModel: 'SUPER',
            isUserKeptSignedIn: false,
          })

          return { family1 }
        })

        await database.transaction(async (transaction) => {
          await transaction.device.updateLastConnectivityByDeviceAuthToken({
            deviceAuthToken: deviceAuthToken1,
            lastConnectivity: month * 1,
          })

          await transaction.device.updateLastConnectivityByDeviceAuthToken({
            deviceAuthToken: deviceAuthToken2,
            lastConnectivity: month * 2,
          })
        })

        await runWorkersOnce({ database, websocket, time: month * 18 })

        await database.transaction(async (transaction) => {
          const reply1 = await transaction.family.getFullVersionUntilAndDebtsByFamilyId(family1.familyId)

          assert.strictEqual(reply1 !== null, true)
        })
      })
    })
  })
})
