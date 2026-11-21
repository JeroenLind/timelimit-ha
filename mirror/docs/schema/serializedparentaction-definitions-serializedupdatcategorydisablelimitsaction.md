# SerializedUpdatCategoryDisableLimitsAction Schema

```txt
https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdatCategoryDisableLimitsAction
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                        |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedParentAction.schema.json\*](SerializedParentAction.schema.json "open original schema") |

## SerializedUpdatCategoryDisableLimitsAction Type

`object` ([SerializedUpdatCategoryDisableLimitsAction](serializedparentaction-definitions-serializedupdatcategorydisablelimitsaction.md))

# SerializedUpdatCategoryDisableLimitsAction Properties

| Property                  | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                                                   |
| :------------------------ | :------- | :------- | :------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)             | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatcategorydisablelimitsaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdatCategoryDisableLimitsAction/properties/type")             |
| [categoryId](#categoryid) | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatcategorydisablelimitsaction-properties-categoryid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdatCategoryDisableLimitsAction/properties/categoryId") |
| [endTime](#endtime)       | `number` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatcategorydisablelimitsaction-properties-endtime.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdatCategoryDisableLimitsAction/properties/endTime")       |

## type



`type`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatcategorydisablelimitsaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdatCategoryDisableLimitsAction/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                              | Explanation |
| :--------------------------------- | :---------- |
| `"UPDATE_CATEGORY_DISABLE_LIMITS"` |             |

## categoryId



`categoryId`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatcategorydisablelimitsaction-properties-categoryid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdatCategoryDisableLimitsAction/properties/categoryId")

### categoryId Type

`string`

## endTime



`endTime`

* is required

* Type: `number`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatcategorydisablelimitsaction-properties-endtime.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdatCategoryDisableLimitsAction/properties/endTime")

### endTime Type

`number`
