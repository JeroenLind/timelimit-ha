# SerializedSendKeyRequestAction Schema

```txt
https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedSendKeyRequestAction
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                            |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :---------------------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedAppLogicAction.schema.json\*](SerializedAppLogicAction.schema.json "open original schema") |

## SerializedSendKeyRequestAction Type

`object` ([SerializedSendKeyRequestAction](serializedapplogicaction-definitions-serializedsendkeyrequestaction.md))

# SerializedSendKeyRequestAction Properties

| Property                  | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                                 |
| :------------------------ | :------- | :------- | :------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)             | `string` | Required | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedsendkeyrequestaction-properties-type.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedSendKeyRequestAction/properties/type")             |
| [dsn](#dsn)               | `number` | Required | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedsendkeyrequestaction-properties-dsn.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedSendKeyRequestAction/properties/dsn")               |
| [deviceId](#deviceid)     | `string` | Optional | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedsendkeyrequestaction-properties-deviceid.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedSendKeyRequestAction/properties/deviceId")     |
| [categoryId](#categoryid) | `string` | Optional | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedsendkeyrequestaction-properties-categoryid.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedSendKeyRequestAction/properties/categoryId") |
| [dataType](#datatype)     | `number` | Required | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedsendkeyrequestaction-properties-datatype.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedSendKeyRequestAction/properties/dataType")     |
| [tempKey](#tempkey)       | `string` | Required | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedsendkeyrequestaction-properties-tempkey.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedSendKeyRequestAction/properties/tempKey")       |
| [signature](#signature)   | `string` | Required | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedsendkeyrequestaction-properties-signature.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedSendKeyRequestAction/properties/signature")   |

## type



`type`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedsendkeyrequestaction-properties-type.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedSendKeyRequestAction/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                | Explanation |
| :------------------- | :---------- |
| `"SEND_KEY_REQUEST"` |             |

## dsn



`dsn`

* is required

* Type: `number`

* cannot be null

* defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedsendkeyrequestaction-properties-dsn.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedSendKeyRequestAction/properties/dsn")

### dsn Type

`number`

## deviceId



`deviceId`

* is optional

* Type: `string`

* cannot be null

* defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedsendkeyrequestaction-properties-deviceid.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedSendKeyRequestAction/properties/deviceId")

### deviceId Type

`string`

## categoryId



`categoryId`

* is optional

* Type: `string`

* cannot be null

* defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedsendkeyrequestaction-properties-categoryid.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedSendKeyRequestAction/properties/categoryId")

### categoryId Type

`string`

## dataType



`dataType`

* is required

* Type: `number`

* cannot be null

* defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedsendkeyrequestaction-properties-datatype.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedSendKeyRequestAction/properties/dataType")

### dataType Type

`number`

## tempKey



`tempKey`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedsendkeyrequestaction-properties-tempkey.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedSendKeyRequestAction/properties/tempKey")

### tempKey Type

`string`

## signature



`signature`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedsendkeyrequestaction-properties-signature.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedSendKeyRequestAction/properties/signature")

### signature Type

`string`
