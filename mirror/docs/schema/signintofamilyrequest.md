# SignIntoFamilyRequest Schema

```txt
https://timelimit.io/SignIntoFamilyRequest
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                    |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :-------------------------------------------------------------------------------------------- |
| Can be instantiated | Yes        | Unknown status | No           | Forbidden         | Forbidden             | none                | [SignIntoFamilyRequest.schema.json](SignIntoFamilyRequest.schema.json "open original schema") |

## SignIntoFamilyRequest Type

`object` ([SignIntoFamilyRequest](signintofamilyrequest.md))

# SignIntoFamilyRequest Properties

| Property                        | Type     | Required | Nullable       | Defined by                                                                                                                                        |
| :------------------------------ | :------- | :------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| [mailAuthToken](#mailauthtoken) | `string` | Required | cannot be null | [SignIntoFamilyRequest](signintofamilyrequest-properties-mailauthtoken.md "https://timelimit.io/SignIntoFamilyRequest#/properties/mailAuthToken") |
| [parentDevice](#parentdevice)   | `object` | Required | cannot be null | [SignIntoFamilyRequest](signintofamilyrequest-definitions-newdeviceinfo.md "https://timelimit.io/SignIntoFamilyRequest#/properties/parentDevice") |
| [deviceName](#devicename)       | `string` | Required | cannot be null | [SignIntoFamilyRequest](signintofamilyrequest-properties-devicename.md "https://timelimit.io/SignIntoFamilyRequest#/properties/deviceName")       |
| [clientLevel](#clientlevel)     | `number` | Optional | cannot be null | [SignIntoFamilyRequest](signintofamilyrequest-properties-clientlevel.md "https://timelimit.io/SignIntoFamilyRequest#/properties/clientLevel")     |

## mailAuthToken



`mailAuthToken`

* is required

* Type: `string`

* cannot be null

* defined in: [SignIntoFamilyRequest](signintofamilyrequest-properties-mailauthtoken.md "https://timelimit.io/SignIntoFamilyRequest#/properties/mailAuthToken")

### mailAuthToken Type

`string`

## parentDevice



`parentDevice`

* is required

* Type: `object` ([NewDeviceInfo](signintofamilyrequest-definitions-newdeviceinfo.md))

* cannot be null

* defined in: [SignIntoFamilyRequest](signintofamilyrequest-definitions-newdeviceinfo.md "https://timelimit.io/SignIntoFamilyRequest#/properties/parentDevice")

### parentDevice Type

`object` ([NewDeviceInfo](signintofamilyrequest-definitions-newdeviceinfo.md))

## deviceName



`deviceName`

* is required

* Type: `string`

* cannot be null

* defined in: [SignIntoFamilyRequest](signintofamilyrequest-properties-devicename.md "https://timelimit.io/SignIntoFamilyRequest#/properties/deviceName")

### deviceName Type

`string`

## clientLevel



`clientLevel`

* is optional

* Type: `number`

* cannot be null

* defined in: [SignIntoFamilyRequest](signintofamilyrequest-properties-clientlevel.md "https://timelimit.io/SignIntoFamilyRequest#/properties/clientLevel")

### clientLevel Type

`number`

# SignIntoFamilyRequest Definitions

## Definitions group NewDeviceInfo

Reference this group by using

```json
{"$ref":"https://timelimit.io/SignIntoFamilyRequest#/definitions/NewDeviceInfo"}
```

| Property        | Type     | Required | Nullable       | Defined by                                                                                                                                                                            |
| :-------------- | :------- | :------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [model](#model) | `string` | Required | cannot be null | [SignIntoFamilyRequest](signintofamilyrequest-definitions-newdeviceinfo-properties-model.md "https://timelimit.io/SignIntoFamilyRequest#/definitions/NewDeviceInfo/properties/model") |

### model



`model`

* is required

* Type: `string`

* cannot be null

* defined in: [SignIntoFamilyRequest](signintofamilyrequest-definitions-newdeviceinfo-properties-model.md "https://timelimit.io/SignIntoFamilyRequest#/definitions/NewDeviceInfo/properties/model")

#### model Type

`string`
