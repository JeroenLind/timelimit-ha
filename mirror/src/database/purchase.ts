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
import { createEnumColumn, familyIdColumn, timestampColumn } from './columns.js'
import { SequelizeAttributes } from './types.js'

export interface PurchaseAttributes {
  familyId: string
  service: 'googleplay' | 'directpurchase'
  transactionId: string
  type: 'month' | 'year' | 'unpaid14'
  loggedAt: string
  previousFullVersionEndTime: string
  newFullVersionEndTime: string
}

export type PurchaseModel = Sequelize.Model<PurchaseAttributes> & PurchaseAttributes
export type PurchaseModelStatic = typeof Sequelize.Model & {
  new (values?: object, options?: Sequelize.BuildOptions): PurchaseModel;
}

export const attributes: SequelizeAttributes<PurchaseAttributes> = {
  familyId: { ...familyIdColumn },
  service: {
    ...createEnumColumn(['googleplay', 'directpurchase']),
    primaryKey: true
  },
  transactionId: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  type: createEnumColumn(['month', 'year', 'unpaid14']),
  loggedAt: { ...timestampColumn },
  previousFullVersionEndTime: { ...timestampColumn },
  newFullVersionEndTime: { ...timestampColumn }
}

export const createPurchaseModel = (sequelize: Sequelize.Sequelize): PurchaseModelStatic => sequelize.define('Purchase', attributes) as PurchaseModelStatic
