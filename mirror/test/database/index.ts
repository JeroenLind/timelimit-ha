import assert from 'assert'
import { describe, it } from 'node:test'

import { withTestDatabase, withTestTransaction, withTestDatabaseUrl } from '../helper/database.js'

describe('database', () => {
  it('should be possible to start a temporary database', async () => {
    await withTestDatabaseUrl(async () => {
      // nothing to do
    })
  })

  it('should be possible to run the migrations', async () => {
    await withTestDatabase(async () => {
      // helper function already runs the migrations
    })
  })

  it('should be possible to run a test query', async () => {
    await withTestTransaction(async (transaction) => {
      assert.strictEqual(
        await transaction.device.getFamilyIdByAuthToken('not found'),
        null
      )
    })
  })
})
