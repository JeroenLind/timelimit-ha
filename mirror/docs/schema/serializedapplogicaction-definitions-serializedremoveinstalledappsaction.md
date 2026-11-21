# SerializedRemoveInstalledAppsAction Schema

```txt
https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedRemoveInstalledAppsAction
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                            |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :---------------------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedAppLogicAction.schema.json\*](SerializedAppLogicAction.schema.json "open original schema") |

## SerializedRemoveInstalledAppsAction Type

`object` ([SerializedRemoveInstalledAppsAction](serializedapplogicaction-definitions-serializedremoveinstalledappsaction.md))

# SerializedRemoveInstalledAppsAction Properties

| Property                      | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                                               |
| :---------------------------- | :------- | :------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)                 | `string` | Required | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedremoveinstalledappsaction-properties-type.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedRemoveInstalledAppsAction/properties/type")                 |
| [packageNames](#packagenames) | `array`  | Required | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedremoveinstalledappsaction-properties-packagenames.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedRemoveInstalledAppsAction/properties/packageNames") |

## type



`type`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedremoveinstalledappsaction-properties-type.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedRemoveInstalledAppsAction/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                     | Explanation |
| :------------------------ | :---------- |
| `"REMOVE_INSTALLED_APPS"` |             |

## packageNames



`packageNames`

* is required

* Type: `string[]`

* cannot be null

* defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedremoveinstalledappsaction-properties-packagenames.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedRemoveInstalledAppsAction/properties/packageNames")

### packageNames Type

`string[]`
