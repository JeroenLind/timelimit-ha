# ServerExtendedDeviceData Schema

```txt
https://timelimit.io/ServerDataStatus#/definitions/ServerExtendedDeviceData
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                            |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [ServerDataStatus.schema.json\*](ServerDataStatus.schema.json "open original schema") |

## ServerExtendedDeviceData Type

`object` ([ServerExtendedDeviceData](serverdatastatus-definitions-serverextendeddevicedata.md))

# ServerExtendedDeviceData Properties

| Property              | Type     | Required | Nullable       | Defined by                                                                                                                                                                                         |
| :-------------------- | :------- | :------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [deviceId](#deviceid) | `string` | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverextendeddevicedata-properties-deviceid.md "https://timelimit.io/ServerDataStatus#/definitions/ServerExtendedDeviceData/properties/deviceId") |
| [appsBase](#appsbase) | `object` | Optional | cannot be null | [ServerDataStatus](serverdatastatus-definitions-servercryptcontainer.md "https://timelimit.io/ServerDataStatus#/definitions/ServerExtendedDeviceData/properties/appsBase")                         |
| [appsDiff](#appsdiff) | `object` | Optional | cannot be null | [ServerDataStatus](serverdatastatus-definitions-servercryptcontainer.md "https://timelimit.io/ServerDataStatus#/definitions/ServerExtendedDeviceData/properties/appsDiff")                         |

## deviceId



`deviceId`

* is required

* Type: `string`

* cannot be null

* defined in: [ServerDataStatus](serverdatastatus-definitions-serverextendeddevicedata-properties-deviceid.md "https://timelimit.io/ServerDataStatus#/definitions/ServerExtendedDeviceData/properties/deviceId")

### deviceId Type

`string`

## appsBase



`appsBase`

* is optional

* Type: `object` ([ServerCryptContainer](serverdatastatus-definitions-servercryptcontainer.md))

* cannot be null

* defined in: [ServerDataStatus](serverdatastatus-definitions-servercryptcontainer.md "https://timelimit.io/ServerDataStatus#/definitions/ServerExtendedDeviceData/properties/appsBase")

### appsBase Type

`object` ([ServerCryptContainer](serverdatastatus-definitions-servercryptcontainer.md))

## appsDiff



`appsDiff`

* is optional

* Type: `object` ([ServerCryptContainer](serverdatastatus-definitions-servercryptcontainer.md))

* cannot be null

* defined in: [ServerDataStatus](serverdatastatus-definitions-servercryptcontainer.md "https://timelimit.io/ServerDataStatus#/definitions/ServerExtendedDeviceData/properties/appsDiff")

### appsDiff Type

`object` ([ServerCryptContainer](serverdatastatus-definitions-servercryptcontainer.md))
