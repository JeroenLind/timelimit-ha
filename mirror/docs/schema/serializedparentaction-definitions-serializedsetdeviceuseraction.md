# SerializedSetDeviceUserAction Schema

```txt
https://timelimit.io/SerializedParentAction#/definitions/SerializedSetDeviceUserAction
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                        |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedParentAction.schema.json\*](SerializedParentAction.schema.json "open original schema") |

## SerializedSetDeviceUserAction Type

`object` ([SerializedSetDeviceUserAction](serializedparentaction-definitions-serializedsetdeviceuseraction.md))

# SerializedSetDeviceUserAction Properties

| Property              | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                     |
| :-------------------- | :------- | :------- | :------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)         | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetdeviceuseraction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetDeviceUserAction/properties/type")         |
| [deviceId](#deviceid) | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetdeviceuseraction-properties-deviceid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetDeviceUserAction/properties/deviceId") |
| [userId](#userid)     | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetdeviceuseraction-properties-userid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetDeviceUserAction/properties/userId")     |

## type



`type`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetdeviceuseraction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetDeviceUserAction/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value               | Explanation |
| :------------------ | :---------- |
| `"SET_DEVICE_USER"` |             |

## deviceId



`deviceId`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetdeviceuseraction-properties-deviceid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetDeviceUserAction/properties/deviceId")

### deviceId Type

`string`

## userId



`userId`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetdeviceuseraction-properties-userid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetDeviceUserAction/properties/userId")

### userId Type

`string`
