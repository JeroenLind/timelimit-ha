# SerializedReviewChildTaskAction Schema

```txt
https://timelimit.io/SerializedParentAction#/definitions/SerializedReviewChildTaskAction
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                        |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedParentAction.schema.json\*](SerializedParentAction.schema.json "open original schema") |

## SerializedReviewChildTaskAction Type

`object` ([SerializedReviewChildTaskAction](serializedparentaction-definitions-serializedreviewchildtaskaction.md))

# SerializedReviewChildTaskAction Properties

| Property          | Type      | Required | Nullable       | Defined by                                                                                                                                                                                                                     |
| :---------------- | :-------- | :------- | :------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)     | `string`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedreviewchildtaskaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedReviewChildTaskAction/properties/type")     |
| [taskId](#taskid) | `string`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedreviewchildtaskaction-properties-taskid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedReviewChildTaskAction/properties/taskId") |
| [ok](#ok)         | `boolean` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedreviewchildtaskaction-properties-ok.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedReviewChildTaskAction/properties/ok")         |
| [time](#time)     | `number`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedreviewchildtaskaction-properties-time.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedReviewChildTaskAction/properties/time")     |
| [day](#day)       | `number`  | Optional | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedreviewchildtaskaction-properties-day.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedReviewChildTaskAction/properties/day")       |

## type



`type`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedreviewchildtaskaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedReviewChildTaskAction/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                 | Explanation |
| :-------------------- | :---------- |
| `"REVIEW_CHILD_TASK"` |             |

## taskId



`taskId`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedreviewchildtaskaction-properties-taskid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedReviewChildTaskAction/properties/taskId")

### taskId Type

`string`

## ok



`ok`

* is required

* Type: `boolean`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedreviewchildtaskaction-properties-ok.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedReviewChildTaskAction/properties/ok")

### ok Type

`boolean`

## time



`time`

* is required

* Type: `number`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedreviewchildtaskaction-properties-time.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedReviewChildTaskAction/properties/time")

### time Type

`number`

## day



`day`

* is optional

* Type: `number`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedreviewchildtaskaction-properties-day.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedReviewChildTaskAction/properties/day")

### day Type

`number`
