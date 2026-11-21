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

export function getCategoryWithParentCategories (categories: Array<{ categoryId: string, parentCategoryId: string }>, startCategoryId: string): Array<string> {
  const categoryById = new Map<string, { categoryId: string, parentCategoryId: string }>()

  categories.forEach((category) => categoryById.set(category.categoryId, category))

  const startCategory = categoryById.get(startCategoryId)

  if (!startCategory) {
    throw new GetParentCategoriesException('start category not found')
  }

  const categoryIds = [ startCategoryId ]

  let currentCategory = categoryById.get(startCategory.parentCategoryId)

  while (currentCategory !== undefined && categoryIds.indexOf(currentCategory.categoryId) === -1) {
    categoryIds.push(currentCategory.categoryId)

    currentCategory = categoryById.get(currentCategory.parentCategoryId)
  }

  return categoryIds
}

export class GetParentCategoriesException extends Error {}
