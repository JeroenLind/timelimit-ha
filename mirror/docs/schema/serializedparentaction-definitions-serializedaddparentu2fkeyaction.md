# SerializedAddParentU2fKeyAction Schema

```txt
https://timelimit.io/SerializedParentAction#/definitions/SerializedAddParentU2fKeyAction
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                        |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedParentAction.schema.json\*](SerializedParentAction.schema.json "open original schema") |

## SerializedAddParentU2fKeyAction Type

`object` ([SerializedAddParentU2fKeyAction](serializedparentaction-definitions-serializedaddparentu2fkeyaction.md))

# SerializedAddParentU2fKeyAction Properties

| Property                | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                           |
| :---------------------- | :------- | :------- | :------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)           | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedaddparentu2fkeyaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedAddParentU2fKeyAction/properties/type")           |
| [keyHandle](#keyhandle) | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedaddparentu2fkeyaction-properties-keyhandle.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedAddParentU2fKeyAction/properties/keyHandle") |
| [publicKey](#publickey) | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedaddparentu2fkeyaction-properties-publickey.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedAddParentU2fKeyAction/properties/publicKey") |

## type



`type`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedaddparentu2fkeyaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedAddParentU2fKeyAction/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value              | Explanation |
| :----------------- | :---------- |
| `"ADD_PARENT_U2F"` |             |

## keyHandle



`keyHandle`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedaddparentu2fkeyaction-properties-keyhandle.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedAddParentU2fKeyAction/properties/keyHandle")

### keyHandle Type

`string`

## publicKey



`publicKey`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedaddparentu2fkeyaction-properties-publickey.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedAddParentU2fKeyAction/properties/publicKey")

### publicKey Type

`string`
