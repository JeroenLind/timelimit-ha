# SerializedCreateCategoryAction Schema

```txt
https://timelimit.io/SerializedParentAction#/definitions/SerializedCreateCategoryAction
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                        |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedParentAction.schema.json\*](SerializedParentAction.schema.json "open original schema") |

## SerializedCreateCategoryAction Type

`object` ([SerializedCreateCategoryAction](serializedparentaction-definitions-serializedcreatecategoryaction.md))

# SerializedCreateCategoryAction Properties

| Property                  | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                           |
| :------------------------ | :------- | :------- | :------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)             | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedcreatecategoryaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedCreateCategoryAction/properties/type")             |
| [childId](#childid)       | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedcreatecategoryaction-properties-childid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedCreateCategoryAction/properties/childId")       |
| [categoryId](#categoryid) | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedcreatecategoryaction-properties-categoryid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedCreateCategoryAction/properties/categoryId") |
| [title](#title)           | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedcreatecategoryaction-properties-title.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedCreateCategoryAction/properties/title")           |

## type



`type`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedcreatecategoryaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedCreateCategoryAction/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value               | Explanation |
| :------------------ | :---------- |
| `"CREATE_CATEGORY"` |             |

## childId



`childId`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedcreatecategoryaction-properties-childid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedCreateCategoryAction/properties/childId")

### childId Type

`string`

## categoryId



`categoryId`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedcreatecategoryaction-properties-categoryid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedCreateCategoryAction/properties/categoryId")

### categoryId Type

`string`

## title



`title`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedcreatecategoryaction-properties-title.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedCreateCategoryAction/properties/title")

### title Type

`string`
