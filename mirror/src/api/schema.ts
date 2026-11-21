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

import { ClientDataStatus } from '../object/clientdatastatus.js'
import { optionalPasswordRegex, optionalSaltRegex } from '../util/password.js'

export interface ClientPushChangesRequest {
  deviceAuthToken: string
  actions: Array<ClientPushChangesRequestAction>
}

export interface ClientPushChangesRequestAction {
  encodedAction: string
  sequenceNumber: number
  integrity: string
  type: 'appLogic' | 'parent' | 'child'
  userId: string
}

export interface ClientPullChangesRequest {
  deviceAuthToken: string
  status: ClientDataStatus
}

export interface MailAuthTokenRequestBody {
  mailAuthToken: string
}

export interface NewDeviceInfo {
  model: string
}

export interface PlaintextParentPassword {
  hash: string
  secondHash: string
  secondSalt: string
}

export interface EncryptableParentPassword {
  hash: string
  secondHash: string
  secondSalt: string
  encrypted?: boolean
}

export const assertPlaintextParentPasswordValid = (password: PlaintextParentPassword) => {
  assertParentPasswordValid({ ...password, encrypted: false })
}

export const assertParentPasswordValid = (password: EncryptableParentPassword) => {
  if (password.hash === '' || password.secondHash === '' || password.secondSalt === '') {
    throw new ParentPasswordValidationException('missing fields at parent password')
  }

  if (!(optionalPasswordRegex.test(password.hash) && optionalSaltRegex.test(password.secondSalt))) {
    throw new ParentPasswordValidationException('invalid parent password')
  }

  if (!password.encrypted && !optionalPasswordRegex.test(password.secondHash)) {
    throw new ParentPasswordValidationException('invalid parent password')
  }
}

export class ParentPasswordValidationException extends Error {}

export interface CreateFamilyByMailTokenRequest {
  mailAuthToken: string
  parentPassword: PlaintextParentPassword
  parentDevice: NewDeviceInfo
  deviceName: string
  timeZone: string
  parentName: string
  clientLevel?: number
}

export interface SignIntoFamilyRequest {
  mailAuthToken: string
  parentDevice: NewDeviceInfo
  deviceName: string
  clientLevel?: number
}

export interface RecoverParentPasswordRequest {
  mailAuthToken: string
  password: PlaintextParentPassword
}

export interface RegisterChildDeviceRequest {
  registerToken: string
  childDevice: NewDeviceInfo
  deviceName: string
  clientLevel?: number
}

export interface CreateRegisterDeviceTokenRequest {
  deviceAuthToken: string
  parentId: string
  parentPasswordSecondHash: string
}

export interface CanDoPurchaseRequest {
  type?: 'googleplay' | 'any'
  deviceAuthToken: string
}

export interface LinkParentMailAddressRequest {
  mailAuthToken: string
  deviceAuthToken: string
  parentUserId: string
  parentPasswordSecondHash: string
}

export interface UpdatePrimaryDeviceRequest {
  action: 'set this device' | 'unset this device'
  currentUserId: string
  authToken: string
}

export interface RemoveDeviceRequest {
  deviceAuthToken: string
  parentUserId: string
  parentPasswordSecondHash: string
  deviceId: string
}

export interface RequestIdentityTokenRequest {
  deviceAuthToken: string
  parentUserId: string
  parentPasswordSecondHash: string
  purpose: 'purchase'
}

export interface RequestWithAuthToken {
  deviceAuthToken: string
}

export interface SendMailLoginCodeRequest {
  mail: string
  locale: string
  deviceAuthToken?: string
}

export interface SignInByMailCodeRequest {
  mailLoginToken: string
  receivedCode: string
}

export interface IdentityTokenCreatePayload {
  purpose: 'purchase'
  familyId: string
  userId: string
  mail: string
}

export type IdentityTokenPayload = IdentityTokenCreatePayload & {
  exp: number
}

export interface DeleteAccountPayload {
  deviceAuthToken: string
  mailAuthTokens: Array<string>
}

export { SerializedParentAction, SerializedChildAction, SerializedAppLogicAction } from '../action/serialization/index.js'
export { ServerDataStatus } from '../object/serverdatastatus.js'
