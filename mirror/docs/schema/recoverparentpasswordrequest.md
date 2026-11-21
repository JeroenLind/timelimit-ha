# RecoverParentPasswordRequest Schema

```txt
https://timelimit.io/RecoverParentPasswordRequest
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                                  |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :---------------------------------------------------------------------------------------------------------- |
| Can be instantiated | Yes        | Unknown status | No           | Forbidden         | Forbidden             | none                | [RecoverParentPasswordRequest.schema.json](RecoverParentPasswordRequest.schema.json "open original schema") |

## RecoverParentPasswordRequest Type

`object` ([RecoverParentPasswordRequest](recoverparentpasswordrequest.md))

# RecoverParentPasswordRequest Properties

| Property                        | Type     | Required | Nullable       | Defined by                                                                                                                                                                   |
| :------------------------------ | :------- | :------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [mailAuthToken](#mailauthtoken) | `string` | Required | cannot be null | [RecoverParentPasswordRequest](recoverparentpasswordrequest-properties-mailauthtoken.md "https://timelimit.io/RecoverParentPasswordRequest#/properties/mailAuthToken")       |
| [password](#password)           | `object` | Required | cannot be null | [RecoverParentPasswordRequest](recoverparentpasswordrequest-definitions-plaintextparentpassword.md "https://timelimit.io/RecoverParentPasswordRequest#/properties/password") |

## mailAuthToken



`mailAuthToken`

* is required

* Type: `string`

* cannot be null

* defined in: [RecoverParentPasswordRequest](recoverparentpasswordrequest-properties-mailauthtoken.md "https://timelimit.io/RecoverParentPasswordRequest#/properties/mailAuthToken")

### mailAuthToken Type

`string`

## password



`password`

* is required

* Type: `object` ([PlaintextParentPassword](recoverparentpasswordrequest-definitions-plaintextparentpassword.md))

* cannot be null

* defined in: [RecoverParentPasswordRequest](recoverparentpasswordrequest-definitions-plaintextparentpassword.md "https://timelimit.io/RecoverParentPasswordRequest#/properties/password")

### password Type

`object` ([PlaintextParentPassword](recoverparentpasswordrequest-definitions-plaintextparentpassword.md))

# RecoverParentPasswordRequest Definitions

## Definitions group PlaintextParentPassword

Reference this group by using

```json
{"$ref":"https://timelimit.io/RecoverParentPasswordRequest#/definitions/PlaintextParentPassword"}
```

| Property                  | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                               |
| :------------------------ | :------- | :------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [hash](#hash)             | `string` | Required | cannot be null | [RecoverParentPasswordRequest](recoverparentpasswordrequest-definitions-plaintextparentpassword-properties-hash.md "https://timelimit.io/RecoverParentPasswordRequest#/definitions/PlaintextParentPassword/properties/hash")             |
| [secondHash](#secondhash) | `string` | Required | cannot be null | [RecoverParentPasswordRequest](recoverparentpasswordrequest-definitions-plaintextparentpassword-properties-secondhash.md "https://timelimit.io/RecoverParentPasswordRequest#/definitions/PlaintextParentPassword/properties/secondHash") |
| [secondSalt](#secondsalt) | `string` | Required | cannot be null | [RecoverParentPasswordRequest](recoverparentpasswordrequest-definitions-plaintextparentpassword-properties-secondsalt.md "https://timelimit.io/RecoverParentPasswordRequest#/definitions/PlaintextParentPassword/properties/secondSalt") |

### hash



`hash`

* is required

* Type: `string`

* cannot be null

* defined in: [RecoverParentPasswordRequest](recoverparentpasswordrequest-definitions-plaintextparentpassword-properties-hash.md "https://timelimit.io/RecoverParentPasswordRequest#/definitions/PlaintextParentPassword/properties/hash")

#### hash Type

`string`

### secondHash



`secondHash`

* is required

* Type: `string`

* cannot be null

* defined in: [RecoverParentPasswordRequest](recoverparentpasswordrequest-definitions-plaintextparentpassword-properties-secondhash.md "https://timelimit.io/RecoverParentPasswordRequest#/definitions/PlaintextParentPassword/properties/secondHash")

#### secondHash Type

`string`

### secondSalt



`secondSalt`

* is required

* Type: `string`

* cannot be null

* defined in: [RecoverParentPasswordRequest](recoverparentpasswordrequest-definitions-plaintextparentpassword-properties-secondsalt.md "https://timelimit.io/RecoverParentPasswordRequest#/definitions/PlaintextParentPassword/properties/secondSalt")

#### secondSalt Type

`string`
