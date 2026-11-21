# SerializedUploadDevicePublicKeyAction Schema

```txt
https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUploadDevicePublicKeyAction
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                            |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :---------------------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedAppLogicAction.schema.json\*](SerializedAppLogicAction.schema.json "open original schema") |

## SerializedUploadDevicePublicKeyAction Type

`object` ([SerializedUploadDevicePublicKeyAction](serializedapplogicaction-definitions-serializeduploaddevicepublickeyaction.md))

# SerializedUploadDevicePublicKeyAction Properties

| Property      | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                                   |
| :------------ | :------- | :------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type) | `string` | Required | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializeduploaddevicepublickeyaction-properties-type.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUploadDevicePublicKeyAction/properties/type") |
| [key](#key)   | `string` | Required | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializeduploaddevicepublickeyaction-properties-key.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUploadDevicePublicKeyAction/properties/key")   |

## type



`type`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializeduploaddevicepublickeyaction-properties-type.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUploadDevicePublicKeyAction/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                        | Explanation |
| :--------------------------- | :---------- |
| `"UPLOAD_DEVICE_PUBLIC_KEY"` |             |

## key



`key`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializeduploaddevicepublickeyaction-properties-key.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUploadDevicePublicKeyAction/properties/key")

### key Type

`string`
