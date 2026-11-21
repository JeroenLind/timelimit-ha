# SerializedUpdateCategorySortingAction Schema

```txt
https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategorySortingAction
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                        |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedParentAction.schema.json\*](SerializedParentAction.schema.json "open original schema") |

## SerializedUpdateCategorySortingAction Type

`object` ([SerializedUpdateCategorySortingAction](serializedparentaction-definitions-serializedupdatecategorysortingaction.md))

# SerializedUpdateCategorySortingAction Properties

| Property                    | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                                           |
| :-------------------------- | :------- | :------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)               | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorysortingaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategorySortingAction/properties/type")               |
| [categoryIds](#categoryids) | `array`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorysortingaction-properties-categoryids.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategorySortingAction/properties/categoryIds") |

## type



`type`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorysortingaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategorySortingAction/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                       | Explanation |
| :-------------------------- | :---------- |
| `"UPDATE_CATEGORY_SORTING"` |             |

## categoryIds



`categoryIds`

* is required

* Type: `string[]`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorysortingaction-properties-categoryids.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategorySortingAction/properties/categoryIds")

### categoryIds Type

`string[]`
