# SerializedReplyToKeyRequestAction Schema

```txt
https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedReplyToKeyRequestAction
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                            |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :---------------------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedAppLogicAction.schema.json\*](SerializedAppLogicAction.schema.json "open original schema") |

## SerializedReplyToKeyRequestAction Type

`object` ([SerializedReplyToKeyRequestAction](serializedapplogicaction-definitions-serializedreplytokeyrequestaction.md))

# SerializedReplyToKeyRequestAction Properties

| Property                      | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                                           |
| :---------------------------- | :------- | :------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)                 | `string` | Required | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedreplytokeyrequestaction-properties-type.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedReplyToKeyRequestAction/properties/type")                 |
| [rsn](#rsn)                   | `number` | Required | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedreplytokeyrequestaction-properties-rsn.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedReplyToKeyRequestAction/properties/rsn")                   |
| [tempKey](#tempkey)           | `string` | Required | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedreplytokeyrequestaction-properties-tempkey.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedReplyToKeyRequestAction/properties/tempKey")           |
| [encryptedKey](#encryptedkey) | `string` | Required | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedreplytokeyrequestaction-properties-encryptedkey.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedReplyToKeyRequestAction/properties/encryptedKey") |
| [signature](#signature)       | `string` | Required | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedreplytokeyrequestaction-properties-signature.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedReplyToKeyRequestAction/properties/signature")       |

## type



`type`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedreplytokeyrequestaction-properties-type.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedReplyToKeyRequestAction/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                    | Explanation |
| :----------------------- | :---------- |
| `"REPLY_TO_KEY_REQUEST"` |             |

## rsn



`rsn`

* is required

* Type: `number`

* cannot be null

* defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedreplytokeyrequestaction-properties-rsn.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedReplyToKeyRequestAction/properties/rsn")

### rsn Type

`number`

## tempKey



`tempKey`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedreplytokeyrequestaction-properties-tempkey.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedReplyToKeyRequestAction/properties/tempKey")

### tempKey Type

`string`

## encryptedKey



`encryptedKey`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedreplytokeyrequestaction-properties-encryptedkey.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedReplyToKeyRequestAction/properties/encryptedKey")

### encryptedKey Type

`string`

## signature



`signature`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedreplytokeyrequestaction-properties-signature.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedReplyToKeyRequestAction/properties/signature")

### signature Type

`string`
