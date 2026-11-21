# SerializedChildChangePasswordAction Schema

```txt
https://timelimit.io/SerializedChildAction#/definitions/SerializedChildChangePasswordAction
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                      |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :---------------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedChildAction.schema.json\*](SerializedChildAction.schema.json "open original schema") |

## SerializedChildChangePasswordAction Type

`object` ([SerializedChildChangePasswordAction](serializedchildaction-definitions-serializedchildchangepasswordaction.md))

# SerializedChildChangePasswordAction Properties

| Property              | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                      |
| :-------------------- | :------- | :------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [type](#type)         | `string` | Required | cannot be null | [SerializedChildAction](serializedchildaction-definitions-serializedchildchangepasswordaction-properties-type.md "https://timelimit.io/SerializedChildAction#/definitions/SerializedChildChangePasswordAction/properties/type") |
| [password](#password) | `object` | Required | cannot be null | [SerializedChildAction](serializedchildaction-definitions-encryptableparentpassword.md "https://timelimit.io/SerializedChildAction#/definitions/SerializedChildChangePasswordAction/properties/password")                       |

## type



`type`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedChildAction](serializedchildaction-definitions-serializedchildchangepasswordaction-properties-type.md "https://timelimit.io/SerializedChildAction#/definitions/SerializedChildChangePasswordAction/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                     | Explanation |
| :------------------------ | :---------- |
| `"CHILD_CHANGE_PASSWORD"` |             |

## password



`password`

* is required

* Type: `object` ([EncryptableParentPassword](serializedchildaction-definitions-encryptableparentpassword.md))

* cannot be null

* defined in: [SerializedChildAction](serializedchildaction-definitions-encryptableparentpassword.md "https://timelimit.io/SerializedChildAction#/definitions/SerializedChildChangePasswordAction/properties/password")

### password Type

`object` ([EncryptableParentPassword](serializedchildaction-definitions-encryptableparentpassword.md))
