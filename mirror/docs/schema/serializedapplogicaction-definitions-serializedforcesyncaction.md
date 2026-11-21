# SerializedForceSyncAction Schema

```txt
https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedForceSyncAction
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                            |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :---------------------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedAppLogicAction.schema.json\*](SerializedAppLogicAction.schema.json "open original schema") |

## SerializedForceSyncAction Type

`object` ([SerializedForceSyncAction](serializedapplogicaction-definitions-serializedforcesyncaction.md))

# SerializedForceSyncAction Properties

| Property      | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                           |
| :------------ | :------- | :------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type) | `string` | Required | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedforcesyncaction-properties-type.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedForceSyncAction/properties/type") |

## type



`type`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedforcesyncaction-properties-type.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedForceSyncAction/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value          | Explanation |
| :------------- | :---------- |
| `"FORCE_SYNC"` |             |
