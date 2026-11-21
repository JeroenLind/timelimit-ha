# SerializedUpdateCategoryTitleAction Schema

```txt
https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryTitleAction
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                        |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedParentAction.schema.json\*](SerializedParentAction.schema.json "open original schema") |

## SerializedUpdateCategoryTitleAction Type

`object` ([SerializedUpdateCategoryTitleAction](serializedparentaction-definitions-serializedupdatecategorytitleaction.md))

# SerializedUpdateCategoryTitleAction Properties

| Property                  | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                                     |
| :------------------------ | :------- | :------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)             | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorytitleaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryTitleAction/properties/type")             |
| [categoryId](#categoryid) | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorytitleaction-properties-categoryid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryTitleAction/properties/categoryId") |
| [newTitle](#newtitle)     | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorytitleaction-properties-newtitle.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryTitleAction/properties/newTitle")     |

## type



`type`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorytitleaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryTitleAction/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                     | Explanation |
| :------------------------ | :---------- |
| `"UPDATE_CATEGORY_TITLE"` |             |

## categoryId



`categoryId`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorytitleaction-properties-categoryid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryTitleAction/properties/categoryId")

### categoryId Type

`string`

## newTitle



`newTitle`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorytitleaction-properties-newtitle.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryTitleAction/properties/newTitle")

### newTitle Type

`string`
