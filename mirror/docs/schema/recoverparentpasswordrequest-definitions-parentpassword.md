# ParentPassword Schema

```txt
https://timelimit.io/RecoverParentPasswordRequest#/definitions/ParentPassword
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                                    |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [RecoverParentPasswordRequest.schema.json\*](RecoverParentPasswordRequest.schema.json "open original schema") |

## ParentPassword Type

`object` ([ParentPassword](recoverparentpasswordrequest-definitions-parentpassword.md))

# ParentPassword Properties

| Property                  | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                             |
| :------------------------ | :------- | :------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [hash](#hash)             | `string` | Required | cannot be null | [RecoverParentPasswordRequest](recoverparentpasswordrequest-definitions-parentpassword-properties-hash.md "https://timelimit.io/RecoverParentPasswordRequest#/definitions/ParentPassword/properties/hash")             |
| [secondHash](#secondhash) | `string` | Required | cannot be null | [RecoverParentPasswordRequest](recoverparentpasswordrequest-definitions-parentpassword-properties-secondhash.md "https://timelimit.io/RecoverParentPasswordRequest#/definitions/ParentPassword/properties/secondHash") |
| [secondSalt](#secondsalt) | `string` | Required | cannot be null | [RecoverParentPasswordRequest](recoverparentpasswordrequest-definitions-parentpassword-properties-secondsalt.md "https://timelimit.io/RecoverParentPasswordRequest#/definitions/ParentPassword/properties/secondSalt") |

## hash



`hash`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [RecoverParentPasswordRequest](recoverparentpasswordrequest-definitions-parentpassword-properties-hash.md "https://timelimit.io/RecoverParentPasswordRequest#/definitions/ParentPassword/properties/hash")

### hash Type

`string`

## secondHash



`secondHash`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [RecoverParentPasswordRequest](recoverparentpasswordrequest-definitions-parentpassword-properties-secondhash.md "https://timelimit.io/RecoverParentPasswordRequest#/definitions/ParentPassword/properties/secondHash")

### secondHash Type

`string`

## secondSalt



`secondSalt`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [RecoverParentPasswordRequest](recoverparentpasswordrequest-definitions-parentpassword-properties-secondsalt.md "https://timelimit.io/RecoverParentPasswordRequest#/definitions/ParentPassword/properties/secondSalt")

### secondSalt Type

`string`
