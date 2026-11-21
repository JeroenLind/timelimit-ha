# SerializedPingAction Schema

```txt
https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedPingAction
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                            |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :---------------------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedAppLogicAction.schema.json\*](SerializedAppLogicAction.schema.json "open original schema") |

## SerializedPingAction Type

`object` ([SerializedPingAction](serializedapplogicaction-definitions-serializedpingaction.md))

# SerializedPingAction Properties

| Property              | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                         |
| :-------------------- | :------- | :------- | :------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)         | `string` | Required | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedpingaction-properties-type.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedPingAction/properties/type")         |
| [deviceId](#deviceid) | `string` | Required | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedpingaction-properties-deviceid.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedPingAction/properties/deviceId") |
| [event](#event)       | `string` | Required | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedpingaction-properties-pingevent.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedPingAction/properties/event")   |
| [token](#token)       | `string` | Required | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedpingaction-properties-token.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedPingAction/properties/token")       |

## type



`type`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedpingaction-properties-type.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedPingAction/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value    | Explanation |
| :------- | :---------- |
| `"PING"` |             |

## deviceId



`deviceId`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedpingaction-properties-deviceid.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedPingAction/properties/deviceId")

### deviceId Type

`string`

## event



`event`

* is required

* Type: `string` ([PingEvent](serializedapplogicaction-definitions-serializedpingaction-properties-pingevent.md))

* cannot be null

* defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedpingaction-properties-pingevent.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedPingAction/properties/event")

### event Type

`string` ([PingEvent](serializedapplogicaction-definitions-serializedpingaction-properties-pingevent.md))

### event Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value     | Explanation |
| :-------- | :---------- |
| `"clear"` |             |
| `"ping"`  |             |
| `"pong"`  |             |

## token



`token`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedpingaction-properties-token.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedPingAction/properties/token")

### token Type

`string`
