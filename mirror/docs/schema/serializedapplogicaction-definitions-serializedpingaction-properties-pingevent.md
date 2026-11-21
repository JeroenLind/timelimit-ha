# PingEvent Schema

```txt
https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedPingAction/properties/event
```



| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                            |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :---------------------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [SerializedAppLogicAction.schema.json\*](SerializedAppLogicAction.schema.json "open original schema") |

## event Type

`string` ([PingEvent](serializedapplogicaction-definitions-serializedpingaction-properties-pingevent.md))

## event Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value     | Explanation |
| :-------- | :---------- |
| `"clear"` |             |
| `"ping"`  |             |
| `"pong"`  |             |
