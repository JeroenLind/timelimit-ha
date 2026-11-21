# SerializedChangeParentPasswordAction Schema

```txt
https://timelimit.io/SerializedParentAction#/definitions/SerializedChangeParentPasswordAction
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                        |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedParentAction.schema.json\*](SerializedParentAction.schema.json "open original schema") |

## SerializedChangeParentPasswordAction Type

`object` ([SerializedChangeParentPasswordAction](serializedparentaction-definitions-serializedchangeparentpasswordaction.md))

# SerializedChangeParentPasswordAction Properties

| Property                                    | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                                                         |
| :------------------------------------------ | :------- | :------- | :------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)                               | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedchangeparentpasswordaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedChangeParentPasswordAction/properties/type")                               |
| [userId](#userid)                           | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedchangeparentpasswordaction-properties-userid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedChangeParentPasswordAction/properties/userId")                           |
| [hash](#hash)                               | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedchangeparentpasswordaction-properties-hash.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedChangeParentPasswordAction/properties/hash")                               |
| [secondSalt](#secondsalt)                   | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedchangeparentpasswordaction-properties-secondsalt.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedChangeParentPasswordAction/properties/secondSalt")                   |
| [secondHashEncrypted](#secondhashencrypted) | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedchangeparentpasswordaction-properties-secondhashencrypted.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedChangeParentPasswordAction/properties/secondHashEncrypted") |
| [integrity](#integrity)                     | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedchangeparentpasswordaction-properties-integrity.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedChangeParentPasswordAction/properties/integrity")                     |

## type



`type`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedchangeparentpasswordaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedChangeParentPasswordAction/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                      | Explanation |
| :------------------------- | :---------- |
| `"CHANGE_PARENT_PASSWORD"` |             |

## userId



`userId`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedchangeparentpasswordaction-properties-userid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedChangeParentPasswordAction/properties/userId")

### userId Type

`string`

## hash



`hash`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedchangeparentpasswordaction-properties-hash.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedChangeParentPasswordAction/properties/hash")

### hash Type

`string`

## secondSalt



`secondSalt`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedchangeparentpasswordaction-properties-secondsalt.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedChangeParentPasswordAction/properties/secondSalt")

### secondSalt Type

`string`

## secondHashEncrypted



`secondHashEncrypted`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedchangeparentpasswordaction-properties-secondhashencrypted.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedChangeParentPasswordAction/properties/secondHashEncrypted")

### secondHashEncrypted Type

`string`

## integrity



`integrity`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedchangeparentpasswordaction-properties-integrity.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedChangeParentPasswordAction/properties/integrity")

### integrity Type

`string`
