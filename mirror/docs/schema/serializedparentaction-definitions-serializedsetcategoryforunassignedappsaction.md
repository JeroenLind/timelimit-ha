# SerializedSetCategoryForUnassignedAppsAction Schema

```txt
https://timelimit.io/SerializedParentAction#/definitions/SerializedSetCategoryForUnassignedAppsAction
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                        |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedParentAction.schema.json\*](SerializedParentAction.schema.json "open original schema") |

## SerializedSetCategoryForUnassignedAppsAction Type

`object` ([SerializedSetCategoryForUnassignedAppsAction](serializedparentaction-definitions-serializedsetcategoryforunassignedappsaction.md))

# SerializedSetCategoryForUnassignedAppsAction Properties

| Property                  | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                                                       |
| :------------------------ | :------- | :------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)             | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetcategoryforunassignedappsaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetCategoryForUnassignedAppsAction/properties/type")             |
| [childId](#childid)       | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetcategoryforunassignedappsaction-properties-childid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetCategoryForUnassignedAppsAction/properties/childId")       |
| [categoryId](#categoryid) | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetcategoryforunassignedappsaction-properties-categoryid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetCategoryForUnassignedAppsAction/properties/categoryId") |

## type



`type`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetcategoryforunassignedappsaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetCategoryForUnassignedAppsAction/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                                | Explanation |
| :----------------------------------- | :---------- |
| `"SET_CATEGORY_FOR_UNASSIGNED_APPS"` |             |

## childId



`childId`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetcategoryforunassignedappsaction-properties-childid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetCategoryForUnassignedAppsAction/properties/childId")

### childId Type

`string`

## categoryId



`categoryId`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetcategoryforunassignedappsaction-properties-categoryid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetCategoryForUnassignedAppsAction/properties/categoryId")

### categoryId Type

`string`
