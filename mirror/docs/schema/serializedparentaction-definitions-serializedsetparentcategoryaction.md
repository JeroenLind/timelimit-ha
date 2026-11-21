# SerializedSetParentCategoryAction Schema

```txt
https://timelimit.io/SerializedParentAction#/definitions/SerializedSetParentCategoryAction
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                        |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedParentAction.schema.json\*](SerializedParentAction.schema.json "open original schema") |

## SerializedSetParentCategoryAction Type

`object` ([SerializedSetParentCategoryAction](serializedparentaction-definitions-serializedsetparentcategoryaction.md))

# SerializedSetParentCategoryAction Properties

| Property                          | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                                         |
| :-------------------------------- | :------- | :------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)                     | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetparentcategoryaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetParentCategoryAction/properties/type")                     |
| [categoryId](#categoryid)         | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetparentcategoryaction-properties-categoryid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetParentCategoryAction/properties/categoryId")         |
| [parentCategory](#parentcategory) | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetparentcategoryaction-properties-parentcategory.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetParentCategoryAction/properties/parentCategory") |

## type



`type`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetparentcategoryaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetParentCategoryAction/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                   | Explanation |
| :---------------------- | :---------- |
| `"SET_PARENT_CATEGORY"` |             |

## categoryId



`categoryId`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetparentcategoryaction-properties-categoryid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetParentCategoryAction/properties/categoryId")

### categoryId Type

`string`

## parentCategory



`parentCategory`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetparentcategoryaction-properties-parentcategory.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetParentCategoryAction/properties/parentCategory")

### parentCategory Type

`string`
