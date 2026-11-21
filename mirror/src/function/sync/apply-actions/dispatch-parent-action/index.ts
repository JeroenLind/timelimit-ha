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

import {
  AddCategoryAppsAction,
  AddCategoryNetworkIdAction,
  AddParentU2fKeyAction,
  AddUserAction,
  ChangeParentPasswordAction,
  CreateCategoryAction,
  CreateTimeLimitRuleAction,
  DeleteCategoryAction,
  DeleteChildTaskAction,
  DeleteTimeLimitRuleAction,
  IgnoreManipulationAction,
  IncrementCategoryExtraTimeAction,
  ParentAction,
  RemoveCategoryAppsAction,
  RemoveParentU2fKeyAction,
  RemoveUserAction,
  ReportU2fLoginAction,
  RenameChildAction,
  ResetCategoryNetworkIdsAction,
  ReviewChildTaskAction,
  SetCategoryExtraTimeAction,
  SetCategoryForUnassignedAppsAction,
  SetChildPasswordAction,
  SetConsiderRebootManipulationAction,
  SetDeviceDefaultUserAction,
  SetDeviceDefaultUserTimeoutAction,
  SetDeviceUserAction,
  SetKeepSignedInAction,
  SetParentCategoryAction,
  SetRelaxPrimaryDeviceAction,
  SetSendDeviceConnected,
  SetUserDisableLimitsUntilAction,
  SetUserTimezoneAction,
  UpdateCategoryBatteryLimitAction,
  UpdateCategoryBlockAllNotificationsAction,
  UpdateCategoryBlockedTimesAction,
  UpdateCategoryDisableLimitsAction,
  UpdateCategoryFlagsAction,
  UpdateCategorySortingAction,
  UpdateCategoryTemporarilyBlockedAction,
  UpdateCategoryTimeWarningsAction,
  UpdateCategoryTitleAction,
  UpdateChildTaskAction,
  UpdateDeviceNameAction,
  UpdateEnableActivityLevelBlockingAction,
  UpdateNetworkTimeVerificationAction,
  UpdateParentNotificationFlagsAction,
  UpdateTimelimitRuleAction,
  UpdateUserFlagsAction,
  UpdateUserLimitLoginCategory,
  UpdateUserLimitLoginPreBlockDuration
} from '../../../../action/index.js'
import { Cache } from '../cache.js'
import { ActionObjectTypeNotHandledException } from '../exception/illegal-state.js'
import { ActionNotSupportedBySelfLimitationException } from '../exception/self-limit.js'
import { AuthenticationMethod } from '../types.js'
import { dispatchAddCategoryApps } from './addcategoryapps.js'
import { dispatchAddCategoryNetworkId } from './addcategorynetworkid.js'
import { dispatchAddU2f } from './addu2fkey.js'
import { dispatchAddUser } from './adduser.js'
import { dispatchChangeParentPassword } from './changeparentpassword.js'
import { dispatchCreateCategory } from './createcategory.js'
import { dispatchCreateTimeLimitRule } from './createtimelimitrule.js'
import { dispatchDeleteCategory } from './deletecategory.js'
import { dispatchDeleteChildTaskAction } from './deletechildtaskaction.js'
import { dispatchDeleteTimeLimitRule } from './deletetimelimitrule.js'
import { dispatchIgnoreManipulation } from './ignoremanipulation.js'
import { dispatchIncrementCategoryExtraTime } from './incrementcategoryextratime.js'
import { dispatchRemoveCategoryApps } from './removecategoryapps.js'
import { dispatchRemoveU2f } from './removeu2fkey.js'
import { dispatchRemoveUser } from './removeuser.js'
import { dispatchReportU2fLogin } from './reportu2flogin.js'
import { dispatchRenameChild } from './renamechild.js'
import { dispatchResetCategoryNetworkIds } from './resetcategorynetworkids.js'
import { dispatchReviewChildTaskAction } from './reviewchildtaskaction.js'
import { dispatchSetCategoryExtraTime } from './setcategoryextratime.js'
import { dispatchSetCategoryForUnassignedApps } from './setcategoryforunassignedapps.js'
import { dispatchSetChildPassword } from './setchildpassword.js'
import { dispatchSetConsiderRebootManipulation } from './setconsiderrebootmanipulation.js'
import { dispatchSetDeviceDefaultUser } from './setdevicedefaultuser.js'
import { dispatchSetDeviceDefaultUserTimeout } from './setdevicedefaultusertimeout.js'
import { dispatchSetDeviceUser } from './setdeviceuser.js'
import { dispatchSetKeepSignedIn } from './setkeepsignedin.js'
import { dispatchSetParentCategory } from './setparentcategory.js'
import { dispatchSetRelaxPrimaryDevice } from './setrelaxprimarydevice.js'
import { dispatchSetSendDeviceConnected } from './setsenddeviceconnected.js'
import { dispatchUserSetDisableLimitsUntil } from './setuserdisablelmitsuntil.js'
import { dispatchSetUserTimezone } from './setusertimezone.js'
import { dispatchUpdateCategoryBatteryLimit } from './updatecategorybatterylimit.js'
import { dispatchUpdateCategoryBlockAllNotifications } from './updatecategoryblockallnotifications.js'
import { dispatchUpdateCategoryBlockedTimes } from './updatecategoryblockedtimes.js'
import { dispatchUpdateCategoryDisableLimits } from './updatecategorydisablelimits.js'
import { dispatchUpdateCategoryFlagsAction } from './updatecategoryflags.js'
import { dispatchUpdateCategorySorting } from './updatecategorysorting.js'
import { dispatchUpdateCategoryTemporarilyBlocked } from './updatecategorytemporarilyblocked.js'
import { dispatchUpdateCategoryTimeWarnings } from './updatecategorytimewarnings.js'
import { dispatchUpdateCategoryTitle } from './updatecategorytitle.js'
import { dispatchUpdateChildTaskAction } from './updatechildtaskaction.js'
import { dispatchUpdateDeviceName } from './updatedevicename.js'
import { dispatchUpdateEnableActivityLevelBlocking } from './updateenableactivitylevelblocking.js'
import { dispatchUpdateNetworkTimeVerification } from './updatenetworktimeverification.js'
import { dispatchUpdateParentNotificationFlags } from './updateparentnotificationflags.js'
import { dispatchUpdateTimelimitRule } from './updatetimelimitrule.js'
import { dispatchUpdateUserFlagsAction } from './updateuserflags.js'
import { dispatchUpdateUserLimitLoginCategoryAction } from './updateuserlimitlogincategory.js'
import { dispatchUpdateUserLimitPreBlockDuration } from './updateuserlimitloginpreblockduration.js'

export const dispatchParentAction = async ({
  action, cache, parentUserId, sourceDeviceId,
  fromChildSelfLimitAddChildUserId, authentication
}: {
  action: ParentAction
  cache: Cache
  parentUserId: string
  sourceDeviceId: string | null
  fromChildSelfLimitAddChildUserId: string | null
  authentication: AuthenticationMethod
}) => {
  if (action instanceof AddCategoryAppsAction) {
    return dispatchAddCategoryApps({ action, cache, fromChildSelfLimitAddChildUserId })
  } else if (action instanceof CreateCategoryAction) {
    return dispatchCreateCategory({ action, cache, fromChildSelfLimitAddChildUserId })
  } else if (action instanceof CreateTimeLimitRuleAction) {
    return dispatchCreateTimeLimitRule({ action, cache, fromChildSelfLimitAddChildUserId })
  } else if (action instanceof UpdateCategoryBlockAllNotificationsAction) {
    return dispatchUpdateCategoryBlockAllNotifications({ action, cache, fromChildSelfLimitAddChildUserId })
  } else if (action instanceof SetParentCategoryAction) {
    return dispatchSetParentCategory({ action, cache, fromChildSelfLimitAddChildUserId })
  } else if (action instanceof UpdateCategoryTemporarilyBlockedAction) {
    return dispatchUpdateCategoryTemporarilyBlocked({ action, cache, fromChildSelfLimitAddChildUserId })
  } else if (action instanceof UpdateCategoryBlockedTimesAction) {
    return dispatchUpdateCategoryBlockedTimes({ action, cache, fromChildSelfLimitAddChildUserId })
  } else if (action instanceof UpdateCategoryDisableLimitsAction) {
    return dispatchUpdateCategoryDisableLimits({ action, cache, fromChildSelfLimitAddChildUserId })
  } else if (action instanceof UpdateTimelimitRuleAction) {
    return dispatchUpdateTimelimitRule({ action, cache, fromChildSelfLimitAddChildUserId })
  }

  if (fromChildSelfLimitAddChildUserId !== null) {
    throw new ActionNotSupportedBySelfLimitationException()
  } else {
    if (action instanceof AddCategoryNetworkIdAction) {
      return dispatchAddCategoryNetworkId({ action, cache })
    } else if (action instanceof AddParentU2fKeyAction) {
      return dispatchAddU2f({ action, cache, parentUserId })
    } else if (action instanceof AddUserAction) {
      return dispatchAddUser({ action, cache })
    } else if (action instanceof RemoveCategoryAppsAction) {
      return dispatchRemoveCategoryApps({ action, cache })
    } else if (action instanceof RemoveParentU2fKeyAction) {
      return dispatchRemoveU2f({ action, cache, parentUserId, authentication })
    } else if (action instanceof DeleteCategoryAction) {
      return dispatchDeleteCategory({ action, cache })
    } else if (action instanceof UpdateCategoryTitleAction) {
      return dispatchUpdateCategoryTitle({ action, cache })
    } else if (action instanceof SetCategoryExtraTimeAction) {
      return dispatchSetCategoryExtraTime({ action, cache })
    } else if (action instanceof SetCategoryForUnassignedAppsAction) {
      return dispatchSetCategoryForUnassignedApps({ action, cache })
    } else if (action instanceof SetChildPasswordAction) {
      return dispatchSetChildPassword({ action, cache })
    } else if (action instanceof SetConsiderRebootManipulationAction) {
      return dispatchSetConsiderRebootManipulation({ action, cache })
    } else if (action instanceof SetDeviceDefaultUserAction) {
      return dispatchSetDeviceDefaultUser({ action, cache })
    } else if (action instanceof SetDeviceDefaultUserTimeoutAction) {
      return dispatchSetDeviceDefaultUserTimeout({ action, cache })
    } else if (action instanceof SetDeviceUserAction) {
      return dispatchSetDeviceUser({ action, cache })
    } else if (action instanceof SetKeepSignedInAction) {
      return dispatchSetKeepSignedIn({ action, cache, parentUserId })
    } else if (action instanceof SetRelaxPrimaryDeviceAction) {
      return dispatchSetRelaxPrimaryDevice({ action, cache })
    } else if (action instanceof SetSendDeviceConnected) {
      return dispatchSetSendDeviceConnected({ action, cache, sourceDeviceId })
    } else if (action instanceof SetUserDisableLimitsUntilAction) {
      return dispatchUserSetDisableLimitsUntil({ action, cache })
    } else if (action instanceof SetUserTimezoneAction) {
      return dispatchSetUserTimezone({ action, cache })
    } else if (action instanceof UpdateCategoryBatteryLimitAction) {
      return dispatchUpdateCategoryBatteryLimit({ action, cache })
    } else if (action instanceof UpdateCategoryFlagsAction) {
      return dispatchUpdateCategoryFlagsAction({ action, cache })
    } else if (action instanceof UpdateCategorySortingAction) {
      return dispatchUpdateCategorySorting({ action, cache })
    } else if (action instanceof IncrementCategoryExtraTimeAction) {
      return dispatchIncrementCategoryExtraTime({ action, cache })
    } else if (action instanceof DeleteTimeLimitRuleAction) {
      return dispatchDeleteTimeLimitRule({ action, cache })
    } else if (action instanceof UpdateDeviceNameAction) {
      return dispatchUpdateDeviceName({ action, cache })
    } else if (action instanceof UpdateEnableActivityLevelBlockingAction) {
      return dispatchUpdateEnableActivityLevelBlocking({ action, cache })
    } else if (action instanceof UpdateNetworkTimeVerificationAction) {
      return dispatchUpdateNetworkTimeVerification({ action, cache })
    } else if (action instanceof UpdateParentNotificationFlagsAction) {
      return dispatchUpdateParentNotificationFlags({ action, cache })
    } else if (action instanceof RemoveUserAction) {
      return dispatchRemoveUser({ action, cache, parentUserId })
    } else if (action instanceof ReportU2fLoginAction) {
      return dispatchReportU2fLogin({ action, cache, authentication })
    } else if (action instanceof ResetCategoryNetworkIdsAction) {
      return dispatchResetCategoryNetworkIds({ action, cache })
    } else if (action instanceof RenameChildAction) {
      return dispatchRenameChild({ action, cache })
    } else if (action instanceof ChangeParentPasswordAction) {
      return dispatchChangeParentPassword({ action, cache })
    } else if (action instanceof IgnoreManipulationAction) {
      return dispatchIgnoreManipulation({ action, cache })
    } else if (action instanceof UpdateCategoryTimeWarningsAction) {
      return dispatchUpdateCategoryTimeWarnings({ action, cache })
    } else if (action instanceof UpdateUserFlagsAction) {
      return dispatchUpdateUserFlagsAction({ action, cache })
    } else if (action instanceof UpdateUserLimitLoginCategory) {
      return dispatchUpdateUserLimitLoginCategoryAction({ action, cache, parentUserId })
    } else if (action instanceof DeleteChildTaskAction) {
      await dispatchDeleteChildTaskAction({ action, cache })
    } else if (action instanceof ReviewChildTaskAction) {
      await dispatchReviewChildTaskAction({ action, cache })
    } else if (action instanceof UpdateChildTaskAction) {
      await dispatchUpdateChildTaskAction({ action, cache })
    } else if (action instanceof UpdateUserLimitLoginPreBlockDuration) {
      await dispatchUpdateUserLimitPreBlockDuration({ action, cache, parentUserId })
    } else {
      throw new ActionObjectTypeNotHandledException()
    }
  }
}
