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

import { createRequire } from 'module';
import { resolve } from 'path'
import { Sequelize } from 'sequelize'
import { Umzug, SequelizeStorage } from 'umzug'

const require = createRequire(import.meta.url)

export const createUmzug = (sequelize: Sequelize, logging: boolean) => (
  new Umzug({
    storage: new SequelizeStorage({ sequelize }),
    migrations: {
      glob: resolve(import.meta.dirname, 'migrations/*.js'),
      resolve: ({ name, path }) => {
        if (!path) throw new Error()

        const migration = require(path)

        return {
          name,
          up: async () => migration.up(sequelize.getQueryInterface(), sequelize),
          down: async () => migration.down(sequelize.getQueryInterface(), sequelize),
        }
      },
    },
    logger: logging ? console : undefined
  })
)
