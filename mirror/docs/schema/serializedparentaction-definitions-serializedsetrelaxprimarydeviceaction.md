# SerializedSetRelaxPrimaryDeviceAction Schema

```txt
https://timelimit.io/SerializedParentAction#/definitions/SerializedSetRelaxPrimaryDeviceAction
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                        |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedParentAction.schema.json\*](SerializedParentAction.schema.json "open original schema") |

## SerializedSetRelaxPrimaryDeviceAction Type

`object` ([SerializedSetRelaxPrimaryDeviceAction](serializedparentaction-definitions-serializedsetrelaxprimarydeviceaction.md))

# SerializedSetRelaxPrimaryDeviceAction Properties

| Property          | Type      | Required | Nullable       | Defined by                                                                                                                                                                                                                                 |
| :---------------- | :-------- | :------- | :------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)     | `string`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetrelaxprimarydeviceaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetRelaxPrimaryDeviceAction/properties/type")     |
| [userId](#userid) | `string`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetrelaxprimarydeviceaction-properties-userid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetRelaxPrimaryDeviceAction/properties/userId") |
| [relax](#relax)   | `boolean` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetrelaxprimarydeviceaction-properties-relax.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetRelaxPrimaryDeviceAction/properties/relax")   |

## type



`type`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetrelaxprimarydeviceaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetRelaxPrimaryDeviceAction/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                        | Explanation |
| :--------------------------- | :---------- |
| `"SET_RELAX_PRIMARY_DEVICE"` |             |

## userId



`userId`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetrelaxprimarydeviceaction-properties-userid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetRelaxPrimaryDeviceAction/properties/userId")

### userId Type

`string`

## relax



`relax`

* is required

* Type: `boolean`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetrelaxprimarydeviceaction-properties-relax.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetRelaxPrimaryDeviceAction/properties/relax")

### relax Type

`boolean`
