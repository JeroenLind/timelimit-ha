# SerializedSetDeviceDefaultUserAction Schema

```txt
https://timelimit.io/SerializedParentAction#/definitions/SerializedSetDeviceDefaultUserAction
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                        |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedParentAction.schema.json\*](SerializedParentAction.schema.json "open original schema") |

## SerializedSetDeviceDefaultUserAction Type

`object` ([SerializedSetDeviceDefaultUserAction](serializedparentaction-definitions-serializedsetdevicedefaultuseraction.md))

# SerializedSetDeviceDefaultUserAction Properties

| Property                        | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                                             |
| :------------------------------ | :------- | :------- | :------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)                   | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetdevicedefaultuseraction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetDeviceDefaultUserAction/properties/type")                   |
| [deviceId](#deviceid)           | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetdevicedefaultuseraction-properties-deviceid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetDeviceDefaultUserAction/properties/deviceId")           |
| [defaultUserId](#defaultuserid) | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetdevicedefaultuseraction-properties-defaultuserid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetDeviceDefaultUserAction/properties/defaultUserId") |

## type



`type`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetdevicedefaultuseraction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetDeviceDefaultUserAction/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                       | Explanation |
| :-------------------------- | :---------- |
| `"SET_DEVICE_DEFAULT_USER"` |             |

## deviceId



`deviceId`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetdevicedefaultuseraction-properties-deviceid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetDeviceDefaultUserAction/properties/deviceId")

### deviceId Type

`string`

## defaultUserId



`defaultUserId`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetdevicedefaultuseraction-properties-defaultuserid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetDeviceDefaultUserAction/properties/defaultUserId")

### defaultUserId Type

`string`
