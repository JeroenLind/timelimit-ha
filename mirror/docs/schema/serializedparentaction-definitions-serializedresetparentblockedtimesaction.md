# SerializedResetParentBlockedTimesAction Schema

```txt
https://timelimit.io/SerializedParentAction#/definitions/SerializedResetParentBlockedTimesAction
```




| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                        |
| :------------------ | ---------- | -------------- | ------------ | :---------------- | --------------------- | ------------------- | ------------------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedParentAction.schema.json\*](SerializedParentAction.schema.json "open original schema") |

## SerializedResetParentBlockedTimesAction Type

`object` ([SerializedResetParentBlockedTimesAction](serializedparentaction-definitions-serializedresetparentblockedtimesaction.md))

# SerializedResetParentBlockedTimesAction Properties

| Property              | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                                              |
| :-------------------- | -------- | -------- | -------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [type](#type)         | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedresetparentblockedtimesaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedResetParentBlockedTimesAction/properties/type")         |
| [parentId](#parentId) | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedresetparentblockedtimesaction-properties-parentid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedResetParentBlockedTimesAction/properties/parentId") |

## type




`type`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedresetparentblockedtimesaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedResetParentBlockedTimesAction/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                          | Explanation |
| :----------------------------- | ----------- |
| `"RESET_PARENT_BLOCKED_TIMES"` |             |

## parentId




`parentId`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedresetparentblockedtimesaction-properties-parentid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedResetParentBlockedTimesAction/properties/parentId")

### parentId Type

`string`
