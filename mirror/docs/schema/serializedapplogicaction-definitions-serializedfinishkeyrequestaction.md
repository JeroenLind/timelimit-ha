# SerializedFinishKeyRequestAction Schema

```txt
https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedFinishKeyRequestAction
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                            |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :---------------------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedAppLogicAction.schema.json\*](SerializedAppLogicAction.schema.json "open original schema") |

## SerializedFinishKeyRequestAction Type

`object` ([SerializedFinishKeyRequestAction](serializedapplogicaction-definitions-serializedfinishkeyrequestaction.md))

# SerializedFinishKeyRequestAction Properties

| Property      | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                         |
| :------------ | :------- | :------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type) | `string` | Required | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedfinishkeyrequestaction-properties-type.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedFinishKeyRequestAction/properties/type") |
| [dsn](#dsn)   | `number` | Required | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedfinishkeyrequestaction-properties-dsn.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedFinishKeyRequestAction/properties/dsn")   |

## type



`type`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedfinishkeyrequestaction-properties-type.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedFinishKeyRequestAction/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                  | Explanation |
| :--------------------- | :---------- |
| `"FINISH_KEY_REQUEST"` |             |

## dsn



`dsn`

* is required

* Type: `number`

* cannot be null

* defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedfinishkeyrequestaction-properties-dsn.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedFinishKeyRequestAction/properties/dsn")

### dsn Type

`number`
