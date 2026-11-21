# SerializedUpdateDeviceNameAction Schema

```txt
https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateDeviceNameAction
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                        |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedParentAction.schema.json\*](SerializedParentAction.schema.json "open original schema") |

## SerializedUpdateDeviceNameAction Type

`object` ([SerializedUpdateDeviceNameAction](serializedparentaction-definitions-serializedupdatedevicenameaction.md))

# SerializedUpdateDeviceNameAction Properties

| Property              | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                           |
| :-------------------- | :------- | :------- | :------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)         | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatedevicenameaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateDeviceNameAction/properties/type")         |
| [deviceId](#deviceid) | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatedevicenameaction-properties-deviceid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateDeviceNameAction/properties/deviceId") |
| [name](#name)         | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatedevicenameaction-properties-name.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateDeviceNameAction/properties/name")         |

## type



`type`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatedevicenameaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateDeviceNameAction/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                  | Explanation |
| :--------------------- | :---------- |
| `"UPDATE_DEVICE_NAME"` |             |

## deviceId



`deviceId`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatedevicenameaction-properties-deviceid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateDeviceNameAction/properties/deviceId")

### deviceId Type

`string`

## name



`name`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatedevicenameaction-properties-name.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateDeviceNameAction/properties/name")

### name Type

`string`
