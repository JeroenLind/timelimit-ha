# SerializedUpdateCategoryBlockedTimesAction Schema

```txt
https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryBlockedTimesAction
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                        |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedParentAction.schema.json\*](SerializedParentAction.schema.json "open original schema") |

## SerializedUpdateCategoryBlockedTimesAction Type

`object` ([SerializedUpdateCategoryBlockedTimesAction](serializedparentaction-definitions-serializedupdatecategoryblockedtimesaction.md))

# SerializedUpdateCategoryBlockedTimesAction Properties

| Property                  | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                                                   |
| :------------------------ | :------- | :------- | :------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)             | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategoryblockedtimesaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryBlockedTimesAction/properties/type")             |
| [categoryId](#categoryid) | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategoryblockedtimesaction-properties-categoryid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryBlockedTimesAction/properties/categoryId") |
| [times](#times)           | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategoryblockedtimesaction-properties-times.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryBlockedTimesAction/properties/times")           |

## type



`type`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategoryblockedtimesaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryBlockedTimesAction/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                             | Explanation |
| :-------------------------------- | :---------- |
| `"UPDATE_CATEGORY_BLOCKED_TIMES"` |             |

## categoryId



`categoryId`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategoryblockedtimesaction-properties-categoryid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryBlockedTimesAction/properties/categoryId")

### categoryId Type

`string`

## times



`times`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategoryblockedtimesaction-properties-times.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryBlockedTimesAction/properties/times")

### times Type

`string`
