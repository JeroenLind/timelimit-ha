# EncryptableParentPassword Schema

```txt
https://timelimit.io/SerializedParentAction#/definitions/EncryptableParentPassword
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                        |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedParentAction.schema.json\*](SerializedParentAction.schema.json "open original schema") |

## EncryptableParentPassword Type

`object` ([EncryptableParentPassword](serializedparentaction-definitions-encryptableparentpassword.md))

# EncryptableParentPassword Properties

| Property                  | Type      | Required | Nullable       | Defined by                                                                                                                                                                                                                 |
| :------------------------ | :-------- | :------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [hash](#hash)             | `string`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-encryptableparentpassword-properties-hash.md "https://timelimit.io/SerializedParentAction#/definitions/EncryptableParentPassword/properties/hash")             |
| [secondHash](#secondhash) | `string`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-encryptableparentpassword-properties-secondhash.md "https://timelimit.io/SerializedParentAction#/definitions/EncryptableParentPassword/properties/secondHash") |
| [secondSalt](#secondsalt) | `string`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-encryptableparentpassword-properties-secondsalt.md "https://timelimit.io/SerializedParentAction#/definitions/EncryptableParentPassword/properties/secondSalt") |
| [encrypted](#encrypted)   | `boolean` | Optional | cannot be null | [SerializedParentAction](serializedparentaction-definitions-encryptableparentpassword-properties-encrypted.md "https://timelimit.io/SerializedParentAction#/definitions/EncryptableParentPassword/properties/encrypted")   |

## hash



`hash`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-encryptableparentpassword-properties-hash.md "https://timelimit.io/SerializedParentAction#/definitions/EncryptableParentPassword/properties/hash")

### hash Type

`string`

## secondHash



`secondHash`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-encryptableparentpassword-properties-secondhash.md "https://timelimit.io/SerializedParentAction#/definitions/EncryptableParentPassword/properties/secondHash")

### secondHash Type

`string`

## secondSalt



`secondSalt`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-encryptableparentpassword-properties-secondsalt.md "https://timelimit.io/SerializedParentAction#/definitions/EncryptableParentPassword/properties/secondSalt")

### secondSalt Type

`string`

## encrypted



`encrypted`

* is optional

* Type: `boolean`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-encryptableparentpassword-properties-encrypted.md "https://timelimit.io/SerializedParentAction#/definitions/EncryptableParentPassword/properties/encrypted")

### encrypted Type

`boolean`
