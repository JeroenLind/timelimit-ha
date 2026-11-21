# SerializedChildAction Schema

```txt
https://timelimit.io/SerializedChildAction
```



| Abstract               | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                    |
| :--------------------- | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :-------------------------------------------------------------------------------------------- |
| Cannot be instantiated | Yes        | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [SerializedChildAction.schema.json](SerializedChildAction.schema.json "open original schema") |

## SerializedChildAction Type

merged type ([SerializedChildAction](serializedchildaction.md))

any of

* [SerializedChildChangePasswordAction](serializedchildaction-definitions-serializedchildchangepasswordaction.md "check type definition")

* [SerializedChildSignInAction](serializedchildaction-definitions-serializedchildsigninaction.md "check type definition")

# SerializedChildAction Definitions

## Definitions group SerializedChildChangePasswordAction

Reference this group by using

```json
{"$ref":"https://timelimit.io/SerializedChildAction#/definitions/SerializedChildChangePasswordAction"}
```

| Property              | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                      |
| :-------------------- | :------- | :------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [type](#type)         | `string` | Required | cannot be null | [SerializedChildAction](serializedchildaction-definitions-serializedchildchangepasswordaction-properties-type.md "https://timelimit.io/SerializedChildAction#/definitions/SerializedChildChangePasswordAction/properties/type") |
| [password](#password) | `object` | Required | cannot be null | [SerializedChildAction](serializedchildaction-definitions-encryptableparentpassword.md "https://timelimit.io/SerializedChildAction#/definitions/SerializedChildChangePasswordAction/properties/password")                       |

### type



`type`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedChildAction](serializedchildaction-definitions-serializedchildchangepasswordaction-properties-type.md "https://timelimit.io/SerializedChildAction#/definitions/SerializedChildChangePasswordAction/properties/type")

#### type Type

`string`

#### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                     | Explanation |
| :------------------------ | :---------- |
| `"CHILD_CHANGE_PASSWORD"` |             |

### password



`password`

* is required

* Type: `object` ([EncryptableParentPassword](serializedchildaction-definitions-encryptableparentpassword.md))

* cannot be null

* defined in: [SerializedChildAction](serializedchildaction-definitions-encryptableparentpassword.md "https://timelimit.io/SerializedChildAction#/definitions/SerializedChildChangePasswordAction/properties/password")

#### password Type

`object` ([EncryptableParentPassword](serializedchildaction-definitions-encryptableparentpassword.md))

## Definitions group EncryptableParentPassword

Reference this group by using

```json
{"$ref":"https://timelimit.io/SerializedChildAction#/definitions/EncryptableParentPassword"}
```

| Property                  | Type      | Required | Nullable       | Defined by                                                                                                                                                                                                              |
| :------------------------ | :-------- | :------- | :------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [hash](#hash)             | `string`  | Required | cannot be null | [SerializedChildAction](serializedchildaction-definitions-encryptableparentpassword-properties-hash.md "https://timelimit.io/SerializedChildAction#/definitions/EncryptableParentPassword/properties/hash")             |
| [secondHash](#secondhash) | `string`  | Required | cannot be null | [SerializedChildAction](serializedchildaction-definitions-encryptableparentpassword-properties-secondhash.md "https://timelimit.io/SerializedChildAction#/definitions/EncryptableParentPassword/properties/secondHash") |
| [secondSalt](#secondsalt) | `string`  | Required | cannot be null | [SerializedChildAction](serializedchildaction-definitions-encryptableparentpassword-properties-secondsalt.md "https://timelimit.io/SerializedChildAction#/definitions/EncryptableParentPassword/properties/secondSalt") |
| [encrypted](#encrypted)   | `boolean` | Optional | cannot be null | [SerializedChildAction](serializedchildaction-definitions-encryptableparentpassword-properties-encrypted.md "https://timelimit.io/SerializedChildAction#/definitions/EncryptableParentPassword/properties/encrypted")   |

### hash



`hash`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedChildAction](serializedchildaction-definitions-encryptableparentpassword-properties-hash.md "https://timelimit.io/SerializedChildAction#/definitions/EncryptableParentPassword/properties/hash")

#### hash Type

`string`

### secondHash



`secondHash`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedChildAction](serializedchildaction-definitions-encryptableparentpassword-properties-secondhash.md "https://timelimit.io/SerializedChildAction#/definitions/EncryptableParentPassword/properties/secondHash")

#### secondHash Type

`string`

### secondSalt



`secondSalt`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedChildAction](serializedchildaction-definitions-encryptableparentpassword-properties-secondsalt.md "https://timelimit.io/SerializedChildAction#/definitions/EncryptableParentPassword/properties/secondSalt")

#### secondSalt Type

`string`

### encrypted



`encrypted`

* is optional

* Type: `boolean`

* cannot be null

* defined in: [SerializedChildAction](serializedchildaction-definitions-encryptableparentpassword-properties-encrypted.md "https://timelimit.io/SerializedChildAction#/definitions/EncryptableParentPassword/properties/encrypted")

#### encrypted Type

`boolean`

## Definitions group SerializedChildSignInAction

Reference this group by using

```json
{"$ref":"https://timelimit.io/SerializedChildAction#/definitions/SerializedChildSignInAction"}
```

| Property        | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                      |
| :-------------- | :------- | :------- | :------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type-1) | `string` | Required | cannot be null | [SerializedChildAction](serializedchildaction-definitions-serializedchildsigninaction-properties-type.md "https://timelimit.io/SerializedChildAction#/definitions/SerializedChildSignInAction/properties/type") |

### type



`type`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedChildAction](serializedchildaction-definitions-serializedchildsigninaction-properties-type.md "https://timelimit.io/SerializedChildAction#/definitions/SerializedChildSignInAction/properties/type")

#### type Type

`string`

#### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value             | Explanation |
| :---------------- | :---------- |
| `"CHILD_SIGN_IN"` |             |
