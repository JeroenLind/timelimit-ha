# SerializedRenameChildAction Schema

```txt
https://timelimit.io/SerializedParentAction#/definitions/SerializedRenameChildAction
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                        |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedParentAction.schema.json\*](SerializedParentAction.schema.json "open original schema") |

## SerializedRenameChildAction Type

`object` ([SerializedRenameChildAction](serializedparentaction-definitions-serializedrenamechildaction.md))

# SerializedRenameChildAction Properties

| Property            | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                               |
| :------------------ | :------- | :------- | :------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)       | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedrenamechildaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedRenameChildAction/properties/type")       |
| [childId](#childid) | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedrenamechildaction-properties-childid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedRenameChildAction/properties/childId") |
| [newName](#newname) | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedrenamechildaction-properties-newname.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedRenameChildAction/properties/newName") |

## type



`type`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedrenamechildaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedRenameChildAction/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value            | Explanation |
| :--------------- | :---------- |
| `"RENAME_CHILD"` |             |

## childId



`childId`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedrenamechildaction-properties-childid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedRenameChildAction/properties/childId")

### childId Type

`string`

## newName



`newName`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedrenamechildaction-properties-newname.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedRenameChildAction/properties/newName")

### newName Type

`string`
