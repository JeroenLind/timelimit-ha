# SerializedUpdateInstalledAppsAction Schema

```txt
https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUpdateInstalledAppsAction
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                            |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :---------------------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedAppLogicAction.schema.json\*](SerializedAppLogicAction.schema.json "open original schema") |

## SerializedUpdateInstalledAppsAction Type

`object` ([SerializedUpdateInstalledAppsAction](serializedapplogicaction-definitions-serializedupdateinstalledappsaction.md))

# SerializedUpdateInstalledAppsAction Properties

| Property      | Type      | Required | Nullable       | Defined by                                                                                                                                                                                                                               |
| :------------ | :-------- | :------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type) | `string`  | Required | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdateinstalledappsaction-properties-type.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUpdateInstalledAppsAction/properties/type") |
| [b](#b)       | `string`  | Optional | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdateinstalledappsaction-properties-b.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUpdateInstalledAppsAction/properties/b")       |
| [d](#d)       | `string`  | Optional | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdateinstalledappsaction-properties-d.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUpdateInstalledAppsAction/properties/d")       |
| [w](#w)       | `boolean` | Required | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdateinstalledappsaction-properties-w.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUpdateInstalledAppsAction/properties/w")       |

## type



`type`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdateinstalledappsaction-properties-type.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUpdateInstalledAppsAction/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                     | Explanation |
| :------------------------ | :---------- |
| `"UPDATE_INSTALLED_APPS"` |             |

## b



`b`

* is optional

* Type: `string`

* cannot be null

* defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdateinstalledappsaction-properties-b.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUpdateInstalledAppsAction/properties/b")

### b Type

`string`

## d



`d`

* is optional

* Type: `string`

* cannot be null

* defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdateinstalledappsaction-properties-d.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUpdateInstalledAppsAction/properties/d")

### d Type

`string`

## w



`w`

* is required

* Type: `boolean`

* cannot be null

* defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdateinstalledappsaction-properties-w.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUpdateInstalledAppsAction/properties/w")

### w Type

`boolean`
