# SerializedSetChildPasswordAction Schema

```txt
https://timelimit.io/SerializedParentAction#/definitions/SerializedSetChildPasswordAction
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                        |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedParentAction.schema.json\*](SerializedParentAction.schema.json "open original schema") |

## SerializedSetChildPasswordAction Type

`object` ([SerializedSetChildPasswordAction](serializedparentaction-definitions-serializedsetchildpasswordaction.md))

# SerializedSetChildPasswordAction Properties

| Property                    | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                         |
| :-------------------------- | :------- | :------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)               | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetchildpasswordaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetChildPasswordAction/properties/type")       |
| [childId](#childid)         | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetchildpasswordaction-properties-childid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetChildPasswordAction/properties/childId") |
| [newPassword](#newpassword) | `object` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-encryptableparentpassword.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetChildPasswordAction/properties/newPassword")                       |

## type



`type`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetchildpasswordaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetChildPasswordAction/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                  | Explanation |
| :--------------------- | :---------- |
| `"SET_CHILD_PASSWORD"` |             |

## childId



`childId`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetchildpasswordaction-properties-childid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetChildPasswordAction/properties/childId")

### childId Type

`string`

## newPassword



`newPassword`

* is required

* Type: `object` ([EncryptableParentPassword](serializedparentaction-definitions-encryptableparentpassword.md))

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-encryptableparentpassword.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetChildPasswordAction/properties/newPassword")

### newPassword Type

`object` ([EncryptableParentPassword](serializedparentaction-definitions-encryptableparentpassword.md))
