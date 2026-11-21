# EncryptableParentPassword Schema

```txt
https://timelimit.io/SerializedChildAction#/definitions/EncryptableParentPassword
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                      |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :---------------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedChildAction.schema.json\*](SerializedChildAction.schema.json "open original schema") |

## EncryptableParentPassword Type

`object` ([EncryptableParentPassword](serializedchildaction-definitions-encryptableparentpassword.md))

# EncryptableParentPassword Properties

| Property                  | Type      | Required | Nullable       | Defined by                                                                                                                                                                                                              |
| :------------------------ | :-------- | :------- | :------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [hash](#hash)             | `string`  | Required | cannot be null | [SerializedChildAction](serializedchildaction-definitions-encryptableparentpassword-properties-hash.md "https://timelimit.io/SerializedChildAction#/definitions/EncryptableParentPassword/properties/hash")             |
| [secondHash](#secondhash) | `string`  | Required | cannot be null | [SerializedChildAction](serializedchildaction-definitions-encryptableparentpassword-properties-secondhash.md "https://timelimit.io/SerializedChildAction#/definitions/EncryptableParentPassword/properties/secondHash") |
| [secondSalt](#secondsalt) | `string`  | Required | cannot be null | [SerializedChildAction](serializedchildaction-definitions-encryptableparentpassword-properties-secondsalt.md "https://timelimit.io/SerializedChildAction#/definitions/EncryptableParentPassword/properties/secondSalt") |
| [encrypted](#encrypted)   | `boolean` | Optional | cannot be null | [SerializedChildAction](serializedchildaction-definitions-encryptableparentpassword-properties-encrypted.md "https://timelimit.io/SerializedChildAction#/definitions/EncryptableParentPassword/properties/encrypted")   |

## hash



`hash`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedChildAction](serializedchildaction-definitions-encryptableparentpassword-properties-hash.md "https://timelimit.io/SerializedChildAction#/definitions/EncryptableParentPassword/properties/hash")

### hash Type

`string`

## secondHash



`secondHash`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedChildAction](serializedchildaction-definitions-encryptableparentpassword-properties-secondhash.md "https://timelimit.io/SerializedChildAction#/definitions/EncryptableParentPassword/properties/secondHash")

### secondHash Type

`string`

## secondSalt



`secondSalt`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedChildAction](serializedchildaction-definitions-encryptableparentpassword-properties-secondsalt.md "https://timelimit.io/SerializedChildAction#/definitions/EncryptableParentPassword/properties/secondSalt")

### secondSalt Type

`string`

## encrypted



`encrypted`

* is optional

* Type: `boolean`

* cannot be null

* defined in: [SerializedChildAction](serializedchildaction-definitions-encryptableparentpassword-properties-encrypted.md "https://timelimit.io/SerializedChildAction#/definitions/EncryptableParentPassword/properties/encrypted")

### encrypted Type

`boolean`
