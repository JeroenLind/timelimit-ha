# Untitled object in ClientPushChangesRequest Schema

```txt
https://timelimit.io/ClientPushChangesRequest#/properties/actions/items
```




| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                            |
| :------------------ | ---------- | -------------- | ------------ | :---------------- | --------------------- | ------------------- | ----------------------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [ClientPushChangesRequest.schema.json\*](ClientPushChangesRequest.schema.json "open original schema") |

## items Type

`object` ([Details](clientpushchangesrequest-properties-actions-items.md))

# undefined Properties

| Property                          | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                          |
| :-------------------------------- | -------- | -------- | -------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [encodedAction](#encodedAction)   | `string` | Required | cannot be null | [ClientPushChangesRequest](clientpushchangesrequest-properties-actions-items-properties-encodedaction.md "https&#x3A;//timelimit.io/ClientPushChangesRequest#/properties/actions/items/properties/encodedAction")   |
| [sequenceNumber](#sequenceNumber) | `number` | Required | cannot be null | [ClientPushChangesRequest](clientpushchangesrequest-properties-actions-items-properties-sequencenumber.md "https&#x3A;//timelimit.io/ClientPushChangesRequest#/properties/actions/items/properties/sequenceNumber") |
| [integrity](#integrity)           | `string` | Required | cannot be null | [ClientPushChangesRequest](clientpushchangesrequest-properties-actions-items-properties-integrity.md "https&#x3A;//timelimit.io/ClientPushChangesRequest#/properties/actions/items/properties/integrity")           |
| [type](#type)                     | `string` | Required | cannot be null | [ClientPushChangesRequest](clientpushchangesrequest-properties-actions-items-properties-type.md "https&#x3A;//timelimit.io/ClientPushChangesRequest#/properties/actions/items/properties/type")                     |
| [userId](#userId)                 | `string` | Required | cannot be null | [ClientPushChangesRequest](clientpushchangesrequest-properties-actions-items-properties-userid.md "https&#x3A;//timelimit.io/ClientPushChangesRequest#/properties/actions/items/properties/userId")                 |

## encodedAction




`encodedAction`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [ClientPushChangesRequest](clientpushchangesrequest-properties-actions-items-properties-encodedaction.md "https&#x3A;//timelimit.io/ClientPushChangesRequest#/properties/actions/items/properties/encodedAction")

### encodedAction Type

`string`

## sequenceNumber




`sequenceNumber`

-   is required
-   Type: `number`
-   cannot be null
-   defined in: [ClientPushChangesRequest](clientpushchangesrequest-properties-actions-items-properties-sequencenumber.md "https&#x3A;//timelimit.io/ClientPushChangesRequest#/properties/actions/items/properties/sequenceNumber")

### sequenceNumber Type

`number`

## integrity




`integrity`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [ClientPushChangesRequest](clientpushchangesrequest-properties-actions-items-properties-integrity.md "https&#x3A;//timelimit.io/ClientPushChangesRequest#/properties/actions/items/properties/integrity")

### integrity Type

`string`

## type




`type`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [ClientPushChangesRequest](clientpushchangesrequest-properties-actions-items-properties-type.md "https&#x3A;//timelimit.io/ClientPushChangesRequest#/properties/actions/items/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value        | Explanation |
| :----------- | ----------- |
| `"appLogic"` |             |
| `"child"`    |             |
| `"parent"`   |             |

## userId




`userId`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [ClientPushChangesRequest](clientpushchangesrequest-properties-actions-items-properties-userid.md "https&#x3A;//timelimit.io/ClientPushChangesRequest#/properties/actions/items/properties/userId")

### userId Type

`string`
