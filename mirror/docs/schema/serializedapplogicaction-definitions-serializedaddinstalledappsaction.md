# SerializedAddInstalledAppsAction Schema

```txt
https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedAddInstalledAppsAction
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                            |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :---------------------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedAppLogicAction.schema.json\*](SerializedAppLogicAction.schema.json "open original schema") |

## SerializedAddInstalledAppsAction Type

`object` ([SerializedAddInstalledAppsAction](serializedapplogicaction-definitions-serializedaddinstalledappsaction.md))

# SerializedAddInstalledAppsAction Properties

| Property      | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                         |
| :------------ | :------- | :------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type) | `string` | Required | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedaddinstalledappsaction-properties-type.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedAddInstalledAppsAction/properties/type") |
| [apps](#apps) | `array`  | Required | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedaddinstalledappsaction-properties-apps.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedAddInstalledAppsAction/properties/apps") |

## type



`type`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedaddinstalledappsaction-properties-type.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedAddInstalledAppsAction/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                  | Explanation |
| :--------------------- | :---------- |
| `"ADD_INSTALLED_APPS"` |             |

## apps



`apps`

* is required

* Type: `object[]` ([SerializedInstalledApp](serializedapplogicaction-definitions-serializedinstalledapp.md))

* cannot be null

* defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedaddinstalledappsaction-properties-apps.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedAddInstalledAppsAction/properties/apps")

### apps Type

`object[]` ([SerializedInstalledApp](serializedapplogicaction-definitions-serializedinstalledapp.md))
