# ServerDeviceList Schema

```txt
https://timelimit.io/ServerDataStatus#/definitions/ServerDeviceList
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                            |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [ServerDataStatus.schema.json\*](ServerDataStatus.schema.json "open original schema") |

## ServerDeviceList Type

`object` ([ServerDeviceList](serverdatastatus-definitions-serverdevicelist.md))

# ServerDeviceList Properties

| Property            | Type     | Required | Nullable       | Defined by                                                                                                                                                                       |
| :------------------ | :------- | :------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [version](#version) | `string` | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverdevicelist-properties-version.md "https://timelimit.io/ServerDataStatus#/definitions/ServerDeviceList/properties/version") |
| [data](#data)       | `array`  | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverdevicelist-properties-data.md "https://timelimit.io/ServerDataStatus#/definitions/ServerDeviceList/properties/data")       |

## version



`version`

* is required

* Type: `string`

* cannot be null

* defined in: [ServerDataStatus](serverdatastatus-definitions-serverdevicelist-properties-version.md "https://timelimit.io/ServerDataStatus#/definitions/ServerDeviceList/properties/version")

### version Type

`string`

## data



`data`

* is required

* Type: `object[]` ([ServerDeviceData](serverdatastatus-definitions-serverdevicedata.md))

* cannot be null

* defined in: [ServerDataStatus](serverdatastatus-definitions-serverdevicelist-properties-data.md "https://timelimit.io/ServerDataStatus#/definitions/ServerDeviceList/properties/data")

### data Type

`object[]` ([ServerDeviceData](serverdatastatus-definitions-serverdevicedata.md))
