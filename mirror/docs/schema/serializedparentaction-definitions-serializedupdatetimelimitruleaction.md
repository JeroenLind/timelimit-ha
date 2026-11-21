# SerializedUpdateTimelimitRuleAction Schema

```txt
https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateTimelimitRuleAction
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                        |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedParentAction.schema.json\*](SerializedParentAction.schema.json "open original schema") |

## SerializedUpdateTimelimitRuleAction Type

`object` ([SerializedUpdateTimelimitRuleAction](serializedparentaction-definitions-serializedupdatetimelimitruleaction.md))

# SerializedUpdateTimelimitRuleAction Properties

| Property                | Type      | Required | Nullable       | Defined by                                                                                                                                                                                                                                   |
| :---------------------- | :-------- | :------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)           | `string`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatetimelimitruleaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateTimelimitRuleAction/properties/type")           |
| [ruleId](#ruleid)       | `string`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatetimelimitruleaction-properties-ruleid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateTimelimitRuleAction/properties/ruleId")       |
| [time](#time)           | `number`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatetimelimitruleaction-properties-time.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateTimelimitRuleAction/properties/time")           |
| [days](#days)           | `number`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatetimelimitruleaction-properties-days.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateTimelimitRuleAction/properties/days")           |
| [extraTime](#extratime) | `boolean` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatetimelimitruleaction-properties-extratime.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateTimelimitRuleAction/properties/extraTime") |
| [start](#start)         | `number`  | Optional | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatetimelimitruleaction-properties-start.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateTimelimitRuleAction/properties/start")         |
| [end](#end)             | `number`  | Optional | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatetimelimitruleaction-properties-end.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateTimelimitRuleAction/properties/end")             |
| [dur](#dur)             | `number`  | Optional | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatetimelimitruleaction-properties-dur.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateTimelimitRuleAction/properties/dur")             |
| [pause](#pause)         | `number`  | Optional | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatetimelimitruleaction-properties-pause.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateTimelimitRuleAction/properties/pause")         |
| [perDay](#perday)       | `boolean` | Optional | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatetimelimitruleaction-properties-perday.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateTimelimitRuleAction/properties/perDay")       |
| [e](#e)                 | `number`  | Optional | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatetimelimitruleaction-properties-e.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateTimelimitRuleAction/properties/e")                 |

## type



`type`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatetimelimitruleaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateTimelimitRuleAction/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                     | Explanation |
| :------------------------ | :---------- |
| `"UPDATE_TIMELIMIT_RULE"` |             |

## ruleId



`ruleId`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatetimelimitruleaction-properties-ruleid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateTimelimitRuleAction/properties/ruleId")

### ruleId Type

`string`

## time



`time`

* is required

* Type: `number`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatetimelimitruleaction-properties-time.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateTimelimitRuleAction/properties/time")

### time Type

`number`

## days



`days`

* is required

* Type: `number`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatetimelimitruleaction-properties-days.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateTimelimitRuleAction/properties/days")

### days Type

`number`

## extraTime



`extraTime`

* is required

* Type: `boolean`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatetimelimitruleaction-properties-extratime.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateTimelimitRuleAction/properties/extraTime")

### extraTime Type

`boolean`

## start



`start`

* is optional

* Type: `number`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatetimelimitruleaction-properties-start.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateTimelimitRuleAction/properties/start")

### start Type

`number`

## end



`end`

* is optional

* Type: `number`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatetimelimitruleaction-properties-end.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateTimelimitRuleAction/properties/end")

### end Type

`number`

## dur



`dur`

* is optional

* Type: `number`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatetimelimitruleaction-properties-dur.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateTimelimitRuleAction/properties/dur")

### dur Type

`number`

## pause



`pause`

* is optional

* Type: `number`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatetimelimitruleaction-properties-pause.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateTimelimitRuleAction/properties/pause")

### pause Type

`number`

## perDay



`perDay`

* is optional

* Type: `boolean`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatetimelimitruleaction-properties-perday.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateTimelimitRuleAction/properties/perDay")

### perDay Type

`boolean`

## e



`e`

* is optional

* Type: `number`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatetimelimitruleaction-properties-e.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateTimelimitRuleAction/properties/e")

### e Type

`number`
