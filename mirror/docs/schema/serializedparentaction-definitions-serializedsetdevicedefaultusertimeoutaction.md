# SerializedSetDeviceDefaultUserTimeoutAction Schema

```txt
https://timelimit.io/SerializedParentAction#/definitions/SerializedSetDeviceDefaultUserTimeoutAction
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                        |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedParentAction.schema.json\*](SerializedParentAction.schema.json "open original schema") |

## SerializedSetDeviceDefaultUserTimeoutAction Type

`object` ([SerializedSetDeviceDefaultUserTimeoutAction](serializedparentaction-definitions-serializedsetdevicedefaultusertimeoutaction.md))

# SerializedSetDeviceDefaultUserTimeoutAction Properties

| Property              | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                                                 |
| :-------------------- | :------- | :------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)         | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetdevicedefaultusertimeoutaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetDeviceDefaultUserTimeoutAction/properties/type")         |
| [deviceId](#deviceid) | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetdevicedefaultusertimeoutaction-properties-deviceid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetDeviceDefaultUserTimeoutAction/properties/deviceId") |
| [timeout](#timeout)   | `number` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetdevicedefaultusertimeoutaction-properties-timeout.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetDeviceDefaultUserTimeoutAction/properties/timeout")   |

## type



`type`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetdevicedefaultusertimeoutaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetDeviceDefaultUserTimeoutAction/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                               | Explanation |
| :---------------------------------- | :---------- |
| `"SET_DEVICE_DEFAULT_USER_TIMEOUT"` |             |

## deviceId



`deviceId`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetdevicedefaultusertimeoutaction-properties-deviceid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetDeviceDefaultUserTimeoutAction/properties/deviceId")

### deviceId Type

`string`

## timeout



`timeout`

* is required

* Type: `number`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetdevicedefaultusertimeoutaction-properties-timeout.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetDeviceDefaultUserTimeoutAction/properties/timeout")

### timeout Type

`number`
