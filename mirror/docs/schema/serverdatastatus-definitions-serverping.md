# ServerPing Schema

```txt
https://timelimit.io/ServerDataStatus#/definitions/ServerPing
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                            |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [ServerDataStatus.schema.json\*](ServerDataStatus.schema.json "open original schema") |

## ServerPing Type

`object` ([ServerPing](serverdatastatus-definitions-serverping.md))

# ServerPing Properties

| Property              | Type     | Required | Nullable       | Defined by                                                                                                                                                             |
| :-------------------- | :------- | :------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [deviceId](#deviceid) | `string` | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverping-properties-deviceid.md "https://timelimit.io/ServerDataStatus#/definitions/ServerPing/properties/deviceId") |
| [token](#token)       | `string` | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverping-properties-token.md "https://timelimit.io/ServerDataStatus#/definitions/ServerPing/properties/token")       |
| [type](#type)         | `string` | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverping-properties-type.md "https://timelimit.io/ServerDataStatus#/definitions/ServerPing/properties/type")         |

## deviceId



`deviceId`

* is required

* Type: `string`

* cannot be null

* defined in: [ServerDataStatus](serverdatastatus-definitions-serverping-properties-deviceid.md "https://timelimit.io/ServerDataStatus#/definitions/ServerPing/properties/deviceId")

### deviceId Type

`string`

## token



`token`

* is required

* Type: `string`

* cannot be null

* defined in: [ServerDataStatus](serverdatastatus-definitions-serverping-properties-token.md "https://timelimit.io/ServerDataStatus#/definitions/ServerPing/properties/token")

### token Type

`string`

## type



`type`

* is required

* Type: `string`

* cannot be null

* defined in: [ServerDataStatus](serverdatastatus-definitions-serverping-properties-type.md "https://timelimit.io/ServerDataStatus#/definitions/ServerPing/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value    | Explanation |
| :------- | :---------- |
| `"ping"` |             |
| `"pong"` |             |
