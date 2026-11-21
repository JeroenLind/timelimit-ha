# SerialiizedUpdateNetworkTimeVerificationAction Schema

```txt
https://timelimit.io/SerializedParentAction#/definitions/SerialiizedUpdateNetworkTimeVerificationAction
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                        |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedParentAction.schema.json\*](SerializedParentAction.schema.json "open original schema") |

## SerialiizedUpdateNetworkTimeVerificationAction Type

`object` ([SerialiizedUpdateNetworkTimeVerificationAction](serializedparentaction-definitions-serialiizedupdatenetworktimeverificationaction.md))

# SerialiizedUpdateNetworkTimeVerificationAction Properties

| Property              | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                                                       |
| :-------------------- | :------- | :------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)         | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serialiizedupdatenetworktimeverificationaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerialiizedUpdateNetworkTimeVerificationAction/properties/type")         |
| [deviceId](#deviceid) | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serialiizedupdatenetworktimeverificationaction-properties-deviceid.md "https://timelimit.io/SerializedParentAction#/definitions/SerialiizedUpdateNetworkTimeVerificationAction/properties/deviceId") |
| [mode](#mode)         | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serialiizedupdatenetworktimeverificationaction-properties-mode.md "https://timelimit.io/SerializedParentAction#/definitions/SerialiizedUpdateNetworkTimeVerificationAction/properties/mode")         |

## type



`type`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serialiizedupdatenetworktimeverificationaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerialiizedUpdateNetworkTimeVerificationAction/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                                | Explanation |
| :----------------------------------- | :---------- |
| `"UPDATE_NETWORK_TIME_VERIFICATION"` |             |

## deviceId



`deviceId`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serialiizedupdatenetworktimeverificationaction-properties-deviceid.md "https://timelimit.io/SerializedParentAction#/definitions/SerialiizedUpdateNetworkTimeVerificationAction/properties/deviceId")

### deviceId Type

`string`

## mode



`mode`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serialiizedupdatenetworktimeverificationaction-properties-mode.md "https://timelimit.io/SerializedParentAction#/definitions/SerialiizedUpdateNetworkTimeVerificationAction/properties/mode")

### mode Type

`string`

### mode Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value           | Explanation |
| :-------------- | :---------- |
| `"disabled"`    |             |
| `"enabled"`     |             |
| `"if possible"` |             |
