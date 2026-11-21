# AppRecommendation Schema

```txt
https://timelimit.io/ServerDataStatus#/definitions/SerializedInstalledApp/properties/recommendation
```



| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                            |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [ServerDataStatus.schema.json\*](ServerDataStatus.schema.json "open original schema") |

## recommendation Type

`string` ([AppRecommendation](serverdatastatus-definitions-serializedinstalledapp-properties-apprecommendation.md))

## recommendation Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value         | Explanation |
| :------------ | :---------- |
| `"blacklist"` |             |
| `"none"`      |             |
| `"whitelist"` |             |
