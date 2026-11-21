# SerializedSetCategoryExtraTimeAction Schema

```txt
https://timelimit.io/SerializedParentAction#/definitions/SerializedSetCategoryExtraTimeAction
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                        |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedParentAction.schema.json\*](SerializedParentAction.schema.json "open original schema") |

## SerializedSetCategoryExtraTimeAction Type

`object` ([SerializedSetCategoryExtraTimeAction](serializedparentaction-definitions-serializedsetcategoryextratimeaction.md))

# SerializedSetCategoryExtraTimeAction Properties

| Property                      | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                                           |
| :---------------------------- | :------- | :------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)                 | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetcategoryextratimeaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetCategoryExtraTimeAction/properties/type")                 |
| [categoryId](#categoryid)     | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetcategoryextratimeaction-properties-categoryid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetCategoryExtraTimeAction/properties/categoryId")     |
| [newExtraTime](#newextratime) | `number` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetcategoryextratimeaction-properties-newextratime.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetCategoryExtraTimeAction/properties/newExtraTime") |
| [day](#day)                   | `number` | Optional | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetcategoryextratimeaction-properties-day.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetCategoryExtraTimeAction/properties/day")                   |

## type



`type`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetcategoryextratimeaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetCategoryExtraTimeAction/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                       | Explanation |
| :-------------------------- | :---------- |
| `"SET_CATEGORY_EXTRA_TIME"` |             |

## categoryId



`categoryId`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetcategoryextratimeaction-properties-categoryid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetCategoryExtraTimeAction/properties/categoryId")

### categoryId Type

`string`

## newExtraTime



`newExtraTime`

* is required

* Type: `number`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetcategoryextratimeaction-properties-newextratime.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetCategoryExtraTimeAction/properties/newExtraTime")

### newExtraTime Type

`number`

## day



`day`

* is optional

* Type: `number`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetcategoryextratimeaction-properties-day.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetCategoryExtraTimeAction/properties/day")

### day Type

`number`
