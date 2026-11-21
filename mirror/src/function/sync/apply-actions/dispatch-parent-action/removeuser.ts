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

import { createHash } from 'crypto'
import HttpErrors from 'http-errors'
import difference from 'lodash/difference.js'
import * as Sequelize from 'sequelize'
import { RemoveUserAction } from '../../../../action/index.js'
import { Cache } from '../cache.js'
import { ApplyActionException } from '../exception/index.js'
import { ApplyActionIntegrityException } from '../exception/integrity.js'
import { MissingUserException } from '../exception/missing-item.js'

export async function dispatchRemoveUser ({ action, cache, parentUserId }: {
  action: RemoveUserAction
  cache: Cache
  parentUserId: string
}) {
  const user = await cache.transaction.legacy.database.user.findOne({
    where: {
      familyId: cache.familyId,
      userId: action.userId
    },
    transaction: cache.transaction.legacy.transaction
  })

  if (!user) {
    throw new MissingUserException()
  }

  if (user.type === 'parent') {
    if (!parentUserId) {
      throw new HttpErrors.InternalServerError()
    }

    if (parentUserId === action.userId) {
      throw new ApplyActionException({ staticMessage: 'users can not delete themself' })
    }

    const expectedIntegrityValue = createHash('sha512').update(
      action.userId + user.secondPasswordHash + 'remove'
    ).digest('hex').substring(0, 16)

    if (expectedIntegrityValue !== action.authentication) {
      throw new ApplyActionIntegrityException({ staticMessage: 'invalid authentication value for removing a user' })
    }

    if (user.mail !== '') {
      const usersWithLinkedMail = await cache.transaction.legacy.database.user.count({
        transaction: cache.transaction.legacy.transaction,
        where: {
          familyId: cache.familyId,
          type: 'parent',
          mail: {
            [Sequelize.Op.not]: ''
          }
        }
      })

      if (usersWithLinkedMail <= 1) {
        throw new ApplyActionException({ staticMessage: 'this user is the last one with a linked mail address' })
      }
    }

    const usersWithLimitLoginCategories = (await cache.transaction.legacy.database.userLimitLoginCategory.findAll({
      transaction: cache.transaction.legacy.transaction,
      where: {
        familyId: cache.familyId
      },
      attributes: ['userId']
    })).map((item) => item.userId)

    const allParentUserIds = (await cache.transaction.legacy.database.user.findAll({
      transaction: cache.transaction.legacy.transaction,
      where: {
        familyId: cache.familyId,
        type: 'parent'
      },
      attributes: ['userId']
    })).map((item) => item.userId)

    const allOtherParentUserIds = allParentUserIds.filter((item) => item !== action.userId)

    if (difference(allOtherParentUserIds, usersWithLimitLoginCategories).length === 0) {
      throw new ApplyActionException({ staticMessage: 'can not delete the last user without limit login category' })
    }
  }

  if (user.type === 'child') {
    const categories = await cache.transaction.legacy.database.category.findAll({
      where: {
        familyId: cache.familyId,
        childId: action.userId
      },
      transaction: cache.transaction.legacy.transaction
    })

    await cache.transaction.legacy.database.categoryApp.destroy({
      where: {
        familyId: cache.familyId,
        categoryId: {
          [Sequelize.Op.in]: categories.map((category) => category.categoryId)
        }
      },
      transaction: cache.transaction.legacy.transaction
    })

    await cache.transaction.legacy.database.timelimitRule.destroy({
      where: {
        familyId: cache.familyId,
        categoryId: {
          [Sequelize.Op.in]: categories.map((category) => category.categoryId)
        }
      },
      transaction: cache.transaction.legacy.transaction
    })

    await cache.transaction.legacy.database.usedTime.destroy({
      where: {
        familyId: cache.familyId,
        categoryId: {
          [Sequelize.Op.in]: categories.map((category) => category.categoryId)
        }
      },
      transaction: cache.transaction.legacy.transaction
    })

    await cache.transaction.legacy.database.category.destroy({
      where: {
        familyId: cache.familyId,
        categoryId: {
          [Sequelize.Op.in]: categories.map((category) => category.categoryId)
        }
      },
      transaction: cache.transaction.legacy.transaction
    })
  }

  const [updatedDevices1] = await cache.transaction.legacy.database.device.update({
    currentUserId: '',
    isUserKeptSignedIn: false
  }, {
    where: {
      familyId: cache.familyId,
      currentUserId: action.userId
    },
    transaction: cache.transaction.legacy.transaction
  })

  const [updatedDevices2] = await cache.transaction.legacy.database.device.update({
    defaultUserId: ''
  }, {
    where: {
      familyId: cache.familyId,
      defaultUserId: action.userId
    },
    transaction: cache.transaction.legacy.transaction
  })

  if (updatedDevices1 > 0 || updatedDevices2 > 0) {
    cache.invalidiateDeviceList = true
  }

  await user.destroy({ transaction: cache.transaction.legacy.transaction })

  cache.invalidiateUserList = true
  cache.incrementTriggeredSyncLevel(2)

  cache.doesUserExist.cache.set(action.userId, false)
  cache.getSecondPasswordHashOfParent.cache.delete(action.userId)
}
