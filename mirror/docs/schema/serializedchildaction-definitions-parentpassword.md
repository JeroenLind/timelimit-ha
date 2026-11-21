# ParentPassword Schema

```txt
https://timelimit.io/SerializedChildAction#/definitions/ParentPassword
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                      |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :---------------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedChildAction.schema.json\*](SerializedChildAction.schema.json "open original schema") |

## ParentPassword Type

`object` ([ParentPassword](serializedchildaction-definitions-parentpassword.md))

# ParentPassword Properties

| Property                  | Type     | Required | Nullable       | Defined by                                                                                                                                                                                        |
| :------------------------ | :------- | :------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [hash](#hash)             | `string` | Required | cannot be null | [SerializedChildAction](serializedchildaction-definitions-parentpassword-properties-hash.md "https://timelimit.io/SerializedChildAction#/definitions/ParentPassword/properties/hash")             |
| [secondHash](#secondhash) | `string` | Required | cannot be null | [SerializedChildAction](serializedchildaction-definitions-parentpassword-properties-secondhash.md "https://timelimit.io/SerializedChildAction#/definitions/ParentPassword/properties/secondHash") |
| [secondSalt](#secondsalt) | `string` | Required | cannot be null | [SerializedChildAction](serializedchildaction-definitions-parentpassword-properties-secondsalt.md "https://timelimit.io/SerializedChildAction#/definitions/ParentPassword/properties/secondSalt") |

## hash



`hash`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [SerializedChildAction](serializedchildaction-definitions-parentpassword-properties-hash.md "https://timelimit.io/SerializedChildAction#/definitions/ParentPassword/properties/hash")

### hash Type

`string`

## secondHash



`secondHash`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [SerializedChildAction](serializedchildaction-definitions-parentpassword-properties-secondhash.md "https://timelimit.io/SerializedChildAction#/definitions/ParentPassword/properties/secondHash")

### secondHash Type

`string`

## secondSalt



`secondSalt`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [SerializedChildAction](serializedchildaction-definitions-parentpassword-properties-secondsalt.md "https://timelimit.io/SerializedChildAction#/definitions/ParentPassword/properties/secondSalt")

### secondSalt Type

`string`
