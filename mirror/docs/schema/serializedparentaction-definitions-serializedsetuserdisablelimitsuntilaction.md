# SerializedSetUserDisableLimitsUntilAction Schema

```txt
https://timelimit.io/SerializedParentAction#/definitions/SerializedSetUserDisableLimitsUntilAction
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                        |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedParentAction.schema.json\*](SerializedParentAction.schema.json "open original schema") |

## SerializedSetUserDisableLimitsUntilAction Type

`object` ([SerializedSetUserDisableLimitsUntilAction](serializedparentaction-definitions-serializedsetuserdisablelimitsuntilaction.md))

# SerializedSetUserDisableLimitsUntilAction Properties

| Property            | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                                           |
| :------------------ | :------- | :------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)       | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetuserdisablelimitsuntilaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetUserDisableLimitsUntilAction/properties/type")       |
| [childId](#childid) | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetuserdisablelimitsuntilaction-properties-childid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetUserDisableLimitsUntilAction/properties/childId") |
| [time](#time)       | `number` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetuserdisablelimitsuntilaction-properties-time.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetUserDisableLimitsUntilAction/properties/time")       |

## type



`type`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetuserdisablelimitsuntilaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetUserDisableLimitsUntilAction/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                             | Explanation |
| :-------------------------------- | :---------- |
| `"SET_USER_DISABLE_LIMITS_UNTIL"` |             |

## childId



`childId`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetuserdisablelimitsuntilaction-properties-childid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetUserDisableLimitsUntilAction/properties/childId")

### childId Type

`string`

## time



`time`

* is required

* Type: `number`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetuserdisablelimitsuntilaction-properties-time.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetUserDisableLimitsUntilAction/properties/time")

### time Type

`number`
