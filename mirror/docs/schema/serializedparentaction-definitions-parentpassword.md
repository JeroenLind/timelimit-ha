# ParentPassword Schema

```txt
https://timelimit.io/SerializedParentAction#/definitions/SerializedSetChildPasswordAction/properties/newPassword
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                        |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedParentAction.schema.json\*](SerializedParentAction.schema.json "open original schema") |

## newPassword Type

`object` ([ParentPassword](serializedparentaction-definitions-parentpassword.md))

# newPassword Properties

| Property                  | Type     | Required | Nullable       | Defined by                                                                                                                                                                                           |
| :------------------------ | :------- | :------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [hash](#hash)             | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-parentpassword-properties-hash.md "https://timelimit.io/SerializedParentAction#/definitions/ParentPassword/properties/hash")             |
| [secondHash](#secondhash) | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-parentpassword-properties-secondhash.md "https://timelimit.io/SerializedParentAction#/definitions/ParentPassword/properties/secondHash") |
| [secondSalt](#secondsalt) | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-parentpassword-properties-secondsalt.md "https://timelimit.io/SerializedParentAction#/definitions/ParentPassword/properties/secondSalt") |

## hash



`hash`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [SerializedParentAction](serializedparentaction-definitions-parentpassword-properties-hash.md "https://timelimit.io/SerializedParentAction#/definitions/ParentPassword/properties/hash")

### hash Type

`string`

## secondHash



`secondHash`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [SerializedParentAction](serializedparentaction-definitions-parentpassword-properties-secondhash.md "https://timelimit.io/SerializedParentAction#/definitions/ParentPassword/properties/secondHash")

### secondHash Type

`string`

## secondSalt



`secondSalt`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [SerializedParentAction](serializedparentaction-definitions-parentpassword-properties-secondsalt.md "https://timelimit.io/SerializedParentAction#/definitions/ParentPassword/properties/secondSalt")

### secondSalt Type

`string`
