# SerializedIgnoreManipulationAction Schema

```txt
https://timelimit.io/SerializedParentAction#/definitions/SerializedIgnoreManipulationAction
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                        |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedParentAction.schema.json\*](SerializedParentAction.schema.json "open original schema") |

## SerializedIgnoreManipulationAction Type

`object` ([SerializedIgnoreManipulationAction](serializedparentaction-definitions-serializedignoremanipulationaction.md))

# SerializedIgnoreManipulationAction Properties

| Property                                                  | Type      | Required | Nullable       | Defined by                                                                                                                                                                                                                                                                   |
| :-------------------------------------------------------- | :-------- | :------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)                                             | `string`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedignoremanipulationaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedIgnoreManipulationAction/properties/type")                                             |
| [deviceId](#deviceid)                                     | `string`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedignoremanipulationaction-properties-deviceid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedIgnoreManipulationAction/properties/deviceId")                                     |
| [admin](#admin)                                           | `boolean` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedignoremanipulationaction-properties-admin.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedIgnoreManipulationAction/properties/admin")                                           |
| [adminA](#admina)                                         | `boolean` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedignoremanipulationaction-properties-admina.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedIgnoreManipulationAction/properties/adminA")                                         |
| [downgrade](#downgrade)                                   | `boolean` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedignoremanipulationaction-properties-downgrade.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedIgnoreManipulationAction/properties/downgrade")                                   |
| [notification](#notification)                             | `boolean` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedignoremanipulationaction-properties-notification.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedIgnoreManipulationAction/properties/notification")                             |
| [usageStats](#usagestats)                                 | `boolean` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedignoremanipulationaction-properties-usagestats.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedIgnoreManipulationAction/properties/usageStats")                                 |
| [hadManipulation](#hadmanipulation)                       | `boolean` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedignoremanipulationaction-properties-hadmanipulation.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedIgnoreManipulationAction/properties/hadManipulation")                       |
| [reboot](#reboot)                                         | `boolean` | Optional | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedignoremanipulationaction-properties-reboot.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedIgnoreManipulationAction/properties/reboot")                                         |
| [overlay](#overlay)                                       | `boolean` | Optional | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedignoremanipulationaction-properties-overlay.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedIgnoreManipulationAction/properties/overlay")                                       |
| [accessibilityService](#accessibilityservice)             | `boolean` | Optional | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedignoremanipulationaction-properties-accessibilityservice.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedIgnoreManipulationAction/properties/accessibilityService")             |
| [ignoreHadManipulationFlags](#ignorehadmanipulationflags) | `number`  | Optional | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedignoremanipulationaction-properties-ignorehadmanipulationflags.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedIgnoreManipulationAction/properties/ignoreHadManipulationFlags") |
| [ignoreManipulationFlags](#ignoremanipulationflags)       | `number`  | Optional | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedignoremanipulationaction-properties-ignoremanipulationflags.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedIgnoreManipulationAction/properties/ignoreManipulationFlags")       |

## type



`type`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedignoremanipulationaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedIgnoreManipulationAction/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                   | Explanation |
| :---------------------- | :---------- |
| `"IGNORE_MANIPULATION"` |             |

## deviceId



`deviceId`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedignoremanipulationaction-properties-deviceid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedIgnoreManipulationAction/properties/deviceId")

### deviceId Type

`string`

## admin



`admin`

* is required

* Type: `boolean`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedignoremanipulationaction-properties-admin.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedIgnoreManipulationAction/properties/admin")

### admin Type

`boolean`

## adminA



`adminA`

* is required

* Type: `boolean`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedignoremanipulationaction-properties-admina.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedIgnoreManipulationAction/properties/adminA")

### adminA Type

`boolean`

## downgrade



`downgrade`

* is required

* Type: `boolean`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedignoremanipulationaction-properties-downgrade.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedIgnoreManipulationAction/properties/downgrade")

### downgrade Type

`boolean`

## notification



`notification`

* is required

* Type: `boolean`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedignoremanipulationaction-properties-notification.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedIgnoreManipulationAction/properties/notification")

### notification Type

`boolean`

## usageStats



`usageStats`

* is required

* Type: `boolean`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedignoremanipulationaction-properties-usagestats.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedIgnoreManipulationAction/properties/usageStats")

### usageStats Type

`boolean`

## hadManipulation



`hadManipulation`

* is required

* Type: `boolean`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedignoremanipulationaction-properties-hadmanipulation.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedIgnoreManipulationAction/properties/hadManipulation")

### hadManipulation Type

`boolean`

## reboot



`reboot`

* is optional

* Type: `boolean`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedignoremanipulationaction-properties-reboot.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedIgnoreManipulationAction/properties/reboot")

### reboot Type

`boolean`

## overlay



`overlay`

* is optional

* Type: `boolean`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedignoremanipulationaction-properties-overlay.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedIgnoreManipulationAction/properties/overlay")

### overlay Type

`boolean`

## accessibilityService



`accessibilityService`

* is optional

* Type: `boolean`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedignoremanipulationaction-properties-accessibilityservice.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedIgnoreManipulationAction/properties/accessibilityService")

### accessibilityService Type

`boolean`

## ignoreHadManipulationFlags



`ignoreHadManipulationFlags`

* is optional

* Type: `number`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedignoremanipulationaction-properties-ignorehadmanipulationflags.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedIgnoreManipulationAction/properties/ignoreHadManipulationFlags")

### ignoreHadManipulationFlags Type

`number`

## ignoreManipulationFlags



`ignoreManipulationFlags`

* is optional

* Type: `number`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedignoremanipulationaction-properties-ignoremanipulationflags.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedIgnoreManipulationAction/properties/ignoreManipulationFlags")

### ignoreManipulationFlags Type

`number`
