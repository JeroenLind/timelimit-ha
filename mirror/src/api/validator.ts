// tslint:disable 
import { ClientPushChangesRequest, ClientPullChangesRequest, MailAuthTokenRequestBody, CreateFamilyByMailTokenRequest, SignIntoFamilyRequest, RecoverParentPasswordRequest, RegisterChildDeviceRequest, SerializedParentAction, SerializedAppLogicAction, SerializedChildAction, CreateRegisterDeviceTokenRequest, CanDoPurchaseRequest, LinkParentMailAddressRequest, UpdatePrimaryDeviceRequest, RemoveDeviceRequest, RequestIdentityTokenRequest, RequestWithAuthToken, SendMailLoginCodeRequest, SignInByMailCodeRequest, IdentityTokenPayload, DeleteAccountPayload } from './schema.js'
import { Ajv } from 'ajv'
const ajv = new Ajv()

const definitions = {
  "ClientPushChangesRequestAction": {
    "type": "object",
    "properties": {
      "encodedAction": {
        "type": "string"
      },
      "sequenceNumber": {
        "type": "number"
      },
      "integrity": {
        "type": "string"
      },
      "type": {
        "enum": [
          "appLogic",
          "child",
          "parent"
        ],
        "type": "string"
      },
      "userId": {
        "type": "string"
      }
    },
    "additionalProperties": false,
    "required": [
      "encodedAction",
      "integrity",
      "sequenceNumber",
      "type",
      "userId"
    ]
  },
  "ClientDataStatus": {
    "type": "object",
    "properties": {
      "devices": {
        "type": "string"
      },
      "apps": {
        "type": "object",
        "additionalProperties": {
          "type": "string"
        }
      },
      "categories": {
        "type": "object",
        "additionalProperties": {
          "$ref": "#/definitions/CategoryDataStatus"
        }
      },
      "users": {
        "type": "string"
      },
      "clientLevel": {
        "type": "number"
      },
      "devicesDetail": {
        "type": "object",
        "additionalProperties": {
          "$ref": "#/definitions/DeviceDataStatus"
        }
      },
      "kri": {
        "type": "number"
      },
      "kr": {
        "type": "number"
      },
      "dh": {
        "type": "string"
      },
      "u2f": {
        "type": "string"
      }
    },
    "additionalProperties": false,
    "required": [
      "apps",
      "categories",
      "devices",
      "users"
    ]
  },
  "CategoryDataStatus": {
    "type": "object",
    "properties": {
      "base": {
        "type": "string"
      },
      "apps": {
        "type": "string"
      },
      "rules": {
        "type": "string"
      },
      "usedTime": {
        "type": "string"
      },
      "tasks": {
        "type": "string"
      }
    },
    "additionalProperties": false,
    "required": [
      "apps",
      "base",
      "rules",
      "usedTime"
    ]
  },
  "DeviceDataStatus": {
    "type": "object",
    "properties": {
      "appsB": {
        "type": "string"
      },
      "appsD": {
        "type": "string"
      }
    },
    "additionalProperties": false
  },
  "PlaintextParentPassword": {
    "type": "object",
    "properties": {
      "hash": {
        "type": "string"
      },
      "secondHash": {
        "type": "string"
      },
      "secondSalt": {
        "type": "string"
      }
    },
    "additionalProperties": false,
    "required": [
      "hash",
      "secondHash",
      "secondSalt"
    ]
  },
  "NewDeviceInfo": {
    "type": "object",
    "properties": {
      "model": {
        "type": "string"
      }
    },
    "additionalProperties": false,
    "required": [
      "model"
    ]
  },
  "SerializedAddCategoryAppsAction": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "ADD_CATEGORY_APPS"
        ]
      },
      "categoryId": {
        "type": "string"
      },
      "packageNames": {
        "type": "array",
        "items": {
          "type": "string"
        }
      }
    },
    "additionalProperties": false,
    "required": [
      "categoryId",
      "packageNames",
      "type"
    ]
  },
  "SerializedAddCategoryNetworkIdAction": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "ADD_CATEGORY_NETWORK_ID"
        ]
      },
      "categoryId": {
        "type": "string"
      },
      "itemId": {
        "type": "string"
      },
      "hashedNetworkId": {
        "type": "string"
      }
    },
    "additionalProperties": false,
    "required": [
      "categoryId",
      "hashedNetworkId",
      "itemId",
      "type"
    ]
  },
  "SerializedAddParentU2fKeyAction": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "ADD_PARENT_U2F"
        ]
      },
      "keyHandle": {
        "type": "string"
      },
      "publicKey": {
        "type": "string"
      }
    },
    "additionalProperties": false,
    "required": [
      "keyHandle",
      "publicKey",
      "type"
    ]
  },
  "SerializedAddUserAction": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "ADD_USER"
        ]
      },
      "name": {
        "type": "string"
      },
      "userType": {
        "enum": [
          "child",
          "parent"
        ],
        "type": "string"
      },
      "userId": {
        "type": "string"
      },
      "password": {
        "$ref": "#/definitions/EncryptableParentPassword"
      },
      "timeZone": {
        "type": "string"
      }
    },
    "additionalProperties": false,
    "required": [
      "name",
      "timeZone",
      "type",
      "userId",
      "userType"
    ]
  },
  "EncryptableParentPassword": {
    "type": "object",
    "properties": {
      "hash": {
        "type": "string"
      },
      "secondHash": {
        "type": "string"
      },
      "secondSalt": {
        "type": "string"
      },
      "encrypted": {
        "type": "boolean"
      }
    },
    "additionalProperties": false,
    "required": [
      "hash",
      "secondHash",
      "secondSalt"
    ]
  },
  "SerializedChangeParentPasswordAction": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "CHANGE_PARENT_PASSWORD"
        ]
      },
      "userId": {
        "type": "string"
      },
      "hash": {
        "type": "string"
      },
      "secondSalt": {
        "type": "string"
      },
      "secondHashEncrypted": {
        "type": "string"
      },
      "integrity": {
        "type": "string"
      }
    },
    "additionalProperties": false,
    "required": [
      "hash",
      "integrity",
      "secondHashEncrypted",
      "secondSalt",
      "type",
      "userId"
    ]
  },
  "SerializedCreateCategoryAction": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "CREATE_CATEGORY"
        ]
      },
      "childId": {
        "type": "string"
      },
      "categoryId": {
        "type": "string"
      },
      "title": {
        "type": "string"
      }
    },
    "additionalProperties": false,
    "required": [
      "categoryId",
      "childId",
      "title",
      "type"
    ]
  },
  "SerializedCreateTimelimtRuleAction": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "CREATE_TIMELIMIT_RULE"
        ]
      },
      "rule": {
        "$ref": "#/definitions/SerializedTimeLimitRule"
      }
    },
    "additionalProperties": false,
    "required": [
      "rule",
      "type"
    ]
  },
  "SerializedTimeLimitRule": {
    "type": "object",
    "properties": {
      "ruleId": {
        "type": "string"
      },
      "categoryId": {
        "type": "string"
      },
      "time": {
        "type": "number"
      },
      "days": {
        "type": "number"
      },
      "extraTime": {
        "type": "boolean"
      },
      "start": {
        "type": "number"
      },
      "end": {
        "type": "number"
      },
      "dur": {
        "type": "number"
      },
      "pause": {
        "type": "number"
      },
      "perDay": {
        "type": "boolean"
      },
      "e": {
        "type": "number"
      }
    },
    "additionalProperties": false,
    "required": [
      "categoryId",
      "days",
      "extraTime",
      "ruleId",
      "time"
    ]
  },
  "SerializedDeleteCategoryAction": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "DELETE_CATEGORY"
        ]
      },
      "categoryId": {
        "type": "string"
      }
    },
    "additionalProperties": false,
    "required": [
      "categoryId",
      "type"
    ]
  },
  "SerializedDeleteChildTaskAction": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "DELETE_CHILD_TASK"
        ]
      },
      "taskId": {
        "type": "string"
      }
    },
    "additionalProperties": false,
    "required": [
      "taskId",
      "type"
    ]
  },
  "SerializedDeleteTimeLimitRuleAction": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "DELETE_TIMELIMIT_RULE"
        ]
      },
      "ruleId": {
        "type": "string"
      }
    },
    "additionalProperties": false,
    "required": [
      "ruleId",
      "type"
    ]
  },
  "SerializedIgnoreManipulationAction": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "IGNORE_MANIPULATION"
        ]
      },
      "deviceId": {
        "type": "string"
      },
      "admin": {
        "type": "boolean"
      },
      "adminA": {
        "type": "boolean"
      },
      "downgrade": {
        "type": "boolean"
      },
      "notification": {
        "type": "boolean"
      },
      "usageStats": {
        "type": "boolean"
      },
      "hadManipulation": {
        "type": "boolean"
      },
      "reboot": {
        "type": "boolean"
      },
      "overlay": {
        "type": "boolean"
      },
      "accessibilityService": {
        "type": "boolean"
      },
      "ignoreHadManipulationFlags": {
        "type": "number"
      },
      "ignoreManipulationFlags": {
        "type": "number"
      }
    },
    "additionalProperties": false,
    "required": [
      "admin",
      "adminA",
      "deviceId",
      "downgrade",
      "hadManipulation",
      "notification",
      "type",
      "usageStats"
    ]
  },
  "SerializedIncrementCategoryExtraTimeAction": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "INCREMENT_CATEGORY_EXTRATIME"
        ]
      },
      "categoryId": {
        "type": "string"
      },
      "addedExtraTime": {
        "type": "number"
      },
      "day": {
        "type": "number"
      }
    },
    "additionalProperties": false,
    "required": [
      "addedExtraTime",
      "categoryId",
      "type"
    ]
  },
  "SerializedReportU2fLoginAction": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "REPORT_U2F_LOGIN"
        ]
      }
    },
    "additionalProperties": false,
    "required": [
      "type"
    ]
  },
  "SerializedRemoveCategoryAppsAction": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "REMOVE_CATEGORY_APPS"
        ]
      },
      "categoryId": {
        "type": "string"
      },
      "packageNames": {
        "type": "array",
        "items": {
          "type": "string"
        }
      }
    },
    "additionalProperties": false,
    "required": [
      "categoryId",
      "packageNames",
      "type"
    ]
  },
  "SerializedRemoveParentU2fKeyAction": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "REMOVE_PARENT_U2F"
        ]
      },
      "keyHandle": {
        "type": "string"
      },
      "publicKey": {
        "type": "string"
      }
    },
    "additionalProperties": false,
    "required": [
      "keyHandle",
      "publicKey",
      "type"
    ]
  },
  "SerializedRemoveUserAction": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "REMOVE_USER"
        ]
      },
      "userId": {
        "type": "string"
      },
      "authentication": {
        "type": "string"
      }
    },
    "additionalProperties": false,
    "required": [
      "type",
      "userId"
    ]
  },
  "SerializedRenameChildAction": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "RENAME_CHILD"
        ]
      },
      "childId": {
        "type": "string"
      },
      "newName": {
        "type": "string"
      }
    },
    "additionalProperties": false,
    "required": [
      "childId",
      "newName",
      "type"
    ]
  },
  "SerializeResetCategoryNetworkIdsAction": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "RESET_CATEGORY_NETWORK_IDS"
        ]
      },
      "categoryId": {
        "type": "string"
      }
    },
    "additionalProperties": false,
    "required": [
      "categoryId",
      "type"
    ]
  },
  "SerializedReviewChildTaskAction": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "REVIEW_CHILD_TASK"
        ]
      },
      "taskId": {
        "type": "string"
      },
      "ok": {
        "type": "boolean"
      },
      "time": {
        "type": "number"
      },
      "day": {
        "type": "number"
      }
    },
    "additionalProperties": false,
    "required": [
      "ok",
      "taskId",
      "time",
      "type"
    ]
  },
  "SerializedSetCategoryExtraTimeAction": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "SET_CATEGORY_EXTRA_TIME"
        ]
      },
      "categoryId": {
        "type": "string"
      },
      "newExtraTime": {
        "type": "number"
      },
      "day": {
        "type": "number"
      }
    },
    "additionalProperties": false,
    "required": [
      "categoryId",
      "newExtraTime",
      "type"
    ]
  },
  "SerializedSetCategoryForUnassignedAppsAction": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "SET_CATEGORY_FOR_UNASSIGNED_APPS"
        ]
      },
      "childId": {
        "type": "string"
      },
      "categoryId": {
        "type": "string"
      }
    },
    "additionalProperties": false,
    "required": [
      "categoryId",
      "childId",
      "type"
    ]
  },
  "SerializedSetChildPasswordAction": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "SET_CHILD_PASSWORD"
        ]
      },
      "childId": {
        "type": "string"
      },
      "newPassword": {
        "$ref": "#/definitions/EncryptableParentPassword"
      }
    },
    "additionalProperties": false,
    "required": [
      "childId",
      "newPassword",
      "type"
    ]
  },
  "SerializedSetConsiderRebootManipulationAction": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "SET_CONSIDER_REBOOT_MANIPULATION"
        ]
      },
      "deviceId": {
        "type": "string"
      },
      "enable": {
        "type": "boolean"
      }
    },
    "additionalProperties": false,
    "required": [
      "deviceId",
      "enable",
      "type"
    ]
  },
  "SerializedSetDeviceDefaultUserAction": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "SET_DEVICE_DEFAULT_USER"
        ]
      },
      "deviceId": {
        "type": "string"
      },
      "defaultUserId": {
        "type": "string"
      }
    },
    "additionalProperties": false,
    "required": [
      "defaultUserId",
      "deviceId",
      "type"
    ]
  },
  "SerializedSetDeviceDefaultUserTimeoutAction": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "SET_DEVICE_DEFAULT_USER_TIMEOUT"
        ]
      },
      "deviceId": {
        "type": "string"
      },
      "timeout": {
        "type": "number"
      }
    },
    "additionalProperties": false,
    "required": [
      "deviceId",
      "timeout",
      "type"
    ]
  },
  "SerializedSetDeviceUserAction": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "SET_DEVICE_USER"
        ]
      },
      "deviceId": {
        "type": "string"
      },
      "userId": {
        "type": "string"
      }
    },
    "additionalProperties": false,
    "required": [
      "deviceId",
      "type",
      "userId"
    ]
  },
  "SerializedSetKeepSignedInAction": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "SET_KEEP_SIGNED_IN"
        ]
      },
      "deviceId": {
        "type": "string"
      },
      "keepSignedIn": {
        "type": "boolean"
      }
    },
    "additionalProperties": false,
    "required": [
      "deviceId",
      "keepSignedIn",
      "type"
    ]
  },
  "SerializedSetParentCategoryAction": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "SET_PARENT_CATEGORY"
        ]
      },
      "categoryId": {
        "type": "string"
      },
      "parentCategory": {
        "type": "string"
      }
    },
    "additionalProperties": false,
    "required": [
      "categoryId",
      "parentCategory",
      "type"
    ]
  },
  "SerializedSetRelaxPrimaryDeviceAction": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "SET_RELAX_PRIMARY_DEVICE"
        ]
      },
      "userId": {
        "type": "string"
      },
      "relax": {
        "type": "boolean"
      }
    },
    "additionalProperties": false,
    "required": [
      "relax",
      "type",
      "userId"
    ]
  },
  "SerializedSetSendDeviceConnected": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "SET_SEND_DEVICE_CONNECTED"
        ]
      },
      "deviceId": {
        "type": "string"
      },
      "enable": {
        "type": "boolean"
      }
    },
    "additionalProperties": false,
    "required": [
      "deviceId",
      "enable",
      "type"
    ]
  },
  "SerializedSetUserDisableLimitsUntilAction": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "SET_USER_DISABLE_LIMITS_UNTIL"
        ]
      },
      "childId": {
        "type": "string"
      },
      "time": {
        "type": "number"
      }
    },
    "additionalProperties": false,
    "required": [
      "childId",
      "time",
      "type"
    ]
  },
  "SerializedSetUserTimezoneAction": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "SET_USER_TIMEZONE"
        ]
      },
      "userId": {
        "type": "string"
      },
      "timezone": {
        "type": "string"
      }
    },
    "additionalProperties": false,
    "required": [
      "timezone",
      "type",
      "userId"
    ]
  },
  "SerializedUpdateCategoryBatteryLimitAction": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "UPDATE_CATEGORY_BATTERY_LIMIT"
        ]
      },
      "categoryId": {
        "type": "string"
      },
      "chargeLimit": {
        "type": "number"
      },
      "mobileLimit": {
        "type": "number"
      }
    },
    "additionalProperties": false,
    "required": [
      "categoryId",
      "type"
    ]
  },
  "SerializedUpdateCategoryBlockAllNotificationsAction": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "UPDATE_CATEGORY_BLOCK_ALL_NOTIFICATIONS"
        ]
      },
      "categoryId": {
        "type": "string"
      },
      "blocked": {
        "type": "boolean"
      },
      "blockDelay": {
        "type": "number"
      }
    },
    "additionalProperties": false,
    "required": [
      "blocked",
      "categoryId",
      "type"
    ]
  },
  "SerializedUpdateCategoryBlockedTimesAction": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "UPDATE_CATEGORY_BLOCKED_TIMES"
        ]
      },
      "categoryId": {
        "type": "string"
      },
      "times": {
        "type": "string"
      }
    },
    "additionalProperties": false,
    "required": [
      "categoryId",
      "times",
      "type"
    ]
  },
  "SerializedUpdatCategoryDisableLimitsAction": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "UPDATE_CATEGORY_DISABLE_LIMITS"
        ]
      },
      "categoryId": {
        "type": "string"
      },
      "endTime": {
        "type": "number"
      }
    },
    "additionalProperties": false,
    "required": [
      "categoryId",
      "endTime",
      "type"
    ]
  },
  "SerializedUpdateCategoryFlagsAction": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "UPDATE_CATEGORY_FLAGS"
        ]
      },
      "categoryId": {
        "type": "string"
      },
      "modified": {
        "type": "number"
      },
      "values": {
        "type": "number"
      }
    },
    "additionalProperties": false,
    "required": [
      "categoryId",
      "modified",
      "type",
      "values"
    ]
  },
  "SerializedUpdateCategorySortingAction": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "UPDATE_CATEGORY_SORTING"
        ]
      },
      "categoryIds": {
        "type": "array",
        "items": {
          "type": "string"
        }
      }
    },
    "additionalProperties": false,
    "required": [
      "categoryIds",
      "type"
    ]
  },
  "SerializedUpdateCategoryTemporarilyBlockedAction": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "UPDATE_CATEGORY_TEMPORARILY_BLOCKED"
        ]
      },
      "categoryId": {
        "type": "string"
      },
      "blocked": {
        "type": "boolean"
      },
      "endTime": {
        "type": "number"
      }
    },
    "additionalProperties": false,
    "required": [
      "blocked",
      "categoryId",
      "type"
    ]
  },
  "SerializedUpdateCategoryTimeWarningsAction": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "UPDATE_CATEGORY_TIME_WARNINGS"
        ]
      },
      "categoryId": {
        "type": "string"
      },
      "enable": {
        "type": "boolean"
      },
      "flags": {
        "type": "number"
      },
      "minutes": {
        "type": "number"
      }
    },
    "additionalProperties": false,
    "required": [
      "categoryId",
      "enable",
      "flags",
      "type"
    ]
  },
  "SerializedUpdateCategoryTitleAction": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "UPDATE_CATEGORY_TITLE"
        ]
      },
      "categoryId": {
        "type": "string"
      },
      "newTitle": {
        "type": "string"
      }
    },
    "additionalProperties": false,
    "required": [
      "categoryId",
      "newTitle",
      "type"
    ]
  },
  "SerializedUpdateChildTaskAction": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "UPDATE_CHILD_TASK"
        ]
      },
      "isNew": {
        "type": "boolean"
      },
      "taskId": {
        "type": "string"
      },
      "categoryId": {
        "type": "string"
      },
      "taskTitle": {
        "type": "string"
      },
      "extraTimeDuration": {
        "type": "number"
      }
    },
    "additionalProperties": false,
    "required": [
      "categoryId",
      "extraTimeDuration",
      "isNew",
      "taskId",
      "taskTitle",
      "type"
    ]
  },
  "SerializedUpdateDeviceNameAction": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "UPDATE_DEVICE_NAME"
        ]
      },
      "deviceId": {
        "type": "string"
      },
      "name": {
        "type": "string"
      }
    },
    "additionalProperties": false,
    "required": [
      "deviceId",
      "name",
      "type"
    ]
  },
  "SerializedUpdateEnableActivityLevelBlockingAction": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "UPDATE_ENABLE_ACTIVITY_LEVEL_BLOCKING"
        ]
      },
      "deviceId": {
        "type": "string"
      },
      "enable": {
        "type": "boolean"
      }
    },
    "additionalProperties": false,
    "required": [
      "deviceId",
      "enable",
      "type"
    ]
  },
  "SerialiizedUpdateNetworkTimeVerificationAction": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "UPDATE_NETWORK_TIME_VERIFICATION"
        ]
      },
      "deviceId": {
        "type": "string"
      },
      "mode": {
        "enum": [
          "disabled",
          "enabled",
          "if possible"
        ],
        "type": "string"
      }
    },
    "additionalProperties": false,
    "required": [
      "deviceId",
      "mode",
      "type"
    ]
  },
  "SerializedUpdateParentNotificationFlagsAction": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "UPDATE_PARENT_NOTIFICATION_FLAGS"
        ]
      },
      "parentId": {
        "type": "string"
      },
      "flags": {
        "type": "number"
      },
      "set": {
        "type": "boolean"
      }
    },
    "additionalProperties": false,
    "required": [
      "flags",
      "parentId",
      "set",
      "type"
    ]
  },
  "SerializedUpdateTimelimitRuleAction": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "UPDATE_TIMELIMIT_RULE"
        ]
      },
      "ruleId": {
        "type": "string"
      },
      "time": {
        "type": "number"
      },
      "days": {
        "type": "number"
      },
      "extraTime": {
        "type": "boolean"
      },
      "start": {
        "type": "number"
      },
      "end": {
        "type": "number"
      },
      "dur": {
        "type": "number"
      },
      "pause": {
        "type": "number"
      },
      "perDay": {
        "type": "boolean"
      },
      "e": {
        "type": "number"
      }
    },
    "additionalProperties": false,
    "required": [
      "days",
      "extraTime",
      "ruleId",
      "time",
      "type"
    ]
  },
  "SerializedUpdateUserFlagsAction": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "UPDATE_USER_FLAGS"
        ]
      },
      "userId": {
        "type": "string"
      },
      "modified": {
        "type": "number"
      },
      "values": {
        "type": "number"
      }
    },
    "additionalProperties": false,
    "required": [
      "modified",
      "type",
      "userId",
      "values"
    ]
  },
  "SerializedUpdateUserLimitLoginCategory": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "UPDATE_USER_LIMIT_LOGIN_CATEGORY"
        ]
      },
      "userId": {
        "type": "string"
      },
      "categoryId": {
        "type": "string"
      }
    },
    "additionalProperties": false,
    "required": [
      "type",
      "userId"
    ]
  },
  "SerializedUpdateUserLimitLoginPreBlockDuration": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "UPDATE_USER_LIMIT_LOGIN_PRE_BLOCK_DURATION"
        ]
      },
      "userId": {
        "type": "string"
      },
      "preBlockDuration": {
        "type": "number"
      }
    },
    "additionalProperties": false,
    "required": [
      "preBlockDuration",
      "type",
      "userId"
    ]
  },
  "SerializedAddInstalledAppsAction": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "ADD_INSTALLED_APPS"
        ]
      },
      "apps": {
        "type": "array",
        "items": {
          "$ref": "#/definitions/SerializedInstalledApp"
        }
      }
    },
    "additionalProperties": false,
    "required": [
      "apps",
      "type"
    ]
  },
  "SerializedInstalledApp": {
    "type": "object",
    "properties": {
      "packageName": {
        "type": "string"
      },
      "title": {
        "type": "string"
      },
      "isLaunchable": {
        "type": "boolean"
      },
      "recommendation": {
        "$ref": "#/definitions/AppRecommendation"
      }
    },
    "additionalProperties": false,
    "required": [
      "isLaunchable",
      "packageName",
      "recommendation",
      "title"
    ]
  },
  "AppRecommendation": {
    "enum": [
      "blacklist",
      "none",
      "whitelist"
    ],
    "type": "string"
  },
  "SerializedAddUsedTimeAction": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "ADD_USED_TIME"
        ]
      },
      "categoryId": {
        "type": "string"
      },
      "day": {
        "type": "number"
      },
      "timeToAdd": {
        "type": "number"
      },
      "extraTimeToSubtract": {
        "type": "number"
      }
    },
    "additionalProperties": false,
    "required": [
      "categoryId",
      "day",
      "extraTimeToSubtract",
      "timeToAdd",
      "type"
    ]
  },
  "SerializedAddUsedTimeActionVersion2": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "ADD_USED_TIME_V2"
        ]
      },
      "d": {
        "type": "number"
      },
      "i": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "categoryId": {
              "type": "string"
            },
            "tta": {
              "type": "number"
            },
            "etts": {
              "type": "number"
            },
            "as": {
              "type": "array",
              "items": {
                "type": "array",
                "items": [
                  {
                    "type": "number"
                  },
                  {
                    "type": "number"
                  }
                ],
                "minItems": 2,
                "maxItems": 2
              }
            },
            "sdl": {
              "type": "array",
              "items": {
                "type": "array",
                "items": [
                  {
                    "type": "number"
                  },
                  {
                    "type": "number"
                  },
                  {
                    "type": "number"
                  },
                  {
                    "type": "number"
                  }
                ],
                "minItems": 4,
                "maxItems": 4
              }
            }
          },
          "additionalProperties": false,
          "required": [
            "categoryId",
            "etts",
            "tta"
          ]
        }
      },
      "t": {
        "type": "number"
      }
    },
    "additionalProperties": false,
    "required": [
      "d",
      "i",
      "type"
    ]
  },
  "SerializedFinishKeyRequestAction": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "FINISH_KEY_REQUEST"
        ]
      },
      "dsn": {
        "type": "number"
      }
    },
    "additionalProperties": false,
    "required": [
      "dsn",
      "type"
    ]
  },
  "SerializedForceSyncAction": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "FORCE_SYNC"
        ]
      }
    },
    "additionalProperties": false,
    "required": [
      "type"
    ]
  },
  "SerializedReplyToKeyRequestAction": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "REPLY_TO_KEY_REQUEST"
        ]
      },
      "rsn": {
        "type": "number"
      },
      "tempKey": {
        "type": "string"
      },
      "encryptedKey": {
        "type": "string"
      },
      "signature": {
        "type": "string"
      }
    },
    "additionalProperties": false,
    "required": [
      "encryptedKey",
      "rsn",
      "signature",
      "tempKey",
      "type"
    ]
  },
  "SerializedMarkTaskPendingAction": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "MARK_TASK_PENDING"
        ]
      },
      "taskId": {
        "type": "string"
      }
    },
    "additionalProperties": false,
    "required": [
      "taskId",
      "type"
    ]
  },
  "SerializedPingAction": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "PING"
        ]
      },
      "deviceId": {
        "type": "string"
      },
      "event": {
        "$ref": "#/definitions/PingEvent"
      },
      "token": {
        "type": "string"
      }
    },
    "additionalProperties": false,
    "required": [
      "deviceId",
      "event",
      "token",
      "type"
    ]
  },
  "PingEvent": {
    "enum": [
      "clear",
      "ping",
      "pong"
    ],
    "type": "string"
  },
  "SerializedUpdateInstalledAppsAction": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "UPDATE_INSTALLED_APPS"
        ]
      },
      "b": {
        "type": "string"
      },
      "d": {
        "type": "string"
      },
      "w": {
        "type": "boolean"
      }
    },
    "additionalProperties": false,
    "required": [
      "type",
      "w"
    ]
  },
  "SerializedRemoveInstalledAppsAction": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "REMOVE_INSTALLED_APPS"
        ]
      },
      "packageNames": {
        "type": "array",
        "items": {
          "type": "string"
        }
      }
    },
    "additionalProperties": false,
    "required": [
      "packageNames",
      "type"
    ]
  },
  "SerializedSendKeyRequestAction": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "SEND_KEY_REQUEST"
        ]
      },
      "dsn": {
        "type": "number"
      },
      "deviceId": {
        "type": "string"
      },
      "categoryId": {
        "type": "string"
      },
      "dataType": {
        "type": "number"
      },
      "tempKey": {
        "type": "string"
      },
      "signature": {
        "type": "string"
      }
    },
    "additionalProperties": false,
    "required": [
      "dataType",
      "dsn",
      "signature",
      "tempKey",
      "type"
    ]
  },
  "SerializedSignOutAtDeviceAction": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "SIGN_OUT_AT_DEVICE"
        ]
      }
    },
    "additionalProperties": false,
    "required": [
      "type"
    ]
  },
  "SerialiezdTriedDisablingDeviceAdminAction": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "TRIED_DISABLING_DEVICE_ADMIN"
        ]
      }
    },
    "additionalProperties": false,
    "required": [
      "type"
    ]
  },
  "SerializedUpdateAppActivitiesAction": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "UPDATE_APP_ACTIVITIES"
        ]
      },
      "removed": {
        "type": "array",
        "items": {
          "type": "array",
          "items": [
            {
              "type": "string"
            },
            {
              "type": "string"
            }
          ],
          "minItems": 2,
          "maxItems": 2
        }
      },
      "updatedOrAdded": {
        "type": "array",
        "items": {
          "$ref": "#/definitions/SerializedAppActivityItem"
        }
      }
    },
    "additionalProperties": false,
    "required": [
      "removed",
      "type",
      "updatedOrAdded"
    ]
  },
  "SerializedAppActivityItem": {
    "type": "object",
    "properties": {
      "p": {
        "type": "string"
      },
      "c": {
        "type": "string"
      },
      "t": {
        "type": "string"
      }
    },
    "additionalProperties": false,
    "required": [
      "c",
      "p",
      "t"
    ]
  },
  "SerializedUpdateDeviceStatusAction": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "UPDATE_DEVICE_STATUS"
        ]
      },
      "protectionLevel": {
        "enum": [
          "device owner",
          "none",
          "password device admin",
          "simple device admin"
        ],
        "type": "string"
      },
      "usageStats": {
        "enum": [
          "granted",
          "not granted",
          "not required"
        ],
        "type": "string"
      },
      "notificationAccess": {
        "enum": [
          "granted",
          "not granted",
          "not supported"
        ],
        "type": "string"
      },
      "overlayPermission": {
        "enum": [
          "granted",
          "not granted",
          "not required"
        ],
        "type": "string"
      },
      "accessibilityServiceEnabled": {
        "type": "boolean"
      },
      "appVersion": {
        "type": "number"
      },
      "didReboot": {
        "type": "boolean"
      },
      "isQOrLaterNow": {
        "type": "boolean"
      },
      "addedManipulationFlags": {
        "type": "number"
      },
      "platformType": {
        "type": "string"
      },
      "platformLevel": {
        "type": "number"
      }
    },
    "additionalProperties": false,
    "required": [
      "type"
    ]
  },
  "SerializedUploadDevicePublicKeyAction": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "UPLOAD_DEVICE_PUBLIC_KEY"
        ]
      },
      "key": {
        "type": "string"
      }
    },
    "additionalProperties": false,
    "required": [
      "key",
      "type"
    ]
  },
  "SerializedChildChangePasswordAction": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "CHILD_CHANGE_PASSWORD"
        ]
      },
      "password": {
        "$ref": "#/definitions/EncryptableParentPassword"
      }
    },
    "additionalProperties": false,
    "required": [
      "password",
      "type"
    ]
  },
  "SerializedChildSignInAction": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "CHILD_SIGN_IN"
        ]
      }
    },
    "additionalProperties": false,
    "required": [
      "type"
    ]
  },
  "ServerDeviceList": {
    "type": "object",
    "properties": {
      "version": {
        "type": "string"
      },
      "data": {
        "type": "array",
        "items": {
          "$ref": "#/definitions/ServerDeviceData"
        }
      }
    },
    "additionalProperties": false,
    "required": [
      "data",
      "version"
    ]
  },
  "ServerDeviceData": {
    "type": "object",
    "properties": {
      "deviceId": {
        "type": "string"
      },
      "name": {
        "type": "string"
      },
      "model": {
        "type": "string"
      },
      "addedAt": {
        "type": "number"
      },
      "currentUserId": {
        "type": "string"
      },
      "networkTime": {
        "enum": [
          "disabled",
          "enabled",
          "if possible"
        ],
        "type": "string"
      },
      "cProtectionLevel": {
        "$ref": "#/definitions/ProtectionLevel"
      },
      "hProtectionLevel": {
        "$ref": "#/definitions/ProtectionLevel"
      },
      "cUsageStats": {
        "$ref": "#/definitions/RuntimePermissionStatus"
      },
      "hUsageStats": {
        "$ref": "#/definitions/RuntimePermissionStatus"
      },
      "cNotificationAccess": {
        "$ref": "#/definitions/NewPermissionStatus"
      },
      "hNotificationAccess": {
        "$ref": "#/definitions/NewPermissionStatus"
      },
      "cAppVersion": {
        "type": "number"
      },
      "hAppVersion": {
        "type": "number"
      },
      "tDisablingAdmin": {
        "type": "boolean"
      },
      "reboot": {
        "type": "boolean"
      },
      "hadManipulation": {
        "type": "boolean"
      },
      "hadManipulationFlags": {
        "type": "number"
      },
      "reportUninstall": {
        "type": "boolean"
      },
      "isUserKeptSignedIn": {
        "type": "boolean"
      },
      "showDeviceConnected": {
        "type": "boolean"
      },
      "defUser": {
        "type": "string"
      },
      "defUserTimeout": {
        "type": "number"
      },
      "rebootIsManipulation": {
        "type": "boolean"
      },
      "cOverlay": {
        "$ref": "#/definitions/RuntimePermissionStatus"
      },
      "hOverlay": {
        "$ref": "#/definitions/RuntimePermissionStatus"
      },
      "asEnabled": {
        "type": "boolean"
      },
      "wasAsEnabled": {
        "type": "boolean"
      },
      "activityLevelBlocking": {
        "type": "boolean"
      },
      "qOrLater": {
        "type": "boolean"
      },
      "mFlags": {
        "type": "number"
      },
      "pk": {
        "type": "string"
      },
      "pType": {
        "type": "string"
      },
      "pLevel": {
        "type": "number"
      }
    },
    "additionalProperties": false,
    "required": [
      "activityLevelBlocking",
      "addedAt",
      "asEnabled",
      "cAppVersion",
      "cNotificationAccess",
      "cOverlay",
      "cProtectionLevel",
      "cUsageStats",
      "currentUserId",
      "defUser",
      "defUserTimeout",
      "deviceId",
      "hAppVersion",
      "hNotificationAccess",
      "hOverlay",
      "hProtectionLevel",
      "hUsageStats",
      "hadManipulation",
      "hadManipulationFlags",
      "isUserKeptSignedIn",
      "mFlags",
      "model",
      "name",
      "networkTime",
      "pLevel",
      "qOrLater",
      "reboot",
      "rebootIsManipulation",
      "reportUninstall",
      "showDeviceConnected",
      "tDisablingAdmin",
      "wasAsEnabled"
    ]
  },
  "ProtectionLevel": {
    "enum": [
      "device owner",
      "none",
      "password device admin",
      "simple device admin"
    ],
    "type": "string"
  },
  "RuntimePermissionStatus": {
    "enum": [
      "granted",
      "not granted",
      "not required"
    ],
    "type": "string"
  },
  "NewPermissionStatus": {
    "enum": [
      "granted",
      "not granted",
      "not supported"
    ],
    "type": "string"
  },
  "ServerExtendedDeviceData": {
    "type": "object",
    "properties": {
      "deviceId": {
        "type": "string"
      },
      "appsBase": {
        "$ref": "#/definitions/ServerCryptContainer"
      },
      "appsDiff": {
        "$ref": "#/definitions/ServerCryptContainer"
      }
    },
    "additionalProperties": false,
    "required": [
      "deviceId"
    ]
  },
  "ServerCryptContainer": {
    "type": "object",
    "properties": {
      "version": {
        "type": "string"
      },
      "data": {
        "type": "string"
      }
    },
    "additionalProperties": false,
    "required": [
      "data",
      "version"
    ]
  },
  "ServerInstalledAppsData": {
    "type": "object",
    "properties": {
      "deviceId": {
        "type": "string"
      },
      "version": {
        "type": "string"
      },
      "apps": {
        "type": "array",
        "items": {
          "$ref": "#/definitions/SerializedInstalledApp"
        }
      },
      "activities": {
        "type": "array",
        "items": {
          "$ref": "#/definitions/SerializedAppActivityItem"
        }
      }
    },
    "additionalProperties": false,
    "required": [
      "activities",
      "apps",
      "deviceId",
      "version"
    ]
  },
  "ServerUpdatedCategoryBaseData": {
    "type": "object",
    "properties": {
      "categoryId": {
        "type": "string"
      },
      "childId": {
        "type": "string"
      },
      "title": {
        "type": "string"
      },
      "blockedTimes": {
        "type": "string"
      },
      "extraTime": {
        "type": "number"
      },
      "extraTimeDay": {
        "type": "number"
      },
      "tempBlocked": {
        "type": "boolean"
      },
      "tempBlockTime": {
        "type": "number"
      },
      "version": {
        "type": "string"
      },
      "parentCategoryId": {
        "type": "string"
      },
      "blockAllNotifications": {
        "type": "boolean"
      },
      "timeWarnings": {
        "type": "number"
      },
      "mblCharging": {
        "type": "number"
      },
      "mblMobile": {
        "type": "number"
      },
      "sort": {
        "type": "number"
      },
      "networks": {
        "type": "array",
        "items": {
          "$ref": "#/definitions/ServerCategoryNetworkId"
        }
      },
      "dlu": {
        "type": "number"
      },
      "flags": {
        "type": "number"
      },
      "blockNotificationDelay": {
        "type": "number"
      },
      "atw": {
        "type": "array",
        "items": {
          "type": "number"
        }
      }
    },
    "additionalProperties": false,
    "required": [
      "atw",
      "blockAllNotifications",
      "blockNotificationDelay",
      "blockedTimes",
      "categoryId",
      "childId",
      "dlu",
      "extraTime",
      "extraTimeDay",
      "flags",
      "mblCharging",
      "mblMobile",
      "networks",
      "parentCategoryId",
      "sort",
      "tempBlockTime",
      "tempBlocked",
      "timeWarnings",
      "title",
      "version"
    ]
  },
  "ServerCategoryNetworkId": {
    "type": "object",
    "properties": {
      "itemId": {
        "type": "string"
      },
      "hashedNetworkId": {
        "type": "string"
      }
    },
    "additionalProperties": false,
    "required": [
      "hashedNetworkId",
      "itemId"
    ]
  },
  "ServerUpdatedCategoryAssignedApps": {
    "type": "object",
    "properties": {
      "categoryId": {
        "type": "string"
      },
      "apps": {
        "type": "array",
        "items": {
          "type": "string"
        }
      },
      "version": {
        "type": "string"
      }
    },
    "additionalProperties": false,
    "required": [
      "apps",
      "categoryId",
      "version"
    ]
  },
  "ServerUpdatedCategoryUsedTimes": {
    "type": "object",
    "properties": {
      "categoryId": {
        "type": "string"
      },
      "times": {
        "type": "array",
        "items": {
          "$ref": "#/definitions/ServerUsedTimeItem"
        }
      },
      "sessionDurations": {
        "type": "array",
        "items": {
          "$ref": "#/definitions/ServerSessionDurationItem"
        }
      },
      "version": {
        "type": "string"
      }
    },
    "additionalProperties": false,
    "required": [
      "categoryId",
      "sessionDurations",
      "times",
      "version"
    ]
  },
  "ServerUsedTimeItem": {
    "type": "object",
    "properties": {
      "day": {
        "type": "number"
      },
      "time": {
        "type": "number"
      },
      "start": {
        "type": "number"
      },
      "end": {
        "type": "number"
      }
    },
    "additionalProperties": false,
    "required": [
      "day",
      "end",
      "start",
      "time"
    ]
  },
  "ServerSessionDurationItem": {
    "type": "object",
    "properties": {
      "md": {
        "description": "the maximum duration of a session (maxSessionDuration)",
        "type": "number"
      },
      "spd": {
        "description": "the pause duration after a session (sessionPauseDuration)",
        "type": "number"
      },
      "sm": {
        "description": "the start minute of the day of the session/ the rule\nwhich created this session (startMinuteOfDay)",
        "type": "number"
      },
      "em": {
        "description": "the end minute of the day of the session/ the rule\nwhich created this session (endMinuteOfDay)",
        "type": "number"
      },
      "l": {
        "description": "the timestamp of the last usage of this session (lastUsage)",
        "type": "number"
      },
      "d": {
        "description": "the duration of the last/ current session (lastSessionDuration)",
        "type": "number"
      }
    },
    "additionalProperties": false,
    "required": [
      "d",
      "em",
      "l",
      "md",
      "sm",
      "spd"
    ]
  },
  "ServerUpdatedTimeLimitRules": {
    "type": "object",
    "properties": {
      "categoryId": {
        "type": "string"
      },
      "version": {
        "type": "string"
      },
      "rules": {
        "type": "array",
        "items": {
          "$ref": "#/definitions/ServerTimeLimitRule"
        }
      }
    },
    "additionalProperties": false,
    "required": [
      "categoryId",
      "rules",
      "version"
    ]
  },
  "ServerTimeLimitRule": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string"
      },
      "extraTime": {
        "type": "boolean"
      },
      "dayMask": {
        "type": "number"
      },
      "maxTime": {
        "type": "number"
      },
      "start": {
        "type": "number"
      },
      "end": {
        "type": "number"
      },
      "session": {
        "type": "number"
      },
      "pause": {
        "type": "number"
      },
      "perDay": {
        "type": "boolean"
      }
    },
    "additionalProperties": false,
    "required": [
      "dayMask",
      "end",
      "extraTime",
      "id",
      "maxTime",
      "pause",
      "perDay",
      "session",
      "start"
    ]
  },
  "ServerUpdatedCategoryTasks": {
    "type": "object",
    "properties": {
      "categoryId": {
        "type": "string"
      },
      "version": {
        "type": "string"
      },
      "tasks": {
        "type": "array",
        "items": {
          "$ref": "#/definitions/ServerUpdatedCategoryTask"
        }
      }
    },
    "additionalProperties": false,
    "required": [
      "categoryId",
      "tasks",
      "version"
    ]
  },
  "ServerUpdatedCategoryTask": {
    "type": "object",
    "properties": {
      "i": {
        "type": "string"
      },
      "t": {
        "type": "string"
      },
      "d": {
        "type": "number"
      },
      "p": {
        "type": "boolean"
      },
      "l": {
        "type": "number"
      }
    },
    "additionalProperties": false,
    "required": [
      "d",
      "i",
      "l",
      "p",
      "t"
    ]
  },
  "ServerUserList": {
    "type": "object",
    "properties": {
      "version": {
        "type": "string"
      },
      "data": {
        "type": "array",
        "items": {
          "$ref": "#/definitions/ServerUserEntry"
        }
      }
    },
    "additionalProperties": false,
    "required": [
      "data",
      "version"
    ]
  },
  "ServerUserEntry": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string"
      },
      "name": {
        "type": "string"
      },
      "password": {
        "type": "string"
      },
      "secondPasswordSalt": {
        "type": "string"
      },
      "type": {
        "enum": [
          "child",
          "parent"
        ],
        "type": "string"
      },
      "timeZone": {
        "type": "string"
      },
      "disableLimitsUntil": {
        "type": "number"
      },
      "mail": {
        "type": "string"
      },
      "currentDevice": {
        "type": "string"
      },
      "categoryForNotAssignedApps": {
        "type": "string"
      },
      "relaxPrimaryDevice": {
        "type": "boolean"
      },
      "mailNotificationFlags": {
        "type": "number"
      },
      "blockedTimes": {
        "type": "string"
      },
      "flags": {
        "type": "number"
      },
      "llc": {
        "type": "string"
      },
      "pbd": {
        "type": "number"
      }
    },
    "additionalProperties": false,
    "required": [
      "blockedTimes",
      "categoryForNotAssignedApps",
      "currentDevice",
      "disableLimitsUntil",
      "flags",
      "id",
      "mail",
      "mailNotificationFlags",
      "name",
      "password",
      "relaxPrimaryDevice",
      "secondPasswordSalt",
      "timeZone",
      "type"
    ]
  },
  "ServerKeyRequest": {
    "type": "object",
    "properties": {
      "srvSeq": {
        "type": "number"
      },
      "senId": {
        "type": "string"
      },
      "senSeq": {
        "type": "number"
      },
      "deviceId": {
        "type": "string"
      },
      "categoryId": {
        "type": "string"
      },
      "type": {
        "type": "number"
      },
      "tempKey": {
        "type": "string"
      },
      "signature": {
        "type": "string"
      }
    },
    "additionalProperties": false,
    "required": [
      "senId",
      "senSeq",
      "signature",
      "srvSeq",
      "tempKey",
      "type"
    ]
  },
  "ServerKeyResponse": {
    "type": "object",
    "properties": {
      "srvSeq": {
        "type": "number"
      },
      "sender": {
        "type": "string"
      },
      "rqSeq": {
        "type": "number"
      },
      "tempKey": {
        "type": "string"
      },
      "cryptKey": {
        "type": "string"
      },
      "signature": {
        "type": "string"
      }
    },
    "additionalProperties": false,
    "required": [
      "cryptKey",
      "rqSeq",
      "sender",
      "signature",
      "srvSeq",
      "tempKey"
    ]
  },
  "ServerPing": {
    "type": "object",
    "properties": {
      "deviceId": {
        "type": "string"
      },
      "token": {
        "type": "string"
      },
      "type": {
        "enum": [
          "ping",
          "pong"
        ],
        "type": "string"
      }
    },
    "additionalProperties": false,
    "required": [
      "deviceId",
      "token",
      "type"
    ]
  },
  "ServerDhKey": {
    "type": "object",
    "properties": {
      "v": {
        "type": "string"
      },
      "k": {
        "type": "string"
      }
    },
    "additionalProperties": false,
    "required": [
      "k",
      "v"
    ]
  },
  "U2fData": {
    "type": "object",
    "properties": {
      "v": {
        "type": "string"
      },
      "d": {
        "type": "array",
        "items": {
          "$ref": "#/definitions/U2fItem"
        }
      }
    },
    "additionalProperties": false,
    "required": [
      "d",
      "v"
    ]
  },
  "U2fItem": {
    "type": "object",
    "properties": {
      "u": {
        "type": "string"
      },
      "a": {
        "type": "number"
      },
      "h": {
        "type": "string"
      },
      "p": {
        "type": "string"
      }
    },
    "additionalProperties": false,
    "required": [
      "a",
      "h",
      "p",
      "u"
    ]
  }
}

export const isClientPushChangesRequest: (value: unknown) => value is ClientPushChangesRequest = ajv.compile({
  "type": "object",
  "properties": {
    "deviceAuthToken": {
      "type": "string"
    },
    "actions": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/ClientPushChangesRequestAction"
      }
    }
  },
  "additionalProperties": false,
  "required": [
    "actions",
    "deviceAuthToken"
  ],
  "definitions": definitions,
  "$schema": "http://json-schema.org/draft-07/schema#"
})
export const isClientPullChangesRequest: (value: unknown) => value is ClientPullChangesRequest = ajv.compile({
  "type": "object",
  "properties": {
    "deviceAuthToken": {
      "type": "string"
    },
    "status": {
      "$ref": "#/definitions/ClientDataStatus"
    }
  },
  "additionalProperties": false,
  "required": [
    "deviceAuthToken",
    "status"
  ],
  "definitions": definitions,
  "$schema": "http://json-schema.org/draft-07/schema#"
})
export const isMailAuthTokenRequestBody: (value: unknown) => value is MailAuthTokenRequestBody = ajv.compile({
  "type": "object",
  "properties": {
    "mailAuthToken": {
      "type": "string"
    }
  },
  "additionalProperties": false,
  "required": [
    "mailAuthToken"
  ],
  "definitions": definitions,
  "$schema": "http://json-schema.org/draft-07/schema#"
})
export const isCreateFamilyByMailTokenRequest: (value: unknown) => value is CreateFamilyByMailTokenRequest = ajv.compile({
  "type": "object",
  "properties": {
    "mailAuthToken": {
      "type": "string"
    },
    "parentPassword": {
      "$ref": "#/definitions/PlaintextParentPassword"
    },
    "parentDevice": {
      "$ref": "#/definitions/NewDeviceInfo"
    },
    "deviceName": {
      "type": "string"
    },
    "timeZone": {
      "type": "string"
    },
    "parentName": {
      "type": "string"
    },
    "clientLevel": {
      "type": "number"
    }
  },
  "additionalProperties": false,
  "required": [
    "deviceName",
    "mailAuthToken",
    "parentDevice",
    "parentName",
    "parentPassword",
    "timeZone"
  ],
  "definitions": definitions,
  "$schema": "http://json-schema.org/draft-07/schema#"
})
export const isSignIntoFamilyRequest: (value: unknown) => value is SignIntoFamilyRequest = ajv.compile({
  "type": "object",
  "properties": {
    "mailAuthToken": {
      "type": "string"
    },
    "parentDevice": {
      "$ref": "#/definitions/NewDeviceInfo"
    },
    "deviceName": {
      "type": "string"
    },
    "clientLevel": {
      "type": "number"
    }
  },
  "additionalProperties": false,
  "required": [
    "deviceName",
    "mailAuthToken",
    "parentDevice"
  ],
  "definitions": definitions,
  "$schema": "http://json-schema.org/draft-07/schema#"
})
export const isRecoverParentPasswordRequest: (value: unknown) => value is RecoverParentPasswordRequest = ajv.compile({
  "type": "object",
  "properties": {
    "mailAuthToken": {
      "type": "string"
    },
    "password": {
      "$ref": "#/definitions/PlaintextParentPassword"
    }
  },
  "additionalProperties": false,
  "required": [
    "mailAuthToken",
    "password"
  ],
  "definitions": definitions,
  "$schema": "http://json-schema.org/draft-07/schema#"
})
export const isRegisterChildDeviceRequest: (value: unknown) => value is RegisterChildDeviceRequest = ajv.compile({
  "type": "object",
  "properties": {
    "registerToken": {
      "type": "string"
    },
    "childDevice": {
      "$ref": "#/definitions/NewDeviceInfo"
    },
    "deviceName": {
      "type": "string"
    },
    "clientLevel": {
      "type": "number"
    }
  },
  "additionalProperties": false,
  "required": [
    "childDevice",
    "deviceName",
    "registerToken"
  ],
  "definitions": definitions,
  "$schema": "http://json-schema.org/draft-07/schema#"
})
export const isSerializedParentAction: (value: unknown) => value is SerializedParentAction = ajv.compile({
  "anyOf": [
    {
      "$ref": "#/definitions/SerializedAddCategoryAppsAction"
    },
    {
      "$ref": "#/definitions/SerializedAddCategoryNetworkIdAction"
    },
    {
      "$ref": "#/definitions/SerializedAddParentU2fKeyAction"
    },
    {
      "$ref": "#/definitions/SerializedAddUserAction"
    },
    {
      "$ref": "#/definitions/SerializedChangeParentPasswordAction"
    },
    {
      "$ref": "#/definitions/SerializedCreateCategoryAction"
    },
    {
      "$ref": "#/definitions/SerializedCreateTimelimtRuleAction"
    },
    {
      "$ref": "#/definitions/SerializedDeleteCategoryAction"
    },
    {
      "$ref": "#/definitions/SerializedDeleteChildTaskAction"
    },
    {
      "$ref": "#/definitions/SerializedDeleteTimeLimitRuleAction"
    },
    {
      "$ref": "#/definitions/SerializedIgnoreManipulationAction"
    },
    {
      "$ref": "#/definitions/SerializedIncrementCategoryExtraTimeAction"
    },
    {
      "$ref": "#/definitions/SerializedReportU2fLoginAction"
    },
    {
      "$ref": "#/definitions/SerializedRemoveCategoryAppsAction"
    },
    {
      "$ref": "#/definitions/SerializedRemoveParentU2fKeyAction"
    },
    {
      "$ref": "#/definitions/SerializedRemoveUserAction"
    },
    {
      "$ref": "#/definitions/SerializedRenameChildAction"
    },
    {
      "$ref": "#/definitions/SerializeResetCategoryNetworkIdsAction"
    },
    {
      "$ref": "#/definitions/SerializedReviewChildTaskAction"
    },
    {
      "$ref": "#/definitions/SerializedSetCategoryExtraTimeAction"
    },
    {
      "$ref": "#/definitions/SerializedSetCategoryForUnassignedAppsAction"
    },
    {
      "$ref": "#/definitions/SerializedSetChildPasswordAction"
    },
    {
      "$ref": "#/definitions/SerializedSetConsiderRebootManipulationAction"
    },
    {
      "$ref": "#/definitions/SerializedSetDeviceDefaultUserAction"
    },
    {
      "$ref": "#/definitions/SerializedSetDeviceDefaultUserTimeoutAction"
    },
    {
      "$ref": "#/definitions/SerializedSetDeviceUserAction"
    },
    {
      "$ref": "#/definitions/SerializedSetKeepSignedInAction"
    },
    {
      "$ref": "#/definitions/SerializedSetParentCategoryAction"
    },
    {
      "$ref": "#/definitions/SerializedSetRelaxPrimaryDeviceAction"
    },
    {
      "$ref": "#/definitions/SerializedSetSendDeviceConnected"
    },
    {
      "$ref": "#/definitions/SerializedSetUserDisableLimitsUntilAction"
    },
    {
      "$ref": "#/definitions/SerializedSetUserTimezoneAction"
    },
    {
      "$ref": "#/definitions/SerializedUpdateCategoryBatteryLimitAction"
    },
    {
      "$ref": "#/definitions/SerializedUpdateCategoryBlockAllNotificationsAction"
    },
    {
      "$ref": "#/definitions/SerializedUpdateCategoryBlockedTimesAction"
    },
    {
      "$ref": "#/definitions/SerializedUpdatCategoryDisableLimitsAction"
    },
    {
      "$ref": "#/definitions/SerializedUpdateCategoryFlagsAction"
    },
    {
      "$ref": "#/definitions/SerializedUpdateCategorySortingAction"
    },
    {
      "$ref": "#/definitions/SerializedUpdateCategoryTemporarilyBlockedAction"
    },
    {
      "$ref": "#/definitions/SerializedUpdateCategoryTimeWarningsAction"
    },
    {
      "$ref": "#/definitions/SerializedUpdateCategoryTitleAction"
    },
    {
      "$ref": "#/definitions/SerializedUpdateChildTaskAction"
    },
    {
      "$ref": "#/definitions/SerializedUpdateDeviceNameAction"
    },
    {
      "$ref": "#/definitions/SerializedUpdateEnableActivityLevelBlockingAction"
    },
    {
      "$ref": "#/definitions/SerialiizedUpdateNetworkTimeVerificationAction"
    },
    {
      "$ref": "#/definitions/SerializedUpdateParentNotificationFlagsAction"
    },
    {
      "$ref": "#/definitions/SerializedUpdateTimelimitRuleAction"
    },
    {
      "$ref": "#/definitions/SerializedUpdateUserFlagsAction"
    },
    {
      "$ref": "#/definitions/SerializedUpdateUserLimitLoginCategory"
    },
    {
      "$ref": "#/definitions/SerializedUpdateUserLimitLoginPreBlockDuration"
    }
  ],
  "definitions": definitions,
  "$schema": "http://json-schema.org/draft-07/schema#"
})
export const isSerializedAppLogicAction: (value: unknown) => value is SerializedAppLogicAction = ajv.compile({
  "anyOf": [
    {
      "$ref": "#/definitions/SerializedAddInstalledAppsAction"
    },
    {
      "$ref": "#/definitions/SerializedAddUsedTimeAction"
    },
    {
      "$ref": "#/definitions/SerializedAddUsedTimeActionVersion2"
    },
    {
      "$ref": "#/definitions/SerializedFinishKeyRequestAction"
    },
    {
      "$ref": "#/definitions/SerializedForceSyncAction"
    },
    {
      "$ref": "#/definitions/SerializedReplyToKeyRequestAction"
    },
    {
      "$ref": "#/definitions/SerializedMarkTaskPendingAction"
    },
    {
      "$ref": "#/definitions/SerializedPingAction"
    },
    {
      "$ref": "#/definitions/SerializedUpdateInstalledAppsAction"
    },
    {
      "$ref": "#/definitions/SerializedRemoveInstalledAppsAction"
    },
    {
      "$ref": "#/definitions/SerializedSendKeyRequestAction"
    },
    {
      "$ref": "#/definitions/SerializedSignOutAtDeviceAction"
    },
    {
      "$ref": "#/definitions/SerialiezdTriedDisablingDeviceAdminAction"
    },
    {
      "$ref": "#/definitions/SerializedUpdateAppActivitiesAction"
    },
    {
      "$ref": "#/definitions/SerializedUpdateDeviceStatusAction"
    },
    {
      "$ref": "#/definitions/SerializedUploadDevicePublicKeyAction"
    }
  ],
  "definitions": definitions,
  "$schema": "http://json-schema.org/draft-07/schema#"
})
export const isSerializedChildAction: (value: unknown) => value is SerializedChildAction = ajv.compile({
  "anyOf": [
    {
      "$ref": "#/definitions/SerializedChildChangePasswordAction"
    },
    {
      "$ref": "#/definitions/SerializedChildSignInAction"
    }
  ],
  "definitions": definitions,
  "$schema": "http://json-schema.org/draft-07/schema#"
})
export const isCreateRegisterDeviceTokenRequest: (value: unknown) => value is CreateRegisterDeviceTokenRequest = ajv.compile({
  "type": "object",
  "properties": {
    "deviceAuthToken": {
      "type": "string"
    },
    "parentId": {
      "type": "string"
    },
    "parentPasswordSecondHash": {
      "type": "string"
    }
  },
  "additionalProperties": false,
  "required": [
    "deviceAuthToken",
    "parentId",
    "parentPasswordSecondHash"
  ],
  "definitions": definitions,
  "$schema": "http://json-schema.org/draft-07/schema#"
})
export const isCanDoPurchaseRequest: (value: unknown) => value is CanDoPurchaseRequest = ajv.compile({
  "type": "object",
  "properties": {
    "type": {
      "enum": [
        "any",
        "googleplay"
      ],
      "type": "string"
    },
    "deviceAuthToken": {
      "type": "string"
    }
  },
  "additionalProperties": false,
  "required": [
    "deviceAuthToken"
  ],
  "definitions": definitions,
  "$schema": "http://json-schema.org/draft-07/schema#"
})
export const isLinkParentMailAddressRequest: (value: unknown) => value is LinkParentMailAddressRequest = ajv.compile({
  "type": "object",
  "properties": {
    "mailAuthToken": {
      "type": "string"
    },
    "deviceAuthToken": {
      "type": "string"
    },
    "parentUserId": {
      "type": "string"
    },
    "parentPasswordSecondHash": {
      "type": "string"
    }
  },
  "additionalProperties": false,
  "required": [
    "deviceAuthToken",
    "mailAuthToken",
    "parentPasswordSecondHash",
    "parentUserId"
  ],
  "definitions": definitions,
  "$schema": "http://json-schema.org/draft-07/schema#"
})
export const isUpdatePrimaryDeviceRequest: (value: unknown) => value is UpdatePrimaryDeviceRequest = ajv.compile({
  "type": "object",
  "properties": {
    "action": {
      "enum": [
        "set this device",
        "unset this device"
      ],
      "type": "string"
    },
    "currentUserId": {
      "type": "string"
    },
    "authToken": {
      "type": "string"
    }
  },
  "additionalProperties": false,
  "required": [
    "action",
    "authToken",
    "currentUserId"
  ],
  "definitions": definitions,
  "$schema": "http://json-schema.org/draft-07/schema#"
})
export const isRemoveDeviceRequest: (value: unknown) => value is RemoveDeviceRequest = ajv.compile({
  "type": "object",
  "properties": {
    "deviceAuthToken": {
      "type": "string"
    },
    "parentUserId": {
      "type": "string"
    },
    "parentPasswordSecondHash": {
      "type": "string"
    },
    "deviceId": {
      "type": "string"
    }
  },
  "additionalProperties": false,
  "required": [
    "deviceAuthToken",
    "deviceId",
    "parentPasswordSecondHash",
    "parentUserId"
  ],
  "definitions": definitions,
  "$schema": "http://json-schema.org/draft-07/schema#"
})
export const isRequestIdentityTokenRequest: (value: unknown) => value is RequestIdentityTokenRequest = ajv.compile({
  "type": "object",
  "properties": {
    "deviceAuthToken": {
      "type": "string"
    },
    "parentUserId": {
      "type": "string"
    },
    "parentPasswordSecondHash": {
      "type": "string"
    },
    "purpose": {
      "type": "string",
      "enum": [
        "purchase"
      ]
    }
  },
  "additionalProperties": false,
  "required": [
    "deviceAuthToken",
    "parentPasswordSecondHash",
    "parentUserId",
    "purpose"
  ],
  "definitions": definitions,
  "$schema": "http://json-schema.org/draft-07/schema#"
})
export const isRequestWithAuthToken: (value: unknown) => value is RequestWithAuthToken = ajv.compile({
  "type": "object",
  "properties": {
    "deviceAuthToken": {
      "type": "string"
    }
  },
  "additionalProperties": false,
  "required": [
    "deviceAuthToken"
  ],
  "definitions": definitions,
  "$schema": "http://json-schema.org/draft-07/schema#"
})
export const isSendMailLoginCodeRequest: (value: unknown) => value is SendMailLoginCodeRequest = ajv.compile({
  "type": "object",
  "properties": {
    "mail": {
      "type": "string"
    },
    "locale": {
      "type": "string"
    },
    "deviceAuthToken": {
      "type": "string"
    }
  },
  "additionalProperties": false,
  "required": [
    "locale",
    "mail"
  ],
  "definitions": definitions,
  "$schema": "http://json-schema.org/draft-07/schema#"
})
export const isSignInByMailCodeRequest: (value: unknown) => value is SignInByMailCodeRequest = ajv.compile({
  "type": "object",
  "properties": {
    "mailLoginToken": {
      "type": "string"
    },
    "receivedCode": {
      "type": "string"
    }
  },
  "additionalProperties": false,
  "required": [
    "mailLoginToken",
    "receivedCode"
  ],
  "definitions": definitions,
  "$schema": "http://json-schema.org/draft-07/schema#"
})
export const isIdentityTokenPayload: (value: unknown) => value is IdentityTokenPayload = ajv.compile({
  "additionalProperties": false,
  "type": "object",
  "properties": {
    "purpose": {
      "type": "string",
      "enum": [
        "purchase"
      ]
    },
    "familyId": {
      "type": "string"
    },
    "userId": {
      "type": "string"
    },
    "mail": {
      "type": "string"
    },
    "exp": {
      "type": "number"
    }
  },
  "required": [
    "exp",
    "familyId",
    "mail",
    "purpose",
    "userId"
  ],
  "definitions": definitions,
  "$schema": "http://json-schema.org/draft-07/schema#"
})
export const isDeleteAccountPayload: (value: unknown) => value is DeleteAccountPayload = ajv.compile({
  "type": "object",
  "properties": {
    "deviceAuthToken": {
      "type": "string"
    },
    "mailAuthTokens": {
      "type": "array",
      "items": {
        "type": "string"
      }
    }
  },
  "additionalProperties": false,
  "required": [
    "deviceAuthToken",
    "mailAuthTokens"
  ],
  "definitions": definitions,
  "$schema": "http://json-schema.org/draft-07/schema#"
})
