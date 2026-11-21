# SerializedAddCategoryAppsAction Schema

```txt
https://timelimit.io/SerializedParentAction#/definitions/SerializedAddCategoryAppsAction
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                        |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedParentAction.schema.json\*](SerializedParentAction.schema.json "open original schema") |

## SerializedAddCategoryAppsAction Type

`object` ([SerializedAddCategoryAppsAction](serializedparentaction-definitions-serializedaddcategoryappsaction.md))

# SerializedAddCategoryAppsAction Properties

| Property                      | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                                 |
| :---------------------------- | :------- | :------- | :------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)                 | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedaddcategoryappsaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedAddCategoryAppsAction/properties/type")                 |
| [categoryId](#categoryid)     | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedaddcategoryappsaction-properties-categoryid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedAddCategoryAppsAction/properties/categoryId")     |
| [packageNames](#packagenames) | `array`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedaddcategoryappsaction-properties-packagenames.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedAddCategoryAppsAction/properties/packageNames") |

## type



`type`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedaddcategoryappsaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedAddCategoryAppsAction/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                 | Explanation |
| :-------------------- | :---------- |
| `"ADD_CATEGORY_APPS"` |             |

## categoryId



`categoryId`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedaddcategoryappsaction-properties-categoryid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedAddCategoryAppsAction/properties/categoryId")

### categoryId Type

`string`

## packageNames



`packageNames`

* is required

* Type: `string[]`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedaddcategoryappsaction-properties-packagenames.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedAddCategoryAppsAction/properties/packageNames")

### packageNames Type

`string[]`
