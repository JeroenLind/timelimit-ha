# PlaintextParentPassword Schema

```txt
https://timelimit.io/RecoverParentPasswordRequest#/definitions/PlaintextParentPassword
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                                    |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [RecoverParentPasswordRequest.schema.json\*](RecoverParentPasswordRequest.schema.json "open original schema") |

## PlaintextParentPassword Type

`object` ([PlaintextParentPassword](recoverparentpasswordrequest-definitions-plaintextparentpassword.md))

# PlaintextParentPassword Properties

| Property                  | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                               |
| :------------------------ | :------- | :------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [hash](#hash)             | `string` | Required | cannot be null | [RecoverParentPasswordRequest](recoverparentpasswordrequest-definitions-plaintextparentpassword-properties-hash.md "https://timelimit.io/RecoverParentPasswordRequest#/definitions/PlaintextParentPassword/properties/hash")             |
| [secondHash](#secondhash) | `string` | Required | cannot be null | [RecoverParentPasswordRequest](recoverparentpasswordrequest-definitions-plaintextparentpassword-properties-secondhash.md "https://timelimit.io/RecoverParentPasswordRequest#/definitions/PlaintextParentPassword/properties/secondHash") |
| [secondSalt](#secondsalt) | `string` | Required | cannot be null | [RecoverParentPasswordRequest](recoverparentpasswordrequest-definitions-plaintextparentpassword-properties-secondsalt.md "https://timelimit.io/RecoverParentPasswordRequest#/definitions/PlaintextParentPassword/properties/secondSalt") |

## hash



`hash`

* is required

* Type: `string`

* cannot be null

* defined in: [RecoverParentPasswordRequest](recoverparentpasswordrequest-definitions-plaintextparentpassword-properties-hash.md "https://timelimit.io/RecoverParentPasswordRequest#/definitions/PlaintextParentPassword/properties/hash")

### hash Type

`string`

## secondHash



`secondHash`

* is required

* Type: `string`

* cannot be null

* defined in: [RecoverParentPasswordRequest](recoverparentpasswordrequest-definitions-plaintextparentpassword-properties-secondhash.md "https://timelimit.io/RecoverParentPasswordRequest#/definitions/PlaintextParentPassword/properties/secondHash")

### secondHash Type

`string`

## secondSalt



`secondSalt`

* is required

* Type: `string`

* cannot be null

* defined in: [RecoverParentPasswordRequest](recoverparentpasswordrequest-definitions-plaintextparentpassword-properties-secondsalt.md "https://timelimit.io/RecoverParentPasswordRequest#/definitions/PlaintextParentPassword/properties/secondSalt")

### secondSalt Type

`string`
