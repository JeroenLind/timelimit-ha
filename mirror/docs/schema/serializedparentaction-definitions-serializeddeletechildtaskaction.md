# SerializedDeleteChildTaskAction Schema

```txt
https://timelimit.io/SerializedParentAction#/definitions/SerializedDeleteChildTaskAction
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                        |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedParentAction.schema.json\*](SerializedParentAction.schema.json "open original schema") |

## SerializedDeleteChildTaskAction Type

`object` ([SerializedDeleteChildTaskAction](serializedparentaction-definitions-serializeddeletechildtaskaction.md))

# SerializedDeleteChildTaskAction Properties

| Property          | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                     |
| :---------------- | :------- | :------- | :------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)     | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializeddeletechildtaskaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedDeleteChildTaskAction/properties/type")     |
| [taskId](#taskid) | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializeddeletechildtaskaction-properties-taskid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedDeleteChildTaskAction/properties/taskId") |

## type



`type`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializeddeletechildtaskaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedDeleteChildTaskAction/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                 | Explanation |
| :-------------------- | :---------- |
| `"DELETE_CHILD_TASK"` |             |

## taskId



`taskId`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializeddeletechildtaskaction-properties-taskid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedDeleteChildTaskAction/properties/taskId")

### taskId Type

`string`
