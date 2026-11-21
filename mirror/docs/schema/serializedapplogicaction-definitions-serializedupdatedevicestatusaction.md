# SerializedUpdateDeviceStatusAction Schema

```txt
https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUpdateDeviceStatusAction
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                            |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :---------------------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedAppLogicAction.schema.json\*](SerializedAppLogicAction.schema.json "open original schema") |

## SerializedUpdateDeviceStatusAction Type

`object` ([SerializedUpdateDeviceStatusAction](serializedapplogicaction-definitions-serializedupdatedevicestatusaction.md))

# SerializedUpdateDeviceStatusAction Properties

| Property                                                    | Type      | Required | Nullable       | Defined by                                                                                                                                                                                                                                                                           |
| :---------------------------------------------------------- | :-------- | :------- | :------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)                                               | `string`  | Required | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdatedevicestatusaction-properties-type.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUpdateDeviceStatusAction/properties/type")                                               |
| [protectionLevel](#protectionlevel)                         | `string`  | Optional | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdatedevicestatusaction-properties-protectionlevel.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUpdateDeviceStatusAction/properties/protectionLevel")                         |
| [usageStats](#usagestats)                                   | `string`  | Optional | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdatedevicestatusaction-properties-usagestats.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUpdateDeviceStatusAction/properties/usageStats")                                   |
| [notificationAccess](#notificationaccess)                   | `string`  | Optional | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdatedevicestatusaction-properties-notificationaccess.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUpdateDeviceStatusAction/properties/notificationAccess")                   |
| [overlayPermission](#overlaypermission)                     | `string`  | Optional | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdatedevicestatusaction-properties-overlaypermission.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUpdateDeviceStatusAction/properties/overlayPermission")                     |
| [accessibilityServiceEnabled](#accessibilityserviceenabled) | `boolean` | Optional | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdatedevicestatusaction-properties-accessibilityserviceenabled.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUpdateDeviceStatusAction/properties/accessibilityServiceEnabled") |
| [appVersion](#appversion)                                   | `number`  | Optional | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdatedevicestatusaction-properties-appversion.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUpdateDeviceStatusAction/properties/appVersion")                                   |
| [didReboot](#didreboot)                                     | `boolean` | Optional | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdatedevicestatusaction-properties-didreboot.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUpdateDeviceStatusAction/properties/didReboot")                                     |
| [isQOrLaterNow](#isqorlaternow)                             | `boolean` | Optional | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdatedevicestatusaction-properties-isqorlaternow.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUpdateDeviceStatusAction/properties/isQOrLaterNow")                             |
| [addedManipulationFlags](#addedmanipulationflags)           | `number`  | Optional | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdatedevicestatusaction-properties-addedmanipulationflags.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUpdateDeviceStatusAction/properties/addedManipulationFlags")           |
| [platformType](#platformtype)                               | `string`  | Optional | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdatedevicestatusaction-properties-platformtype.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUpdateDeviceStatusAction/properties/platformType")                               |
| [platformLevel](#platformlevel)                             | `number`  | Optional | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdatedevicestatusaction-properties-platformlevel.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUpdateDeviceStatusAction/properties/platformLevel")                             |

## type



`type`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdatedevicestatusaction-properties-type.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUpdateDeviceStatusAction/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                    | Explanation |
| :----------------------- | :---------- |
| `"UPDATE_DEVICE_STATUS"` |             |

## protectionLevel



`protectionLevel`

* is optional

* Type: `string`

* cannot be null

* defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdatedevicestatusaction-properties-protectionlevel.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUpdateDeviceStatusAction/properties/protectionLevel")

### protectionLevel Type

`string`

### protectionLevel Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                     | Explanation |
| :------------------------ | :---------- |
| `"device owner"`          |             |
| `"none"`                  |             |
| `"password device admin"` |             |
| `"simple device admin"`   |             |

## usageStats



`usageStats`

* is optional

* Type: `string`

* cannot be null

* defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdatedevicestatusaction-properties-usagestats.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUpdateDeviceStatusAction/properties/usageStats")

### usageStats Type

`string`

### usageStats Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value            | Explanation |
| :--------------- | :---------- |
| `"granted"`      |             |
| `"not granted"`  |             |
| `"not required"` |             |

## notificationAccess



`notificationAccess`

* is optional

* Type: `string`

* cannot be null

* defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdatedevicestatusaction-properties-notificationaccess.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUpdateDeviceStatusAction/properties/notificationAccess")

### notificationAccess Type

`string`

### notificationAccess Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value             | Explanation |
| :---------------- | :---------- |
| `"granted"`       |             |
| `"not granted"`   |             |
| `"not supported"` |             |

## overlayPermission



`overlayPermission`

* is optional

* Type: `string`

* cannot be null

* defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdatedevicestatusaction-properties-overlaypermission.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUpdateDeviceStatusAction/properties/overlayPermission")

### overlayPermission Type

`string`

### overlayPermission Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value            | Explanation |
| :--------------- | :---------- |
| `"granted"`      |             |
| `"not granted"`  |             |
| `"not required"` |             |

## accessibilityServiceEnabled



`accessibilityServiceEnabled`

* is optional

* Type: `boolean`

* cannot be null

* defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdatedevicestatusaction-properties-accessibilityserviceenabled.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUpdateDeviceStatusAction/properties/accessibilityServiceEnabled")

### accessibilityServiceEnabled Type

`boolean`

## appVersion



`appVersion`

* is optional

* Type: `number`

* cannot be null

* defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdatedevicestatusaction-properties-appversion.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUpdateDeviceStatusAction/properties/appVersion")

### appVersion Type

`number`

## didReboot



`didReboot`

* is optional

* Type: `boolean`

* cannot be null

* defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdatedevicestatusaction-properties-didreboot.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUpdateDeviceStatusAction/properties/didReboot")

### didReboot Type

`boolean`

## isQOrLaterNow



`isQOrLaterNow`

* is optional

* Type: `boolean`

* cannot be null

* defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdatedevicestatusaction-properties-isqorlaternow.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUpdateDeviceStatusAction/properties/isQOrLaterNow")

### isQOrLaterNow Type

`boolean`

## addedManipulationFlags



`addedManipulationFlags`

* is optional

* Type: `number`

* cannot be null

* defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdatedevicestatusaction-properties-addedmanipulationflags.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUpdateDeviceStatusAction/properties/addedManipulationFlags")

### addedManipulationFlags Type

`number`

## platformType



`platformType`

* is optional

* Type: `string`

* cannot be null

* defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdatedevicestatusaction-properties-platformtype.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUpdateDeviceStatusAction/properties/platformType")

### platformType Type

`string`

## platformLevel



`platformLevel`

* is optional

* Type: `number`

* cannot be null

* defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdatedevicestatusaction-properties-platformlevel.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUpdateDeviceStatusAction/properties/platformLevel")

### platformLevel Type

`number`
