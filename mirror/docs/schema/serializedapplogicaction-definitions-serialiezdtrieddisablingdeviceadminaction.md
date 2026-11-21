# SerialiezdTriedDisablingDeviceAdminAction Schema

```txt
https://timelimit.io/SerializedAppLogicAction#/definitions/SerialiezdTriedDisablingDeviceAdminAction
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                            |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :---------------------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedAppLogicAction.schema.json\*](SerializedAppLogicAction.schema.json "open original schema") |

## SerialiezdTriedDisablingDeviceAdminAction Type

`object` ([SerialiezdTriedDisablingDeviceAdminAction](serializedapplogicaction-definitions-serialiezdtrieddisablingdeviceadminaction.md))

# SerialiezdTriedDisablingDeviceAdminAction Properties

| Property      | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                                           |
| :------------ | :------- | :------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type) | `string` | Required | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serialiezdtrieddisablingdeviceadminaction-properties-type.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerialiezdTriedDisablingDeviceAdminAction/properties/type") |

## type



`type`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serialiezdtrieddisablingdeviceadminaction-properties-type.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerialiezdTriedDisablingDeviceAdminAction/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                            | Explanation |
| :------------------------------- | :---------- |
| `"TRIED_DISABLING_DEVICE_ADMIN"` |             |
