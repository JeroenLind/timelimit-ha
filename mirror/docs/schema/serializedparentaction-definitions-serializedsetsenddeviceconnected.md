# SerializedSetSendDeviceConnected Schema

```txt
https://timelimit.io/SerializedParentAction#/definitions/SerializedSetSendDeviceConnected
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                        |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedParentAction.schema.json\*](SerializedParentAction.schema.json "open original schema") |

## SerializedSetSendDeviceConnected Type

`object` ([SerializedSetSendDeviceConnected](serializedparentaction-definitions-serializedsetsenddeviceconnected.md))

# SerializedSetSendDeviceConnected Properties

| Property              | Type      | Required | Nullable       | Defined by                                                                                                                                                                                                                           |
| :-------------------- | :-------- | :------- | :------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)         | `string`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetsenddeviceconnected-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetSendDeviceConnected/properties/type")         |
| [deviceId](#deviceid) | `string`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetsenddeviceconnected-properties-deviceid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetSendDeviceConnected/properties/deviceId") |
| [enable](#enable)     | `boolean` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetsenddeviceconnected-properties-enable.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetSendDeviceConnected/properties/enable")     |

## type



`type`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetsenddeviceconnected-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetSendDeviceConnected/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                         | Explanation |
| :---------------------------- | :---------- |
| `"SET_SEND_DEVICE_CONNECTED"` |             |

## deviceId



`deviceId`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetsenddeviceconnected-properties-deviceid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetSendDeviceConnected/properties/deviceId")

### deviceId Type

`string`

## enable



`enable`

* is required

* Type: `boolean`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetsenddeviceconnected-properties-enable.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetSendDeviceConnected/properties/enable")

### enable Type

`boolean`
