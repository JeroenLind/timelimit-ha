# SerializedAddUserAction Schema

```txt
https://timelimit.io/SerializedParentAction#/definitions/SerializedAddUserAction
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                        |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedParentAction.schema.json\*](SerializedParentAction.schema.json "open original schema") |

## SerializedAddUserAction Type

`object` ([SerializedAddUserAction](serializedparentaction-definitions-serializedadduseraction.md))

# SerializedAddUserAction Properties

| Property              | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                         |
| :-------------------- | :------- | :------- | :------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)         | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedadduseraction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedAddUserAction/properties/type")         |
| [name](#name)         | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedadduseraction-properties-name.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedAddUserAction/properties/name")         |
| [userType](#usertype) | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedadduseraction-properties-usertype.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedAddUserAction/properties/userType") |
| [userId](#userid)     | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedadduseraction-properties-userid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedAddUserAction/properties/userId")     |
| [password](#password) | `object` | Optional | cannot be null | [SerializedParentAction](serializedparentaction-definitions-encryptableparentpassword.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedAddUserAction/properties/password")                   |
| [timeZone](#timezone) | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedadduseraction-properties-timezone.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedAddUserAction/properties/timeZone") |

## type



`type`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedadduseraction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedAddUserAction/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value        | Explanation |
| :----------- | :---------- |
| `"ADD_USER"` |             |

## name



`name`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedadduseraction-properties-name.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedAddUserAction/properties/name")

### name Type

`string`

## userType



`userType`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedadduseraction-properties-usertype.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedAddUserAction/properties/userType")

### userType Type

`string`

### userType Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value      | Explanation |
| :--------- | :---------- |
| `"child"`  |             |
| `"parent"` |             |

## userId



`userId`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedadduseraction-properties-userid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedAddUserAction/properties/userId")

### userId Type

`string`

## password



`password`

* is optional

* Type: `object` ([EncryptableParentPassword](serializedparentaction-definitions-encryptableparentpassword.md))

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-encryptableparentpassword.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedAddUserAction/properties/password")

### password Type

`object` ([EncryptableParentPassword](serializedparentaction-definitions-encryptableparentpassword.md))

## timeZone



`timeZone`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedadduseraction-properties-timezone.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedAddUserAction/properties/timeZone")

### timeZone Type

`string`
