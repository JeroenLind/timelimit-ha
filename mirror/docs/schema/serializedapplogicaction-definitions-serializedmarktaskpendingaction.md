# SerializedMarkTaskPendingAction Schema

```txt
https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedMarkTaskPendingAction
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                            |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :---------------------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedAppLogicAction.schema.json\*](SerializedAppLogicAction.schema.json "open original schema") |

## SerializedMarkTaskPendingAction Type

`object` ([SerializedMarkTaskPendingAction](serializedapplogicaction-definitions-serializedmarktaskpendingaction.md))

# SerializedMarkTaskPendingAction Properties

| Property          | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                           |
| :---------------- | :------- | :------- | :------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)     | `string` | Required | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedmarktaskpendingaction-properties-type.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedMarkTaskPendingAction/properties/type")     |
| [taskId](#taskid) | `string` | Required | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedmarktaskpendingaction-properties-taskid.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedMarkTaskPendingAction/properties/taskId") |

## type



`type`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedmarktaskpendingaction-properties-type.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedMarkTaskPendingAction/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                 | Explanation |
| :-------------------- | :---------- |
| `"MARK_TASK_PENDING"` |             |

## taskId



`taskId`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedmarktaskpendingaction-properties-taskid.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedMarkTaskPendingAction/properties/taskId")

### taskId Type

`string`
