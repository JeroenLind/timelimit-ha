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

import { SimpleDatabase } from '../database/simple/index.js'
import { WebsocketApi } from '../websocket/index.js'
import { deleteDeprecatedPurchases } from './delete-deprecated-purchases.js'
import { deleteOldFamilies } from './delete-old-families.js'
import { deleteOldTokens } from './delete-old-tokens.js'
import { deleteOldUsedTimes } from './delete-old-used-times.js'

export interface WorkerCollectionItem {
  label: string
  run: (now: number) => Promise<void>
  initialDelay: number
  interval: number
}

export function initWorkers ({ database, websocket }: {
  database: SimpleDatabase
  websocket: WebsocketApi
}) {
  const workers = getWorkerCollection({ database, websocket })

  for (const worker of workers) {
    const doWorkSafe = () => {
      console.log(worker.label + ' now')

      worker.run(Date.now()).then(() => {
        console.log('finished ' + worker.label)
      }).catch((ex) => {
        console.warn('error ' + worker.label, ex)
      })
    }

    setTimeout(() => {
      doWorkSafe()

      setInterval(() => {
        doWorkSafe()
      }, worker.interval)
    }, worker.initialDelay)
  }
}

export async function runWorkersOnce ({ database, websocket, time }: {
  database: SimpleDatabase
  websocket: WebsocketApi
  time: number
}) {
  const workers = getWorkerCollection({ database, websocket })

  for (const worker of workers) {
    await worker.run(time)
  }
}

export function getWorkerCollection ({ database, websocket }: {
  database: SimpleDatabase
  websocket: WebsocketApi
}): Array<WorkerCollectionItem> {
  return [
    {
      label: 'deleting deprecated purchases',
      run: async (now) => { await deleteDeprecatedPurchases({ database, websocket, now }) },
      initialDelay: 1000 * 60 * 5 /* after 5 minutes */,
      interval: 1000 * 60 * 60 /* every hour */,
    },
    {
      label: 'deleting old families',
      run: async (now) => { await deleteOldFamilies({ database, now }) },
      initialDelay: 1000 * 60 * 23 /* after 23 minutes */,
      interval: 1000 * 60 * 60 /* every 4 hours */,
    },
    {
      label: 'deleting old tokens',
      run: async (now) => { await deleteOldTokens({ database , now}) },
      initialDelay: 1000 * 60 * 7 /* after 7 minutes */,
      interval: 1000 * 60 * 60 /* every hour */,
    },
    {
      label: 'deleting old used times',
      run: async (now) => { await deleteOldUsedTimes({ database, now }) },
      initialDelay: 1000 * 60 * 13 /* after 13 minutes */,
      interval: 1000 * 60 * 30 /* every 30 minutes */,
    },
  ]
}
