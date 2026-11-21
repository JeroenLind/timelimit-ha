# SerializedUpdateAppActivitiesAction Schema

```txt
https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUpdateAppActivitiesAction
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                            |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :---------------------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedAppLogicAction.schema.json\*](SerializedAppLogicAction.schema.json "open original schema") |

## SerializedUpdateAppActivitiesAction Type

`object` ([SerializedUpdateAppActivitiesAction](serializedapplogicaction-definitions-serializedupdateappactivitiesaction.md))

# SerializedUpdateAppActivitiesAction Properties

| Property                          | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                                                   |
| :-------------------------------- | :------- | :------- | :------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)                     | `string` | Required | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdateappactivitiesaction-properties-type.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUpdateAppActivitiesAction/properties/type")                     |
| [removed](#removed)               | `array`  | Required | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdateappactivitiesaction-properties-removed.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUpdateAppActivitiesAction/properties/removed")               |
| [updatedOrAdded](#updatedoradded) | `array`  | Required | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdateappactivitiesaction-properties-updatedoradded.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUpdateAppActivitiesAction/properties/updatedOrAdded") |

## type



`type`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdateappactivitiesaction-properties-type.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUpdateAppActivitiesAction/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                     | Explanation |
| :------------------------ | :---------- |
| `"UPDATE_APP_ACTIVITIES"` |             |

## removed



`removed`

* is required

* Type: an array where each item follows the corresponding schema in the following list:

  1. [Untitled string in SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdateappactivitiesaction-properties-removed-items-items-0.md "check type definition")

  2. [Untitled string in SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdateappactivitiesaction-properties-removed-items-items-1.md "check type definition")

* cannot be null

* defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdateappactivitiesaction-properties-removed.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUpdateAppActivitiesAction/properties/removed")

### removed Type

an array where each item follows the corresponding schema in the following list:

1. [Untitled string in SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdateappactivitiesaction-properties-removed-items-items-0.md "check type definition")

2. [Untitled string in SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdateappactivitiesaction-properties-removed-items-items-1.md "check type definition")

## updatedOrAdded



`updatedOrAdded`

* is required

* Type: `object[]` ([SerializedAppActivityItem](serializedapplogicaction-definitions-serializedappactivityitem.md))

* cannot be null

* defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdateappactivitiesaction-properties-updatedoradded.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUpdateAppActivitiesAction/properties/updatedOrAdded")

### updatedOrAdded Type

`object[]` ([SerializedAppActivityItem](serializedapplogicaction-definitions-serializedappactivityitem.md))
