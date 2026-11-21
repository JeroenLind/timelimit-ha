# SerializedUpdateEnableActivityLevelBlockingAction Schema

```txt
https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateEnableActivityLevelBlockingAction
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                        |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedParentAction.schema.json\*](SerializedParentAction.schema.json "open original schema") |

## SerializedUpdateEnableActivityLevelBlockingAction Type

`object` ([SerializedUpdateEnableActivityLevelBlockingAction](serializedparentaction-definitions-serializedupdateenableactivitylevelblockingaction.md))

# SerializedUpdateEnableActivityLevelBlockingAction Properties

| Property              | Type      | Required | Nullable       | Defined by                                                                                                                                                                                                                                                             |
| :-------------------- | :-------- | :------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)         | `string`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdateenableactivitylevelblockingaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateEnableActivityLevelBlockingAction/properties/type")         |
| [deviceId](#deviceid) | `string`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdateenableactivitylevelblockingaction-properties-deviceid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateEnableActivityLevelBlockingAction/properties/deviceId") |
| [enable](#enable)     | `boolean` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdateenableactivitylevelblockingaction-properties-enable.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateEnableActivityLevelBlockingAction/properties/enable")     |

## type



`type`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdateenableactivitylevelblockingaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateEnableActivityLevelBlockingAction/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                                     | Explanation |
| :---------------------------------------- | :---------- |
| `"UPDATE_ENABLE_ACTIVITY_LEVEL_BLOCKING"` |             |

## deviceId



`deviceId`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdateenableactivitylevelblockingaction-properties-deviceid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateEnableActivityLevelBlockingAction/properties/deviceId")

### deviceId Type

`string`

## enable



`enable`

* is required

* Type: `boolean`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdateenableactivitylevelblockingaction-properties-enable.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateEnableActivityLevelBlockingAction/properties/enable")

### enable Type

`boolean`
