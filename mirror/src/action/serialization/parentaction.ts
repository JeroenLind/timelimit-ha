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

import { AddCategoryAppsAction, SerializedAddCategoryAppsAction } from '../addcategoryapps.js'
import { AddCategoryNetworkIdAction, SerializedAddCategoryNetworkIdAction } from '../addcategorynetworkid.js'
import { AddParentU2fKeyAction, SerializedAddParentU2fKeyAction } from '../addu2fkey.js'
import { AddUserAction, SerializedAddUserAction } from '../adduser.js'
import { ParentAction } from '../basetypes.js'
import { ChangeParentPasswordAction, SerializedChangeParentPasswordAction } from '../changeparentpassword.js'
import { CreateCategoryAction, SerializedCreateCategoryAction } from '../createcategory.js'
import { CreateTimeLimitRuleAction, SerializedCreateTimelimtRuleAction } from '../createtimelimitrule.js'
import { DeleteCategoryAction, SerializedDeleteCategoryAction } from '../deletecategory.js'
import { DeleteChildTaskAction, SerializedDeleteChildTaskAction } from '../deletechildtaskaction.js'
import { DeleteTimeLimitRuleAction, SerializedDeleteTimeLimitRuleAction } from '../deletetimelimitrule.js'
import { IgnoreManipulationAction, SerializedIgnoreManipulationAction } from '../ignoremanipulation.js'
import { IncrementCategoryExtraTimeAction, SerializedIncrementCategoryExtraTimeAction } from '../incrementcategoryextratime.js'
import { ReportU2fLoginAction, SerializedReportU2fLoginAction } from '../reportu2flogin.js'
import { UnknownActionTypeException } from '../meta/exception.js'
import { RemoveCategoryAppsAction, SerializedRemoveCategoryAppsAction } from '../removecategoryapps.js'
import { RemoveParentU2fKeyAction, SerializedRemoveParentU2fKeyAction } from '../removeu2fkey.js'
import { RemoveUserAction, SerializedRemoveUserAction } from '../removeuser.js'
import { RenameChildAction, SerializedRenameChildAction } from '../renamechild.js'
import { ResetCategoryNetworkIdsAction, SerializeResetCategoryNetworkIdsAction } from '../resetcategorynetworkids.js'
import { ReviewChildTaskAction, SerializedReviewChildTaskAction } from '../reviewchildtaskaction.js'
import { SerializedSetCategoryExtraTimeAction, SetCategoryExtraTimeAction } from '../setcategoryextratime.js'
import { SerializedSetCategoryForUnassignedAppsAction, SetCategoryForUnassignedAppsAction } from '../setcategoryforunassignedapps.js'
import { SerializedSetChildPasswordAction, SetChildPasswordAction } from '../setchildpassword.js'
import { SerializedSetConsiderRebootManipulationAction, SetConsiderRebootManipulationAction } from '../setconsiderrebootmanipulation.js'
import { SerializedSetDeviceDefaultUserAction, SetDeviceDefaultUserAction } from '../setdevicedefaultuser.js'
import { SerializedSetDeviceDefaultUserTimeoutAction, SetDeviceDefaultUserTimeoutAction } from '../setdevicedefaultusertimeout.js'
import { SerializedSetDeviceUserAction, SetDeviceUserAction } from '../setdeviceuser.js'
import { SerializedSetKeepSignedInAction, SetKeepSignedInAction } from '../setkeepsignedin.js'
import { SerializedSetParentCategoryAction, SetParentCategoryAction } from '../setparentcategory.js'
import { SerializedSetRelaxPrimaryDeviceAction, SetRelaxPrimaryDeviceAction } from '../setrelaxprimarydevice.js'
import { SerializedSetSendDeviceConnected, SetSendDeviceConnected } from '../setsenddeviceconnected.js'
import { SerializedSetUserDisableLimitsUntilAction, SetUserDisableLimitsUntilAction } from '../setuserdisablelimitsuntil.js'
import { SerializedSetUserTimezoneAction, SetUserTimezoneAction } from '../setusertimezone.js'
import { SerializedUpdateCategoryBatteryLimitAction, UpdateCategoryBatteryLimitAction } from '../updatecategorybatterylimit.js'
import { SerializedUpdateCategoryBlockAllNotificationsAction, UpdateCategoryBlockAllNotificationsAction } from '../updatecategoryblockallnotifications.js'
import { SerializedUpdateCategoryBlockedTimesAction, UpdateCategoryBlockedTimesAction } from '../updatecategoryblockedtimes.js'
import { SerializedUpdatCategoryDisableLimitsAction, UpdateCategoryDisableLimitsAction } from '../updatecategorydisablelimits.js'
import { SerializedUpdateCategoryFlagsAction, UpdateCategoryFlagsAction } from '../updatecategoryflags.js'
import { SerializedUpdateCategorySortingAction, UpdateCategorySortingAction } from '../updatecategorysorting.js'
import { SerializedUpdateCategoryTemporarilyBlockedAction, UpdateCategoryTemporarilyBlockedAction } from '../updatecategorytemporarilyblocked.js'
import { SerializedUpdateCategoryTimeWarningsAction, UpdateCategoryTimeWarningsAction } from '../updatecategorytimewarnings.js'
import { SerializedUpdateCategoryTitleAction, UpdateCategoryTitleAction } from '../updatecategorytitle.js'
import { SerializedUpdateChildTaskAction, UpdateChildTaskAction } from '../updatechildtaskaction.js'
import { SerializedUpdateDeviceNameAction, UpdateDeviceNameAction } from '../updatedevicename.js'
import { SerializedUpdateEnableActivityLevelBlockingAction, UpdateEnableActivityLevelBlockingAction } from '../updateenableactivitylevelblocking.js'
import { SerialiizedUpdateNetworkTimeVerificationAction, UpdateNetworkTimeVerificationAction } from '../updatenetworktimeverification.js'
import { SerializedUpdateParentNotificationFlagsAction, UpdateParentNotificationFlagsAction } from '../updateparentnotificationflags.js'
import { SerializedUpdateTimelimitRuleAction, UpdateTimelimitRuleAction } from '../updatetimelimitrule.js'
import { SerializedUpdateUserFlagsAction, UpdateUserFlagsAction } from '../updateuserflags.js'
import { SerializedUpdateUserLimitLoginCategory, UpdateUserLimitLoginCategory } from '../updateuserlimitlogincategory.js'
import { SerializedUpdateUserLimitLoginPreBlockDuration, UpdateUserLimitLoginPreBlockDuration } from '../updateuserlimitloginpreblockduration.js'

export type SerializedParentAction =
  SerializedAddCategoryAppsAction |
  SerializedAddCategoryNetworkIdAction |
  SerializedAddParentU2fKeyAction |
  SerializedAddUserAction |
  SerializedChangeParentPasswordAction |
  SerializedCreateCategoryAction |
  SerializedCreateTimelimtRuleAction |
  SerializedDeleteCategoryAction |
  SerializedDeleteChildTaskAction |
  SerializedDeleteTimeLimitRuleAction |
  SerializedIgnoreManipulationAction |
  SerializedIncrementCategoryExtraTimeAction |
  SerializedReportU2fLoginAction |
  SerializedRemoveCategoryAppsAction |
  SerializedRemoveParentU2fKeyAction |
  SerializedRemoveUserAction |
  SerializedRenameChildAction |
  SerializeResetCategoryNetworkIdsAction |
  SerializedReviewChildTaskAction |
  SerializedSetCategoryForUnassignedAppsAction |
  SerializedSetChildPasswordAction |
  SerializedSetConsiderRebootManipulationAction |
  SerializedSetDeviceDefaultUserAction |
  SerializedSetDeviceDefaultUserTimeoutAction |
  SerializedSetCategoryExtraTimeAction |
  SerializedSetDeviceUserAction |
  SerializedSetKeepSignedInAction |
  SerializedSetParentCategoryAction |
  SerializedSetRelaxPrimaryDeviceAction |
  SerializedSetSendDeviceConnected |
  SerializedSetUserDisableLimitsUntilAction |
  SerializedSetUserTimezoneAction |
  SerializedUpdateCategoryBatteryLimitAction |
  SerializedUpdateCategoryBlockAllNotificationsAction |
  SerializedUpdateCategoryBlockedTimesAction |
  SerializedUpdatCategoryDisableLimitsAction |
  SerializedUpdateCategoryFlagsAction |
  SerializedUpdateCategorySortingAction |
  SerializedUpdateCategoryTemporarilyBlockedAction |
  SerializedUpdateCategoryTimeWarningsAction |
  SerializedUpdateCategoryTitleAction |
  SerializedUpdateChildTaskAction |
  SerializedUpdateDeviceNameAction |
  SerializedUpdateEnableActivityLevelBlockingAction |
  SerialiizedUpdateNetworkTimeVerificationAction |
  SerializedUpdateParentNotificationFlagsAction |
  SerializedUpdateTimelimitRuleAction |
  SerializedUpdateUserFlagsAction |
  SerializedUpdateUserLimitLoginCategory |
  SerializedUpdateUserLimitLoginPreBlockDuration

export const parseParentAction = (action: SerializedParentAction): ParentAction => {
  if (action.type === 'ADD_CATEGORY_APPS') {
    return AddCategoryAppsAction.parse(action)
  } else if (action.type === 'ADD_CATEGORY_NETWORK_ID') {
    return AddCategoryNetworkIdAction.parse(action)
  } else if (action.type === 'ADD_PARENT_U2F') {
    return AddParentU2fKeyAction.parse(action)
  } else if (action.type === 'ADD_USER') {
    return AddUserAction.parse(action)
  } else if (action.type === 'CHANGE_PARENT_PASSWORD') {
    return ChangeParentPasswordAction.parse(action)
  } else if (action.type === 'CREATE_CATEGORY') {
    return CreateCategoryAction.parse(action)
  } else if (action.type === 'CREATE_TIMELIMIT_RULE') {
    return CreateTimeLimitRuleAction.parse(action)
  } else if (action.type === 'DELETE_CATEGORY') {
    return DeleteCategoryAction.parse(action)
  } else if (action.type === 'DELETE_CHILD_TASK') {
    return DeleteChildTaskAction.parse(action)
  } else if (action.type === 'DELETE_TIMELIMIT_RULE') {
    return DeleteTimeLimitRuleAction.parse(action)
  } else if (action.type === 'IGNORE_MANIPULATION') {
    return IgnoreManipulationAction.parse(action)
  } else if (action.type === 'INCREMENT_CATEGORY_EXTRATIME') {
    return IncrementCategoryExtraTimeAction.parse(action)
  } else if (action.type === 'REPORT_U2F_LOGIN') {
    return ReportU2fLoginAction.instance
  } else if (action.type === 'REMOVE_CATEGORY_APPS') {
    return RemoveCategoryAppsAction.parse(action)
  } else if (action.type === 'REMOVE_PARENT_U2F') {
    return RemoveParentU2fKeyAction.parse(action)
  } else if (action.type === 'REMOVE_USER') {
    return RemoveUserAction.parse(action)
  } else if (action.type === 'RENAME_CHILD') {
    return RenameChildAction.parse(action)
  } else if (action.type === 'RESET_CATEGORY_NETWORK_IDS') {
    return ResetCategoryNetworkIdsAction.parse(action)
  } else if (action.type === 'REVIEW_CHILD_TASK') {
    return ReviewChildTaskAction.parse(action)
  } else if (action.type === 'SET_CATEGORY_EXTRA_TIME') {
    return SetCategoryExtraTimeAction.parse(action)
  } else if (action.type === 'SET_CATEGORY_FOR_UNASSIGNED_APPS') {
    return SetCategoryForUnassignedAppsAction.parse(action)
  } else if (action.type === 'SET_CHILD_PASSWORD') {
    return SetChildPasswordAction.parse(action)
  } else if (action.type === 'SET_CONSIDER_REBOOT_MANIPULATION') {
    return SetConsiderRebootManipulationAction.parse(action)
  } else if (action.type === 'SET_DEVICE_DEFAULT_USER') {
    return SetDeviceDefaultUserAction.parse(action)
  } else if (action.type === 'SET_DEVICE_DEFAULT_USER_TIMEOUT') {
    return SetDeviceDefaultUserTimeoutAction.parse(action)
  } else if (action.type === 'SET_DEVICE_USER') {
    return SetDeviceUserAction.parse(action)
  } else if (action.type === 'SET_KEEP_SIGNED_IN') {
    return SetKeepSignedInAction.parse(action)
  } else if (action.type === 'SET_PARENT_CATEGORY') {
    return SetParentCategoryAction.parse(action)
  } else if (action.type === 'SET_RELAX_PRIMARY_DEVICE') {
    return SetRelaxPrimaryDeviceAction.parse(action)
  } else if (action.type === 'SET_SEND_DEVICE_CONNECTED') {
    return SetSendDeviceConnected.parse(action)
  } else if (action.type === 'SET_USER_DISABLE_LIMITS_UNTIL') {
    return SetUserDisableLimitsUntilAction.parse(action)
  } else if (action.type === 'SET_USER_TIMEZONE') {
    return SetUserTimezoneAction.parse(action)
  } else if (action.type === 'UPDATE_CATEGORY_BATTERY_LIMIT') {
    return UpdateCategoryBatteryLimitAction.parse(action)
  } else if (action.type === 'UPDATE_CATEGORY_BLOCK_ALL_NOTIFICATIONS') {
    return UpdateCategoryBlockAllNotificationsAction.parse(action)
  } else if (action.type === 'UPDATE_CATEGORY_BLOCKED_TIMES') {
    return UpdateCategoryBlockedTimesAction.parse(action)
  } else if (action.type === 'UPDATE_CATEGORY_DISABLE_LIMITS') {
    return UpdateCategoryDisableLimitsAction.parse(action)
  } else if (action.type === 'UPDATE_CATEGORY_FLAGS') {
    return UpdateCategoryFlagsAction.parse(action)
  } else if (action.type === 'UPDATE_CATEGORY_SORTING') {
    return UpdateCategorySortingAction.parse(action)
  } else if (action.type === 'UPDATE_CATEGORY_TIME_WARNINGS') {
    return UpdateCategoryTimeWarningsAction.parse(action)
  } else if (action.type === 'UPDATE_CATEGORY_TITLE') {
    return UpdateCategoryTitleAction.parse(action)
  } else if (action.type === 'UPDATE_CHILD_TASK') {
    return UpdateChildTaskAction.parse(action)
  } else if (action.type === 'UPDATE_CATEGORY_TEMPORARILY_BLOCKED') {
    return UpdateCategoryTemporarilyBlockedAction.parse(action)
  } else if (action.type === 'UPDATE_DEVICE_NAME') {
    return UpdateDeviceNameAction.parse(action)
  } else if (action.type === 'UPDATE_ENABLE_ACTIVITY_LEVEL_BLOCKING') {
    return UpdateEnableActivityLevelBlockingAction.parse(action)
  } else if (action.type === 'UPDATE_NETWORK_TIME_VERIFICATION') {
    return UpdateNetworkTimeVerificationAction.parse(action)
  } else if (action.type === 'UPDATE_PARENT_NOTIFICATION_FLAGS') {
    return UpdateParentNotificationFlagsAction.parse(action)
  } else if (action.type === 'UPDATE_TIMELIMIT_RULE') {
    return UpdateTimelimitRuleAction.parse(action)
  } else if (action.type === 'UPDATE_USER_FLAGS') {
    return UpdateUserFlagsAction.parse(action)
  } else if (action.type === 'UPDATE_USER_LIMIT_LOGIN_CATEGORY') {
    return UpdateUserLimitLoginCategory.parse(action)
  } else if (action.type === 'UPDATE_USER_LIMIT_LOGIN_PRE_BLOCK_DURATION') {
    return UpdateUserLimitLoginPreBlockDuration.parse(action)
  } else {
    throw new UnknownActionTypeException({ group: 'parent' })
  }
}
