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

import uniqBy from 'lodash/uniqBy.js'
import * as Sequelize from 'sequelize'
import { SimpleDatabase } from '../database/simple/index.js'
import { generateVersionId } from '../util/token.js'

export async function deleteOldUsedTimes ({ database, now }: {
  database: SimpleDatabase
  now: number
}) {
  await database.transaction(async (transaction) => {
    // get matching categories
    const categoriesToCleanUpOne = (await transaction.legacy.database.usedTime.findAll({
      transaction: transaction.legacy.transaction,
      where: {
        lastUpdate: {
          [Sequelize.Op.lt]: (now - 1000 * 60 * 60 * 24 * 10 /* 10 days */).toString()
        }
      },
      attributes: [
        'familyId',
        'categoryId'
      ],
      limit: 1000,
      order: [['lastUpdate', 'ASC']]
    })).map((item) => ({
      familyId: item.familyId,
      categoryId: item.categoryId
    }))

    const categoriesToCleanUpTwo = (await transaction.legacy.database.sessionDuration.findAll({
      transaction: transaction.legacy.transaction,
      where: {
        roundedLastUpdate: {
          [Sequelize.Op.lt]: (now - 1000 * 60 * 60 * 24 * 3 /* 3 days */).toString()
        }
      },
      attributes: [
        'familyId',
        'categoryId'
      ],
      limit: 1000,
      order: [['roundedLastUpdate', 'ASC']]
    })).map((item) => ({
      familyId: item.familyId,
      categoryId: item.categoryId
    }))

    const categoriesToCleanUp = [ ...categoriesToCleanUpOne, ...categoriesToCleanUpTwo ]

    const distinctCategoriesToCleanUp = uniqBy(categoriesToCleanUp, (item) => item.familyId + '_' + item.categoryId)

    if (distinctCategoriesToCleanUp.length > 0) {
      // delete old items of matching categories
      await transaction.legacy.database.usedTime.destroy({
        transaction: transaction.legacy.transaction,
        where: {
          [Sequelize.Op.or]: (
            distinctCategoriesToCleanUp
          ),
          lastUpdate: {
            [Sequelize.Op.lt]: (now - 1000 * 60 * 60 * 24 * 10 /* 10 days */).toString()
          }
        }
      })

      await transaction.legacy.database.sessionDuration.destroy({
        transaction: transaction.legacy.transaction,
        where: {
          [Sequelize.Op.or]: (
            distinctCategoriesToCleanUp
          ),
          roundedLastUpdate: {
            [Sequelize.Op.lt]: (now - 1000 * 60 * 60 * 24 * 3 /* 3 days */).toString()
          }
        }
      })

      // invalidiate categories
      await transaction.legacy.database.category.update({
        usedTimesVersion: generateVersionId()
      }, {
        transaction: transaction.legacy.transaction,
        where: {
          [Sequelize.Op.or]: (
            distinctCategoriesToCleanUp
          )
        }
      })
    }
  })
}
