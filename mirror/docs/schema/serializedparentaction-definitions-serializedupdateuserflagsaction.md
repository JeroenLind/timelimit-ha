# SerializedUpdateUserFlagsAction Schema

```txt
https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateUserFlagsAction
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                        |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedParentAction.schema.json\*](SerializedParentAction.schema.json "open original schema") |

## SerializedUpdateUserFlagsAction Type

`object` ([SerializedUpdateUserFlagsAction](serializedparentaction-definitions-serializedupdateuserflagsaction.md))

# SerializedUpdateUserFlagsAction Properties

| Property              | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                         |
| :-------------------- | :------- | :------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)         | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdateuserflagsaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateUserFlagsAction/properties/type")         |
| [userId](#userid)     | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdateuserflagsaction-properties-userid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateUserFlagsAction/properties/userId")     |
| [modified](#modified) | `number` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdateuserflagsaction-properties-modified.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateUserFlagsAction/properties/modified") |
| [values](#values)     | `number` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdateuserflagsaction-properties-values.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateUserFlagsAction/properties/values")     |

## type



`type`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdateuserflagsaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateUserFlagsAction/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                 | Explanation |
| :-------------------- | :---------- |
| `"UPDATE_USER_FLAGS"` |             |

## userId



`userId`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdateuserflagsaction-properties-userid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateUserFlagsAction/properties/userId")

### userId Type

`string`

## modified



`modified`

* is required

* Type: `number`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdateuserflagsaction-properties-modified.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateUserFlagsAction/properties/modified")

### modified Type

`number`

## values



`values`

* is required

* Type: `number`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdateuserflagsaction-properties-values.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateUserFlagsAction/properties/values")

### values Type

`number`
