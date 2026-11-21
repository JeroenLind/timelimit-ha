# SerializedUpdateCategoryTemporarilyBlockedAction Schema

```txt
https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryTemporarilyBlockedAction
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                        |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedParentAction.schema.json\*](SerializedParentAction.schema.json "open original schema") |

## SerializedUpdateCategoryTemporarilyBlockedAction Type

`object` ([SerializedUpdateCategoryTemporarilyBlockedAction](serializedparentaction-definitions-serializedupdatecategorytemporarilyblockedaction.md))

# SerializedUpdateCategoryTemporarilyBlockedAction Properties

| Property                  | Type      | Required | Nullable       | Defined by                                                                                                                                                                                                                                                               |
| :------------------------ | :-------- | :------- | :------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)             | `string`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorytemporarilyblockedaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryTemporarilyBlockedAction/properties/type")             |
| [categoryId](#categoryid) | `string`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorytemporarilyblockedaction-properties-categoryid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryTemporarilyBlockedAction/properties/categoryId") |
| [blocked](#blocked)       | `boolean` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorytemporarilyblockedaction-properties-blocked.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryTemporarilyBlockedAction/properties/blocked")       |
| [endTime](#endtime)       | `number`  | Optional | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorytemporarilyblockedaction-properties-endtime.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryTemporarilyBlockedAction/properties/endTime")       |

## type



`type`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorytemporarilyblockedaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryTemporarilyBlockedAction/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                                   | Explanation |
| :-------------------------------------- | :---------- |
| `"UPDATE_CATEGORY_TEMPORARILY_BLOCKED"` |             |

## categoryId



`categoryId`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorytemporarilyblockedaction-properties-categoryid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryTemporarilyBlockedAction/properties/categoryId")

### categoryId Type

`string`

## blocked



`blocked`

* is required

* Type: `boolean`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorytemporarilyblockedaction-properties-blocked.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryTemporarilyBlockedAction/properties/blocked")

### blocked Type

`boolean`

## endTime



`endTime`

* is optional

* Type: `number`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorytemporarilyblockedaction-properties-endtime.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryTemporarilyBlockedAction/properties/endTime")

### endTime Type

`number`
