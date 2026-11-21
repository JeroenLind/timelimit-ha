# SerializedRemoveUserAction Schema

```txt
https://timelimit.io/SerializedParentAction#/definitions/SerializedRemoveUserAction
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                        |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedParentAction.schema.json\*](SerializedParentAction.schema.json "open original schema") |

## SerializedRemoveUserAction Type

`object` ([SerializedRemoveUserAction](serializedparentaction-definitions-serializedremoveuseraction.md))

# SerializedRemoveUserAction Properties

| Property                          | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                           |
| :-------------------------------- | :------- | :------- | :------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)                     | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedremoveuseraction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedRemoveUserAction/properties/type")                     |
| [userId](#userid)                 | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedremoveuseraction-properties-userid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedRemoveUserAction/properties/userId")                 |
| [authentication](#authentication) | `string` | Optional | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedremoveuseraction-properties-authentication.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedRemoveUserAction/properties/authentication") |

## type



`type`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedremoveuseraction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedRemoveUserAction/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value           | Explanation |
| :-------------- | :---------- |
| `"REMOVE_USER"` |             |

## userId



`userId`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedremoveuseraction-properties-userid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedRemoveUserAction/properties/userId")

### userId Type

`string`

## authentication



`authentication`

* is optional

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedremoveuseraction-properties-authentication.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedRemoveUserAction/properties/authentication")

### authentication Type

`string`
