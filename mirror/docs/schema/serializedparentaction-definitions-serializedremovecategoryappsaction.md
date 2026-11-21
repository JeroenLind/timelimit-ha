# SerializedRemoveCategoryAppsAction Schema

```txt
https://timelimit.io/SerializedParentAction#/definitions/SerializedRemoveCategoryAppsAction
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                        |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedParentAction.schema.json\*](SerializedParentAction.schema.json "open original schema") |

## SerializedRemoveCategoryAppsAction Type

`object` ([SerializedRemoveCategoryAppsAction](serializedparentaction-definitions-serializedremovecategoryappsaction.md))

# SerializedRemoveCategoryAppsAction Properties

| Property                      | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                                       |
| :---------------------------- | :------- | :------- | :------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)                 | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedremovecategoryappsaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedRemoveCategoryAppsAction/properties/type")                 |
| [categoryId](#categoryid)     | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedremovecategoryappsaction-properties-categoryid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedRemoveCategoryAppsAction/properties/categoryId")     |
| [packageNames](#packagenames) | `array`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedremovecategoryappsaction-properties-packagenames.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedRemoveCategoryAppsAction/properties/packageNames") |

## type



`type`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedremovecategoryappsaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedRemoveCategoryAppsAction/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                    | Explanation |
| :----------------------- | :---------- |
| `"REMOVE_CATEGORY_APPS"` |             |

## categoryId



`categoryId`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedremovecategoryappsaction-properties-categoryid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedRemoveCategoryAppsAction/properties/categoryId")

### categoryId Type

`string`

## packageNames



`packageNames`

* is required

* Type: `string[]`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedremovecategoryappsaction-properties-packagenames.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedRemoveCategoryAppsAction/properties/packageNames")

### packageNames Type

`string[]`
