# SerializedUpdateCategoryFlagsAction Schema

```txt
https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryFlagsAction
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                        |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedParentAction.schema.json\*](SerializedParentAction.schema.json "open original schema") |

## SerializedUpdateCategoryFlagsAction Type

`object` ([SerializedUpdateCategoryFlagsAction](serializedparentaction-definitions-serializedupdatecategoryflagsaction.md))

# SerializedUpdateCategoryFlagsAction Properties

| Property                  | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                                     |
| :------------------------ | :------- | :------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)             | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategoryflagsaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryFlagsAction/properties/type")             |
| [categoryId](#categoryid) | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategoryflagsaction-properties-categoryid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryFlagsAction/properties/categoryId") |
| [modified](#modified)     | `number` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategoryflagsaction-properties-modified.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryFlagsAction/properties/modified")     |
| [values](#values)         | `number` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategoryflagsaction-properties-values.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryFlagsAction/properties/values")         |

## type



`type`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategoryflagsaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryFlagsAction/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                     | Explanation |
| :------------------------ | :---------- |
| `"UPDATE_CATEGORY_FLAGS"` |             |

## categoryId



`categoryId`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategoryflagsaction-properties-categoryid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryFlagsAction/properties/categoryId")

### categoryId Type

`string`

## modified



`modified`

* is required

* Type: `number`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategoryflagsaction-properties-modified.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryFlagsAction/properties/modified")

### modified Type

`number`

## values



`values`

* is required

* Type: `number`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategoryflagsaction-properties-values.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryFlagsAction/properties/values")

### values Type

`number`
