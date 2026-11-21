# AppRecommendation Schema

```txt
https://timelimit.io/SerializedAppLogicAction#/definitions/AppRecommendation
```



| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                            |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :---------------------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [SerializedAppLogicAction.schema.json\*](SerializedAppLogicAction.schema.json "open original schema") |

## AppRecommendation Type

`string` ([AppRecommendation](serializedapplogicaction-definitions-apprecommendation.md))

## AppRecommendation Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value         | Explanation |
| :------------ | :---------- |
| `"blacklist"` |             |
| `"none"`      |             |
| `"whitelist"` |             |
