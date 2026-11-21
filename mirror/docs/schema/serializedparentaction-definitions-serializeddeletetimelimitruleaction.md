# SerializedDeleteTimeLimitRuleAction Schema

```txt
https://timelimit.io/SerializedParentAction#/definitions/SerializedDeleteTimeLimitRuleAction
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                        |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedParentAction.schema.json\*](SerializedParentAction.schema.json "open original schema") |

## SerializedDeleteTimeLimitRuleAction Type

`object` ([SerializedDeleteTimeLimitRuleAction](serializedparentaction-definitions-serializeddeletetimelimitruleaction.md))

# SerializedDeleteTimeLimitRuleAction Properties

| Property          | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                             |
| :---------------- | :------- | :------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)     | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializeddeletetimelimitruleaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedDeleteTimeLimitRuleAction/properties/type")     |
| [ruleId](#ruleid) | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializeddeletetimelimitruleaction-properties-ruleid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedDeleteTimeLimitRuleAction/properties/ruleId") |

## type



`type`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializeddeletetimelimitruleaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedDeleteTimeLimitRuleAction/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                     | Explanation |
| :------------------------ | :---------- |
| `"DELETE_TIMELIMIT_RULE"` |             |

## ruleId



`ruleId`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializeddeletetimelimitruleaction-properties-ruleid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedDeleteTimeLimitRuleAction/properties/ruleId")

### ruleId Type

`string`
