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

import * as Sequelize from 'sequelize'
import { SequelizeAttributes } from './types.js'

export interface ConfigAttributes {
  id: string
  value: string | null
}

export type ConfigModel = Sequelize.Model<ConfigAttributes> & ConfigAttributes
export type ConfigModelStatic = typeof Sequelize.Model & {
  new (values?: object, options?: Sequelize.BuildOptions): ConfigModel;
}

export const attributes: SequelizeAttributes<ConfigAttributes> = {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    },
    primaryKey: true
  },
  value: {
    type: Sequelize.STRING,
    allowNull: false
  }
}

export const createConfigModel = (sequelize: Sequelize.Sequelize): ConfigModelStatic => sequelize.define('Config', attributes) as ConfigModelStatic

export const configItemIds = {
  statusMessage: 'status_message',
  selfTestData: 'self_test_data',
  secondSelfTestData: 'self_test_data_two'
}
