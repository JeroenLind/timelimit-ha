# SerializedUpdateChildTaskAction Schema

```txt
https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateChildTaskAction
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                        |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedParentAction.schema.json\*](SerializedParentAction.schema.json "open original schema") |

## SerializedUpdateChildTaskAction Type

`object` ([SerializedUpdateChildTaskAction](serializedparentaction-definitions-serializedupdatechildtaskaction.md))

# SerializedUpdateChildTaskAction Properties

| Property                                | Type      | Required | Nullable       | Defined by                                                                                                                                                                                                                                           |
| :-------------------------------------- | :-------- | :------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)                           | `string`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatechildtaskaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateChildTaskAction/properties/type")                           |
| [isNew](#isnew)                         | `boolean` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatechildtaskaction-properties-isnew.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateChildTaskAction/properties/isNew")                         |
| [taskId](#taskid)                       | `string`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatechildtaskaction-properties-taskid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateChildTaskAction/properties/taskId")                       |
| [categoryId](#categoryid)               | `string`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatechildtaskaction-properties-categoryid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateChildTaskAction/properties/categoryId")               |
| [taskTitle](#tasktitle)                 | `string`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatechildtaskaction-properties-tasktitle.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateChildTaskAction/properties/taskTitle")                 |
| [extraTimeDuration](#extratimeduration) | `number`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatechildtaskaction-properties-extratimeduration.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateChildTaskAction/properties/extraTimeDuration") |

## type



`type`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatechildtaskaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateChildTaskAction/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                 | Explanation |
| :-------------------- | :---------- |
| `"UPDATE_CHILD_TASK"` |             |

## isNew



`isNew`

* is required

* Type: `boolean`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatechildtaskaction-properties-isnew.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateChildTaskAction/properties/isNew")

### isNew Type

`boolean`

## taskId



`taskId`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatechildtaskaction-properties-taskid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateChildTaskAction/properties/taskId")

### taskId Type

`string`

## categoryId



`categoryId`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatechildtaskaction-properties-categoryid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateChildTaskAction/properties/categoryId")

### categoryId Type

`string`

## taskTitle



`taskTitle`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatechildtaskaction-properties-tasktitle.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateChildTaskAction/properties/taskTitle")

### taskTitle Type

`string`

## extraTimeDuration



`extraTimeDuration`

* is required

* Type: `number`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatechildtaskaction-properties-extratimeduration.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateChildTaskAction/properties/extraTimeDuration")

### extraTimeDuration Type

`number`
