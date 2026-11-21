# SerializedIncrementCategoryExtraTimeAction Schema

```txt
https://timelimit.io/SerializedParentAction#/definitions/SerializedIncrementCategoryExtraTimeAction
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                        |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedParentAction.schema.json\*](SerializedParentAction.schema.json "open original schema") |

## SerializedIncrementCategoryExtraTimeAction Type

`object` ([SerializedIncrementCategoryExtraTimeAction](serializedparentaction-definitions-serializedincrementcategoryextratimeaction.md))

# SerializedIncrementCategoryExtraTimeAction Properties

| Property                          | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                                                           |
| :-------------------------------- | :------- | :------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)                     | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedincrementcategoryextratimeaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedIncrementCategoryExtraTimeAction/properties/type")                     |
| [categoryId](#categoryid)         | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedincrementcategoryextratimeaction-properties-categoryid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedIncrementCategoryExtraTimeAction/properties/categoryId")         |
| [addedExtraTime](#addedextratime) | `number` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedincrementcategoryextratimeaction-properties-addedextratime.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedIncrementCategoryExtraTimeAction/properties/addedExtraTime") |
| [day](#day)                       | `number` | Optional | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedincrementcategoryextratimeaction-properties-day.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedIncrementCategoryExtraTimeAction/properties/day")                       |

## type



`type`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedincrementcategoryextratimeaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedIncrementCategoryExtraTimeAction/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                            | Explanation |
| :------------------------------- | :---------- |
| `"INCREMENT_CATEGORY_EXTRATIME"` |             |

## categoryId



`categoryId`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedincrementcategoryextratimeaction-properties-categoryid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedIncrementCategoryExtraTimeAction/properties/categoryId")

### categoryId Type

`string`

## addedExtraTime



`addedExtraTime`

* is required

* Type: `number`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedincrementcategoryextratimeaction-properties-addedextratime.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedIncrementCategoryExtraTimeAction/properties/addedExtraTime")

### addedExtraTime Type

`number`

## day



`day`

* is optional

* Type: `number`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedincrementcategoryextratimeaction-properties-day.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedIncrementCategoryExtraTimeAction/properties/day")

### day Type

`number`
