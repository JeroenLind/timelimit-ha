# SerializedUpdateUserLimitLoginPreBlockDuration Schema

```txt
https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateUserLimitLoginPreBlockDuration
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                        |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedParentAction.schema.json\*](SerializedParentAction.schema.json "open original schema") |

## SerializedUpdateUserLimitLoginPreBlockDuration Type

`object` ([SerializedUpdateUserLimitLoginPreBlockDuration](serializedparentaction-definitions-serializedupdateuserlimitloginpreblockduration.md))

# SerializedUpdateUserLimitLoginPreBlockDuration Properties

| Property                              | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                                                                       |
| :------------------------------------ | :------- | :------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)                         | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdateuserlimitloginpreblockduration-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateUserLimitLoginPreBlockDuration/properties/type")                         |
| [userId](#userid)                     | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdateuserlimitloginpreblockduration-properties-userid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateUserLimitLoginPreBlockDuration/properties/userId")                     |
| [preBlockDuration](#preblockduration) | `number` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdateuserlimitloginpreblockduration-properties-preblockduration.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateUserLimitLoginPreBlockDuration/properties/preBlockDuration") |

## type



`type`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdateuserlimitloginpreblockduration-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateUserLimitLoginPreBlockDuration/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                                          | Explanation |
| :--------------------------------------------- | :---------- |
| `"UPDATE_USER_LIMIT_LOGIN_PRE_BLOCK_DURATION"` |             |

## userId



`userId`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdateuserlimitloginpreblockduration-properties-userid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateUserLimitLoginPreBlockDuration/properties/userId")

### userId Type

`string`

## preBlockDuration



`preBlockDuration`

* is required

* Type: `number`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdateuserlimitloginpreblockduration-properties-preblockduration.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateUserLimitLoginPreBlockDuration/properties/preBlockDuration")

### preBlockDuration Type

`number`
