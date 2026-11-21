# RegisterChildDeviceRequest Schema

```txt
https://timelimit.io/RegisterChildDeviceRequest
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                              |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------------------------ |
| Can be instantiated | Yes        | Unknown status | No           | Forbidden         | Forbidden             | none                | [RegisterChildDeviceRequest.schema.json](RegisterChildDeviceRequest.schema.json "open original schema") |

## RegisterChildDeviceRequest Type

`object` ([RegisterChildDeviceRequest](registerchilddevicerequest.md))

# RegisterChildDeviceRequest Properties

| Property                        | Type     | Required | Nullable       | Defined by                                                                                                                                                       |
| :------------------------------ | :------- | :------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [registerToken](#registertoken) | `string` | Required | cannot be null | [RegisterChildDeviceRequest](registerchilddevicerequest-properties-registertoken.md "https://timelimit.io/RegisterChildDeviceRequest#/properties/registerToken") |
| [childDevice](#childdevice)     | `object` | Required | cannot be null | [RegisterChildDeviceRequest](registerchilddevicerequest-definitions-newdeviceinfo.md "https://timelimit.io/RegisterChildDeviceRequest#/properties/childDevice")  |
| [deviceName](#devicename)       | `string` | Required | cannot be null | [RegisterChildDeviceRequest](registerchilddevicerequest-properties-devicename.md "https://timelimit.io/RegisterChildDeviceRequest#/properties/deviceName")       |
| [clientLevel](#clientlevel)     | `number` | Optional | cannot be null | [RegisterChildDeviceRequest](registerchilddevicerequest-properties-clientlevel.md "https://timelimit.io/RegisterChildDeviceRequest#/properties/clientLevel")     |

## registerToken



`registerToken`

* is required

* Type: `string`

* cannot be null

* defined in: [RegisterChildDeviceRequest](registerchilddevicerequest-properties-registertoken.md "https://timelimit.io/RegisterChildDeviceRequest#/properties/registerToken")

### registerToken Type

`string`

## childDevice



`childDevice`

* is required

* Type: `object` ([NewDeviceInfo](registerchilddevicerequest-definitions-newdeviceinfo.md))

* cannot be null

* defined in: [RegisterChildDeviceRequest](registerchilddevicerequest-definitions-newdeviceinfo.md "https://timelimit.io/RegisterChildDeviceRequest#/properties/childDevice")

### childDevice Type

`object` ([NewDeviceInfo](registerchilddevicerequest-definitions-newdeviceinfo.md))

## deviceName



`deviceName`

* is required

* Type: `string`

* cannot be null

* defined in: [RegisterChildDeviceRequest](registerchilddevicerequest-properties-devicename.md "https://timelimit.io/RegisterChildDeviceRequest#/properties/deviceName")

### deviceName Type

`string`

## clientLevel



`clientLevel`

* is optional

* Type: `number`

* cannot be null

* defined in: [RegisterChildDeviceRequest](registerchilddevicerequest-properties-clientlevel.md "https://timelimit.io/RegisterChildDeviceRequest#/properties/clientLevel")

### clientLevel Type

`number`

# RegisterChildDeviceRequest Definitions

## Definitions group NewDeviceInfo

Reference this group by using

```json
{"$ref":"https://timelimit.io/RegisterChildDeviceRequest#/definitions/NewDeviceInfo"}
```

| Property        | Type     | Required | Nullable       | Defined by                                                                                                                                                                                           |
| :-------------- | :------- | :------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [model](#model) | `string` | Required | cannot be null | [RegisterChildDeviceRequest](registerchilddevicerequest-definitions-newdeviceinfo-properties-model.md "https://timelimit.io/RegisterChildDeviceRequest#/definitions/NewDeviceInfo/properties/model") |

### model



`model`

* is required

* Type: `string`

* cannot be null

* defined in: [RegisterChildDeviceRequest](registerchilddevicerequest-definitions-newdeviceinfo-properties-model.md "https://timelimit.io/RegisterChildDeviceRequest#/definitions/NewDeviceInfo/properties/model")

#### model Type

`string`
