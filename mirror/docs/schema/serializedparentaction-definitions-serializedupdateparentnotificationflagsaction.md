# SerializedUpdateParentNotificationFlagsAction Schema

```txt
https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateParentNotificationFlagsAction
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                        |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedParentAction.schema.json\*](SerializedParentAction.schema.json "open original schema") |

## SerializedUpdateParentNotificationFlagsAction Type

`object` ([SerializedUpdateParentNotificationFlagsAction](serializedparentaction-definitions-serializedupdateparentnotificationflagsaction.md))

# SerializedUpdateParentNotificationFlagsAction Properties

| Property              | Type      | Required | Nullable       | Defined by                                                                                                                                                                                                                                                     |
| :-------------------- | :-------- | :------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)         | `string`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdateparentnotificationflagsaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateParentNotificationFlagsAction/properties/type")         |
| [parentId](#parentid) | `string`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdateparentnotificationflagsaction-properties-parentid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateParentNotificationFlagsAction/properties/parentId") |
| [flags](#flags)       | `number`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdateparentnotificationflagsaction-properties-flags.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateParentNotificationFlagsAction/properties/flags")       |
| [set](#set)           | `boolean` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdateparentnotificationflagsaction-properties-set.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateParentNotificationFlagsAction/properties/set")           |

## type



`type`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdateparentnotificationflagsaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateParentNotificationFlagsAction/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                                | Explanation |
| :----------------------------------- | :---------- |
| `"UPDATE_PARENT_NOTIFICATION_FLAGS"` |             |

## parentId



`parentId`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdateparentnotificationflagsaction-properties-parentid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateParentNotificationFlagsAction/properties/parentId")

### parentId Type

`string`

## flags



`flags`

* is required

* Type: `number`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdateparentnotificationflagsaction-properties-flags.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateParentNotificationFlagsAction/properties/flags")

### flags Type

`number`

## set



`set`

* is required

* Type: `boolean`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdateparentnotificationflagsaction-properties-set.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateParentNotificationFlagsAction/properties/set")

### set Type

`boolean`
