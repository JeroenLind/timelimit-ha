# SerializedCreateTimelimtRuleAction Schema

```txt
https://timelimit.io/SerializedParentAction#/definitions/SerializedCreateTimelimtRuleAction
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                        |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedParentAction.schema.json\*](SerializedParentAction.schema.json "open original schema") |

## SerializedCreateTimelimtRuleAction Type

`object` ([SerializedCreateTimelimtRuleAction](serializedparentaction-definitions-serializedcreatetimelimtruleaction.md))

# SerializedCreateTimelimtRuleAction Properties

| Property      | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                       |
| :------------ | :------- | :------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type) | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedcreatetimelimtruleaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedCreateTimelimtRuleAction/properties/type") |
| [rule](#rule) | `object` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedtimelimitrule.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedCreateTimelimtRuleAction/properties/rule")                            |

## type



`type`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedcreatetimelimtruleaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedCreateTimelimtRuleAction/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                     | Explanation |
| :------------------------ | :---------- |
| `"CREATE_TIMELIMIT_RULE"` |             |

## rule



`rule`

* is required

* Type: `object` ([SerializedTimeLimitRule](serializedparentaction-definitions-serializedtimelimitrule.md))

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedtimelimitrule.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedCreateTimelimtRuleAction/properties/rule")

### rule Type

`object` ([SerializedTimeLimitRule](serializedparentaction-definitions-serializedtimelimitrule.md))
