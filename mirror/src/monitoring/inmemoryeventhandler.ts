/*
 * server component for the TimeLimit App
 * Copyright (C) 2019 - 2020 Jonas Lochmann
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

import { EventHandler } from './eventhandler.js'

export class InMemoryEventHandler implements EventHandler {
  private counters = new Map<string, number>()
  private maxValues = new Map<string, number>()

  countEvent (name: string) {
    this.counters.set(
      name,
      (this.counters.get(name) || 0) + 1
    )
  }

  reportMax (name: string, value: number) {
    this.maxValues.set(
      name,
      Math.max((this.maxValues.get(name) || 0), value)
    )
  }

  async getValues () {
    return {
      counters: this.buildObject(this.counters),
      maxValues: this.buildObject(this.maxValues)
    }
  }

  async reset () {
    this.counters.clear()
    this.maxValues.clear()
  }

  private buildObject<T> (map: Map<string, T>): {[key: string]: T} {
    const result: {[key: string]: T} = {}

    const keys: Array<string> = []
    map.forEach((_, key) => keys.push(key))

    keys.sort().forEach((key) => {
      const value = map.get(key)

      if (value !== undefined) {
        result[key] = value
      }
    })

    return result
  }
}
