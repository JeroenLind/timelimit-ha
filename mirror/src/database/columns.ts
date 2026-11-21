/*
 * server component for the TimeLimit App
 * Copyright (C) 2019 Jonas Lochmann
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

export const familyIdColumn: Sequelize.ModelAttributeColumnOptions = {
  type: Sequelize.STRING(10),
  allowNull: false,
  validate: {
    notEmpty: true,
    is: /^[a-zA-Z0-9]{10}$/
  }
}

export const idWithinFamilyColumn: Sequelize.ModelAttributeColumnOptions = {
  type: Sequelize.STRING(6),
  allowNull: false,
  validate: {
    notEmpty: true,
    is: /^[a-zA-Z0-9]{6}$/
  }
}

export const optionalIdWithinFamilyColumn: Sequelize.ModelAttributeColumnOptions = {
  type: Sequelize.STRING(6),
  allowNull: false,
  validate: {
    is: /^([a-zA-Z0-9]{6})?$/
  }
}

export const versionColumn: Sequelize.ModelAttributeColumnOptions = {
  type: Sequelize.STRING(4),
  allowNull: false,
  validate: {
    notEmpty: true,
    is: /^[a-zA-Z0-9]{4}$/
  }
}
export const labelColumn: Sequelize.ModelAttributeColumnOptions = {
  type: Sequelize.STRING,
  allowNull: false,
  validate: {
    notEmpty: true
  }
}

export const optionalLabelColumn: Sequelize.ModelAttributeColumnOptions = {
  type: Sequelize.STRING,
  allowNull: false
}

export const createEnumColumn = (possibleValues: Array<string>): Sequelize.ModelAttributeColumnOptions => ({
  type: Sequelize.STRING,
  allowNull: false,
  validate: {
    isIn: [possibleValues],
    notEmpty: true
  }
})

// warning: this results in an string field
export const timestampColumn: Sequelize.ModelAttributeColumnOptions = {
  type: Sequelize.BIGINT,
  allowNull: false,
  validate: {
    min: 0
  }
}

export const booleanColumn: Sequelize.ModelAttributeColumnOptions = {
  type: Sequelize.BOOLEAN,
  allowNull: false
}

export const authTokenColumn: Sequelize.ModelAttributeColumnOptions = {
  type: Sequelize.STRING(32),
  allowNull: false,
  validate: {
    notEmpty: true,
    is: /^[a-zA-Z0-9]{32}$/
  }
}
