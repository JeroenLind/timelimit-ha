# SerializedUpdateParentBlockedTimesAction Schema

```txt
https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateParentBlockedTimesAction
```




| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                        |
| :------------------ | ---------- | -------------- | ------------ | :---------------- | --------------------- | ------------------- | ------------------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedParentAction.schema.json\*](SerializedParentAction.schema.json "open original schema") |

## SerializedUpdateParentBlockedTimesAction Type

`object` ([SerializedUpdateParentBlockedTimesAction](serializedparentaction-definitions-serializedupdateparentblockedtimesaction.md))

# SerializedUpdateParentBlockedTimesAction Properties

| Property              | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                                                |
| :-------------------- | -------- | -------- | -------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)         | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdateparentblockedtimesaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateParentBlockedTimesAction/properties/type")         |
| [parentId](#parentId) | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdateparentblockedtimesaction-properties-parentid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateParentBlockedTimesAction/properties/parentId") |
| [times](#times)       | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdateparentblockedtimesaction-properties-times.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateParentBlockedTimesAction/properties/times")       |

## type




`type`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdateparentblockedtimesaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateParentBlockedTimesAction/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                           | Explanation |
| :------------------------------ | ----------- |
| `"UPDATE_PARENT_BLOCKED_TIMES"` |             |

## parentId




`parentId`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdateparentblockedtimesaction-properties-parentid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateParentBlockedTimesAction/properties/parentId")

### parentId Type

`string`

## times




`times`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdateparentblockedtimesaction-properties-times.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateParentBlockedTimesAction/properties/times")

### times Type

`string`
