# SerializedSetUserTimezoneAction Schema

```txt
https://timelimit.io/SerializedParentAction#/definitions/SerializedSetUserTimezoneAction
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                        |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedParentAction.schema.json\*](SerializedParentAction.schema.json "open original schema") |

## SerializedSetUserTimezoneAction Type

`object` ([SerializedSetUserTimezoneAction](serializedparentaction-definitions-serializedsetusertimezoneaction.md))

# SerializedSetUserTimezoneAction Properties

| Property              | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                         |
| :-------------------- | :------- | :------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)         | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetusertimezoneaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetUserTimezoneAction/properties/type")         |
| [userId](#userid)     | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetusertimezoneaction-properties-userid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetUserTimezoneAction/properties/userId")     |
| [timezone](#timezone) | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetusertimezoneaction-properties-timezone.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetUserTimezoneAction/properties/timezone") |

## type



`type`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetusertimezoneaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetUserTimezoneAction/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                 | Explanation |
| :-------------------- | :---------- |
| `"SET_USER_TIMEZONE"` |             |

## userId



`userId`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetusertimezoneaction-properties-userid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetUserTimezoneAction/properties/userId")

### userId Type

`string`

## timezone



`timezone`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetusertimezoneaction-properties-timezone.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetUserTimezoneAction/properties/timezone")

### timezone Type

`string`
