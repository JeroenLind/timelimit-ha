# ServerKeyRequest Schema

```txt
https://timelimit.io/ServerDataStatus#/definitions/ServerKeyRequest
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                            |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [ServerDataStatus.schema.json\*](ServerDataStatus.schema.json "open original schema") |

## ServerKeyRequest Type

`object` ([ServerKeyRequest](serverdatastatus-definitions-serverkeyrequest.md))

# ServerKeyRequest Properties

| Property                  | Type     | Required | Nullable       | Defined by                                                                                                                                                                             |
| :------------------------ | :------- | :------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [srvSeq](#srvseq)         | `number` | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverkeyrequest-properties-srvseq.md "https://timelimit.io/ServerDataStatus#/definitions/ServerKeyRequest/properties/srvSeq")         |
| [senId](#senid)           | `string` | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverkeyrequest-properties-senid.md "https://timelimit.io/ServerDataStatus#/definitions/ServerKeyRequest/properties/senId")           |
| [senSeq](#senseq)         | `number` | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverkeyrequest-properties-senseq.md "https://timelimit.io/ServerDataStatus#/definitions/ServerKeyRequest/properties/senSeq")         |
| [deviceId](#deviceid)     | `string` | Optional | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverkeyrequest-properties-deviceid.md "https://timelimit.io/ServerDataStatus#/definitions/ServerKeyRequest/properties/deviceId")     |
| [categoryId](#categoryid) | `string` | Optional | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverkeyrequest-properties-categoryid.md "https://timelimit.io/ServerDataStatus#/definitions/ServerKeyRequest/properties/categoryId") |
| [type](#type)             | `number` | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverkeyrequest-properties-type.md "https://timelimit.io/ServerDataStatus#/definitions/ServerKeyRequest/properties/type")             |
| [tempKey](#tempkey)       | `string` | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverkeyrequest-properties-tempkey.md "https://timelimit.io/ServerDataStatus#/definitions/ServerKeyRequest/properties/tempKey")       |
| [signature](#signature)   | `string` | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverkeyrequest-properties-signature.md "https://timelimit.io/ServerDataStatus#/definitions/ServerKeyRequest/properties/signature")   |

## srvSeq



`srvSeq`

* is required

* Type: `number`

* cannot be null

* defined in: [ServerDataStatus](serverdatastatus-definitions-serverkeyrequest-properties-srvseq.md "https://timelimit.io/ServerDataStatus#/definitions/ServerKeyRequest/properties/srvSeq")

### srvSeq Type

`number`

## senId



`senId`

* is required

* Type: `string`

* cannot be null

* defined in: [ServerDataStatus](serverdatastatus-definitions-serverkeyrequest-properties-senid.md "https://timelimit.io/ServerDataStatus#/definitions/ServerKeyRequest/properties/senId")

### senId Type

`string`

## senSeq



`senSeq`

* is required

* Type: `number`

* cannot be null

* defined in: [ServerDataStatus](serverdatastatus-definitions-serverkeyrequest-properties-senseq.md "https://timelimit.io/ServerDataStatus#/definitions/ServerKeyRequest/properties/senSeq")

### senSeq Type

`number`

## deviceId



`deviceId`

* is optional

* Type: `string`

* cannot be null

* defined in: [ServerDataStatus](serverdatastatus-definitions-serverkeyrequest-properties-deviceid.md "https://timelimit.io/ServerDataStatus#/definitions/ServerKeyRequest/properties/deviceId")

### deviceId Type

`string`

## categoryId



`categoryId`

* is optional

* Type: `string`

* cannot be null

* defined in: [ServerDataStatus](serverdatastatus-definitions-serverkeyrequest-properties-categoryid.md "https://timelimit.io/ServerDataStatus#/definitions/ServerKeyRequest/properties/categoryId")

### categoryId Type

`string`

## type



`type`

* is required

* Type: `number`

* cannot be null

* defined in: [ServerDataStatus](serverdatastatus-definitions-serverkeyrequest-properties-type.md "https://timelimit.io/ServerDataStatus#/definitions/ServerKeyRequest/properties/type")

### type Type

`number`

## tempKey



`tempKey`

* is required

* Type: `string`

* cannot be null

* defined in: [ServerDataStatus](serverdatastatus-definitions-serverkeyrequest-properties-tempkey.md "https://timelimit.io/ServerDataStatus#/definitions/ServerKeyRequest/properties/tempKey")

### tempKey Type

`string`

## signature



`signature`

* is required

* Type: `string`

* cannot be null

* defined in: [ServerDataStatus](serverdatastatus-definitions-serverkeyrequest-properties-signature.md "https://timelimit.io/ServerDataStatus#/definitions/ServerKeyRequest/properties/signature")

### signature Type

`string`
