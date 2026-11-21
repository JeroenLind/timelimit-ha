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

import { ParentAction } from './basetypes.js'
import { assertIdWithinFamily, assertSafeInteger, throwOutOfRange } from './meta/util.js'

const actionType = 'UpdateCategoryBatteryLimitAction'

export class UpdateCategoryBatteryLimitAction extends ParentAction {
  readonly categoryId: string
  readonly chargeLimit?: number
  readonly mobileLimit?: number

  constructor ({ categoryId, chargeLimit, mobileLimit }: {
    categoryId: string
    chargeLimit?: number
    mobileLimit?: number
  }) {
    super()

    assertIdWithinFamily({ actionType, field: 'categoryId', value: categoryId })

    if (chargeLimit !== undefined) {
      assertSafeInteger({ actionType, field: 'chargeLimit', value: chargeLimit })

      if (chargeLimit < 0 || chargeLimit > 100) {
        throwOutOfRange({ actionType, field: 'chargeLimit', value: chargeLimit })
      }
    }

    if (mobileLimit !== undefined) {
      assertSafeInteger({ actionType, field: 'mobileLimit', value: mobileLimit })

      if (mobileLimit < 0 || mobileLimit > 100) {
        throwOutOfRange({ actionType, field: 'mobileLimit', value: mobileLimit })
      }
    }

    this.categoryId = categoryId
    this.chargeLimit = chargeLimit
    this.mobileLimit = mobileLimit
  }

  static parse = ({ categoryId, chargeLimit, mobileLimit }: SerializedUpdateCategoryBatteryLimitAction) => (
    new UpdateCategoryBatteryLimitAction({ categoryId, chargeLimit, mobileLimit })
  )
}

export interface SerializedUpdateCategoryBatteryLimitAction {
  type: 'UPDATE_CATEGORY_BATTERY_LIMIT'
  categoryId: string
  chargeLimit?: number
  mobileLimit?: number
}
