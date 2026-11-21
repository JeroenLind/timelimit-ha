import { ChildProcess, execFile } from 'child_process'
import { mkdir, mkdtemp, rm, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { tmpdir } from 'node:os'

import { openDatabaseFromUrl } from '../../src/database/index.js'
import { SimpleDatabase, SimpleDatabaseTransaction, fromLegacy } from '../../src/database/simple/index.js'

export { SimpleDatabase, SimpleDatabaseTransaction }

export const testPassword1 = {
  // actually "password"
  hash: '$2a$12$LdgIZsnhZherEUmvwTyYhOeiILfklleonBDCmnbxB3dnVxeeaYG3C',
  secondHash: '$2a$12$jKUQG/pG87J5pbqRE4NytOQN4U5R.6km2bjxviLzbuis/ZT8JVBO6',
  secondSalt: '$2a$12$jKUQG/pG87J5pbqRE4NytO',
}

export const testPassword2 = {
  // "safe"
  hash: '$2a$12$sq49t2gkVTSOsGcsHU8vIewiMRh2smyI8GCIpX7G7aErYuOtMeaw2',
  secondHash: '$2a$12$i0pBcvWYsjFut3VN8CKDvOXWqiiwXbSglAV618TrUt8gnFwx51Gzm',
  secondSalt: '$2a$12$i0pBcvWYsjFut3VN8CKDvO',
}

export async function withTestTransaction<T>(callback: (transaction: SimpleDatabaseTransaction) => Promise<T>): Promise<T> {
  return await withTestDatabase(async (database) => {
    return await database.transaction(callback)
  })
}

export async function withTestDatabase<T>(callback: (database: SimpleDatabase) => Promise<T>): Promise<T> {
  return await withTestDatabaseUrl(async (databaseUrl) => {
    const db = openDatabaseFromUrl(databaseUrl, { logging: false })

    await db.umzug.up()

    return await callback(fromLegacy(db.database))
  })
}

export async function withTestDatabaseUrl<T>(callback: (databaseUrl: string) => Promise<T>): Promise<T> {
  return await withTempFolder(async (tempDir) => {
    await mkdir(tempDir + '/data')
    await mkdir(tempDir + '/socket')

    await waitForProcess(execFile('pg_ctl', ['init', '-D', tempDir + '/data', '-s', '-o' ,'--locale=en_US.UTF-8 -E UTF8']))

    const oldConfig = await readFile(tempDir + '/data/postgresql.conf')
    const newConfig = oldConfig + "\nunix_socket_directories = '../socket'\nlisten_addresses = '' # do not listen using TCP\n"

    await writeFile(tempDir + '/data/postgresql.conf', newConfig)

    await waitForProcess(execFile('pg_ctl', ['start', '-D', tempDir + '/data']))

    try {
      await waitForProcess(execFile('createuser', ['-h', tempDir + '/socket', 'tldemo']))
      await waitForProcess(execFile('createdb', ['-h', tempDir + '/socket', '--owner', 'tldemo', 'tldemo']))

      const databaseUrl = 'postgres://tldemo:empty@localhost/tldemo?host=' + encodeURIComponent(tempDir + '/socket')

      return await callback(databaseUrl)
    } finally {
      await waitForProcess(execFile('pg_ctl', ['stop', '-D', tempDir + '/data']))
    }
  })
}

async function withTempFolder<T>(callback: (folder: string) => Promise<T>): Promise<T> {
  const folder = await mkdtemp(join(tmpdir(), 'tlserver-test-'))

  try {
    return await callback(folder)
  } finally {
    await rm(folder, { recursive: true })
  }
}

async function waitForProcess(process: ChildProcess) {
  return new Promise<void>((resolve, reject) => {
    process.on('exit', (code) => {
      if (code === 0) resolve()
      else reject('process returned ' + code)
    })

    process.on('error', (ex) => reject(ex))
  })
}
