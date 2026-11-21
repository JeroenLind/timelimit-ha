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

import { anonymizedNetworkIdLength } from '../database/categorynetworkid.js'
import { ParentAction } from './basetypes.js'
import { InvalidActionParameterException } from './meta/exception.js'
import { assertHexString, assertIdWithinFamily } from './meta/util.js'

const actionType = 'AddCategoryNetworkIdAction'

export class AddCategoryNetworkIdAction extends ParentAction {
  readonly categoryId: string
  readonly itemId: string
  readonly hashedNetworkId: string

  constructor ({ categoryId, itemId, hashedNetworkId }: {
    categoryId: string
    itemId: string
    hashedNetworkId: string
  }) {
    super()

    assertIdWithinFamily({ actionType, field: 'categoryId', value: categoryId })
    assertIdWithinFamily({ actionType, field: 'itemId', value: itemId })
    assertHexString({ actionType, field: 'hashedNetworkId', value: hashedNetworkId })

    if (hashedNetworkId.length !== anonymizedNetworkIdLength) {
      throw new InvalidActionParameterException({
        actionType,
        staticMessage: 'wrong network id length'
      })
    }

    this.categoryId = categoryId
    this.itemId = itemId
    this.hashedNetworkId = hashedNetworkId
  }

  static parse = ({ categoryId, itemId, hashedNetworkId }: SerializedAddCategoryNetworkIdAction) => (
    new AddCategoryNetworkIdAction({
      categoryId,
      itemId,
      hashedNetworkId
    })
  )
}

export interface SerializedAddCategoryNetworkIdAction {
  type: 'ADD_CATEGORY_NETWORK_ID'
  categoryId: string
  itemId: string
  hashedNetworkId: string
}
