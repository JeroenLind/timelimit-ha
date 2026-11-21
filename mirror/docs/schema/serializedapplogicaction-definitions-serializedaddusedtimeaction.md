# SerializedAddUsedTimeAction Schema

```txt
https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedAddUsedTimeAction
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                            |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :---------------------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedAppLogicAction.schema.json\*](SerializedAppLogicAction.schema.json "open original schema") |

## SerializedAddUsedTimeAction Type

`object` ([SerializedAddUsedTimeAction](serializedapplogicaction-definitions-serializedaddusedtimeaction.md))

# SerializedAddUsedTimeAction Properties

| Property                                    | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                                             |
| :------------------------------------------ | :------- | :------- | :------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)                               | `string` | Required | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedaddusedtimeaction-properties-type.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedAddUsedTimeAction/properties/type")                               |
| [categoryId](#categoryid)                   | `string` | Required | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedaddusedtimeaction-properties-categoryid.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedAddUsedTimeAction/properties/categoryId")                   |
| [day](#day)                                 | `number` | Required | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedaddusedtimeaction-properties-day.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedAddUsedTimeAction/properties/day")                                 |
| [timeToAdd](#timetoadd)                     | `number` | Required | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedaddusedtimeaction-properties-timetoadd.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedAddUsedTimeAction/properties/timeToAdd")                     |
| [extraTimeToSubtract](#extratimetosubtract) | `number` | Required | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedaddusedtimeaction-properties-extratimetosubtract.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedAddUsedTimeAction/properties/extraTimeToSubtract") |

## type



`type`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedaddusedtimeaction-properties-type.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedAddUsedTimeAction/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value             | Explanation |
| :---------------- | :---------- |
| `"ADD_USED_TIME"` |             |

## categoryId



`categoryId`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedaddusedtimeaction-properties-categoryid.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedAddUsedTimeAction/properties/categoryId")

### categoryId Type

`string`

## day



`day`

* is required

* Type: `number`

* cannot be null

* defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedaddusedtimeaction-properties-day.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedAddUsedTimeAction/properties/day")

### day Type

`number`

## timeToAdd



`timeToAdd`

* is required

* Type: `number`

* cannot be null

* defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedaddusedtimeaction-properties-timetoadd.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedAddUsedTimeAction/properties/timeToAdd")

### timeToAdd Type

`number`

## extraTimeToSubtract



`extraTimeToSubtract`

* is required

* Type: `number`

* cannot be null

* defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedaddusedtimeaction-properties-extratimetosubtract.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedAddUsedTimeAction/properties/extraTimeToSubtract")

### extraTimeToSubtract Type

`number`
