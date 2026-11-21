# SerializedSetConsiderRebootManipulationAction Schema

```txt
https://timelimit.io/SerializedParentAction#/definitions/SerializedSetConsiderRebootManipulationAction
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                        |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedParentAction.schema.json\*](SerializedParentAction.schema.json "open original schema") |

## SerializedSetConsiderRebootManipulationAction Type

`object` ([SerializedSetConsiderRebootManipulationAction](serializedparentaction-definitions-serializedsetconsiderrebootmanipulationaction.md))

# SerializedSetConsiderRebootManipulationAction Properties

| Property              | Type      | Required | Nullable       | Defined by                                                                                                                                                                                                                                                     |
| :-------------------- | :-------- | :------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)         | `string`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetconsiderrebootmanipulationaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetConsiderRebootManipulationAction/properties/type")         |
| [deviceId](#deviceid) | `string`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetconsiderrebootmanipulationaction-properties-deviceid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetConsiderRebootManipulationAction/properties/deviceId") |
| [enable](#enable)     | `boolean` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetconsiderrebootmanipulationaction-properties-enable.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetConsiderRebootManipulationAction/properties/enable")     |

## type



`type`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetconsiderrebootmanipulationaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetConsiderRebootManipulationAction/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                                | Explanation |
| :----------------------------------- | :---------- |
| `"SET_CONSIDER_REBOOT_MANIPULATION"` |             |

## deviceId



`deviceId`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetconsiderrebootmanipulationaction-properties-deviceid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetConsiderRebootManipulationAction/properties/deviceId")

### deviceId Type

`string`

## enable



`enable`

* is required

* Type: `boolean`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetconsiderrebootmanipulationaction-properties-enable.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetConsiderRebootManipulationAction/properties/enable")

### enable Type

`boolean`
