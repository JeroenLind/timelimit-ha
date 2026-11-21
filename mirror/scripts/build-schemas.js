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

import { resolve } from 'path'
import TJS from 'typescript-json-schema'
import { writeFileSync } from 'fs'
import each from 'lodash/each.js'
import isEqual from 'lodash/isEqual.js'

const randomString = 'WK9fxjlOcM'

const types = [
  'ClientPushChangesRequest',
  'ClientPullChangesRequest',
  'MailAuthTokenRequestBody',
  'CreateFamilyByMailTokenRequest',
  'SignIntoFamilyRequest',
  'RecoverParentPasswordRequest',
  'RegisterChildDeviceRequest',
  'SerializedParentAction',
  'SerializedAppLogicAction',
  'SerializedChildAction',
  'CreateRegisterDeviceTokenRequest',
  'CanDoPurchaseRequest',
  'LinkParentMailAddressRequest',
  'UpdatePrimaryDeviceRequest',
  'RemoveDeviceRequest',
  'RequestIdentityTokenRequest',
  'RequestWithAuthToken',
  'SendMailLoginCodeRequest',
  'SignInByMailCodeRequest',
  'IdentityTokenPayload',
  'DeleteAccountPayload',
]

const docOnlyTypes = [
  'ServerDataStatus'
]

const allTypes = [
  ...types,
  ...docOnlyTypes
]

const settings = {
  required: true,
  noExtraProps: true,
  // otherwise it finds errors in dependencies that we don't care about
  ignoreErrors: true
};

const compilerOptions = {
  strictNullChecks: true,
  lib: ['es2015', 'dom']
}

// optionally pass a base path
const program = TJS.getProgramFromFiles([
  resolve(import.meta.dirname, '../src/api/schema.ts')
], compilerOptions, import.meta.dirname)

const generator = TJS.buildGenerator(program, settings)

let definitions = {}
let schemas = {}
let output = ''

allTypes.forEach((type) => {
  const schema = generator.getSchemaForSymbol(type)

  schemas[type] = schema

  if (schema.definitions) {
    each(schema.definitions, (value, name) => {
      if (!definitions[name]) {
        definitions[name] = value
      } else {
        if (!isEqual(definitions[name], value)) {
          throw new Error('different schemas for ' + name)
        }
      }
    })
  }
})

output += '// tslint:disable \n'
output += 'import { ' + types.join(', ') + ' } from \'./schema.js\'\n'
output += 'import { Ajv } from \'ajv\'\n'
output += 'const ajv = new Ajv()\n'
output += '\n'
output += 'const definitions = ' + JSON.stringify(definitions, null, 2) + '\n\n'

types.forEach((type) => {
  const schema = schemas[type]
  let schemaString

  if (schema.definitions) {
    schemaString = JSON.stringify({
      ...schema,
      definitions: randomString
    }, null, 2).replace(JSON.stringify(randomString), 'definitions')
  } else {
    schemaString = JSON.stringify(schema, null, 2)
  }

  const functionBody = 'ajv.compile(' + schemaString + ')'
  const functionName = 'is' + type.substr(0, 1).toUpperCase() + type.substr(1)

  output += 'export const ' + functionName + ': (value: unknown) => value is ' + type + ' = ' + functionBody + '\n'
})

allTypes.forEach((type) => {
  const schema = schemas[type]

  const schemaToSave = {
    ...addDefinitionTitles(removeUnusedDefinitions(schema)),
    title: type,
    $id: 'https://timelimit.io/' + type
  }

  writeFileSync(
    resolve(import.meta.dirname, '../docs/schema/' + type + '.schema.json'),
    JSON.stringify(schemaToSave, null, 2)
  )
})

writeFileSync(resolve(import.meta.dirname, '../src/api/validator.ts'), output)

function getUsedDefinitions(schema) {
  const usedDefinitions = []

  function addItem(item) {
    if (usedDefinitions.indexOf(item) === -1) {
      usedDefinitions.push(item)

      const definition = schema.definitions[item]

      handleUsedDefinitions(definition)
    }
  }

  function handleUsedDefinitions(obj) {
    if (typeof obj !== 'object') {
      return
    }

    if (typeof obj.$ref === 'string') {
      const value = obj.$ref

      if (value.startsWith('#/definitions/')) {
        addItem(value.substr('#/definitions/'.length))
      }
    }

    each(obj, (value, name) => {
      if (name !== 'definitions') {
        handleUsedDefinitions(value)
      }
    })
  }

  handleUsedDefinitions(schema)

  return usedDefinitions
}

function removeUnusedDefinitions(schema) {
  if (!schema.definitions) {
    return schema
  }

  const result = {
    ...schema,
    definitions: {}
  }

  getUsedDefinitions(schema).forEach((definition) => {
    result.definitions[definition] = schema.definitions[definition]
  })

  return result
}

function addDefinitionTitles(schema) {
  if (!schema.definitions) {
    return schema
  }

  const result = {
    ...schema,
    definitions: {}
  }

  each(schema.definitions, (definition, title) => {
    result.definitions[title] = {
      ...definition,
      title
    }
  })

  return result
}
