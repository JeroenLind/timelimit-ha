# ServerKeyResponse Schema

```txt
https://timelimit.io/ServerDataStatus#/definitions/ServerKeyResponse
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                            |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [ServerDataStatus.schema.json\*](ServerDataStatus.schema.json "open original schema") |

## ServerKeyResponse Type

`object` ([ServerKeyResponse](serverdatastatus-definitions-serverkeyresponse.md))

# ServerKeyResponse Properties

| Property                | Type     | Required | Nullable       | Defined by                                                                                                                                                                             |
| :---------------------- | :------- | :------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [srvSeq](#srvseq)       | `number` | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverkeyresponse-properties-srvseq.md "https://timelimit.io/ServerDataStatus#/definitions/ServerKeyResponse/properties/srvSeq")       |
| [sender](#sender)       | `string` | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverkeyresponse-properties-sender.md "https://timelimit.io/ServerDataStatus#/definitions/ServerKeyResponse/properties/sender")       |
| [rqSeq](#rqseq)         | `number` | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverkeyresponse-properties-rqseq.md "https://timelimit.io/ServerDataStatus#/definitions/ServerKeyResponse/properties/rqSeq")         |
| [tempKey](#tempkey)     | `string` | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverkeyresponse-properties-tempkey.md "https://timelimit.io/ServerDataStatus#/definitions/ServerKeyResponse/properties/tempKey")     |
| [cryptKey](#cryptkey)   | `string` | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverkeyresponse-properties-cryptkey.md "https://timelimit.io/ServerDataStatus#/definitions/ServerKeyResponse/properties/cryptKey")   |
| [signature](#signature) | `string` | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverkeyresponse-properties-signature.md "https://timelimit.io/ServerDataStatus#/definitions/ServerKeyResponse/properties/signature") |

## srvSeq



`srvSeq`

* is required

* Type: `number`

* cannot be null

* defined in: [ServerDataStatus](serverdatastatus-definitions-serverkeyresponse-properties-srvseq.md "https://timelimit.io/ServerDataStatus#/definitions/ServerKeyResponse/properties/srvSeq")

### srvSeq Type

`number`

## sender



`sender`

* is required

* Type: `string`

* cannot be null

* defined in: [ServerDataStatus](serverdatastatus-definitions-serverkeyresponse-properties-sender.md "https://timelimit.io/ServerDataStatus#/definitions/ServerKeyResponse/properties/sender")

### sender Type

`string`

## rqSeq



`rqSeq`

* is required

* Type: `number`

* cannot be null

* defined in: [ServerDataStatus](serverdatastatus-definitions-serverkeyresponse-properties-rqseq.md "https://timelimit.io/ServerDataStatus#/definitions/ServerKeyResponse/properties/rqSeq")

### rqSeq Type

`number`

## tempKey



`tempKey`

* is required

* Type: `string`

* cannot be null

* defined in: [ServerDataStatus](serverdatastatus-definitions-serverkeyresponse-properties-tempkey.md "https://timelimit.io/ServerDataStatus#/definitions/ServerKeyResponse/properties/tempKey")

### tempKey Type

`string`

## cryptKey



`cryptKey`

* is required

* Type: `string`

* cannot be null

* defined in: [ServerDataStatus](serverdatastatus-definitions-serverkeyresponse-properties-cryptkey.md "https://timelimit.io/ServerDataStatus#/definitions/ServerKeyResponse/properties/cryptKey")

### cryptKey Type

`string`

## signature



`signature`

* is required

* Type: `string`

* cannot be null

* defined in: [ServerDataStatus](serverdatastatus-definitions-serverkeyresponse-properties-signature.md "https://timelimit.io/ServerDataStatus#/definitions/ServerKeyResponse/properties/signature")

### signature Type

`string`
