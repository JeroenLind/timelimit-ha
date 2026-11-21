# ServerUpdatedTimeLimitRules Schema

```txt
https://timelimit.io/ServerDataStatus#/definitions/ServerUpdatedTimeLimitRules
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                            |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [ServerDataStatus.schema.json\*](ServerDataStatus.schema.json "open original schema") |

## ServerUpdatedTimeLimitRules Type

`object` ([ServerUpdatedTimeLimitRules](serverdatastatus-definitions-serverupdatedtimelimitrules.md))

# ServerUpdatedTimeLimitRules Properties

| Property                  | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                   |
| :------------------------ | :------- | :------- | :------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [categoryId](#categoryid) | `string` | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverupdatedtimelimitrules-properties-categoryid.md "https://timelimit.io/ServerDataStatus#/definitions/ServerUpdatedTimeLimitRules/properties/categoryId") |
| [version](#version)       | `string` | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverupdatedtimelimitrules-properties-version.md "https://timelimit.io/ServerDataStatus#/definitions/ServerUpdatedTimeLimitRules/properties/version")       |
| [rules](#rules)           | `array`  | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverupdatedtimelimitrules-properties-rules.md "https://timelimit.io/ServerDataStatus#/definitions/ServerUpdatedTimeLimitRules/properties/rules")           |

## categoryId



`categoryId`

* is required

* Type: `string`

* cannot be null

* defined in: [ServerDataStatus](serverdatastatus-definitions-serverupdatedtimelimitrules-properties-categoryid.md "https://timelimit.io/ServerDataStatus#/definitions/ServerUpdatedTimeLimitRules/properties/categoryId")

### categoryId Type

`string`

## version



`version`

* is required

* Type: `string`

* cannot be null

* defined in: [ServerDataStatus](serverdatastatus-definitions-serverupdatedtimelimitrules-properties-version.md "https://timelimit.io/ServerDataStatus#/definitions/ServerUpdatedTimeLimitRules/properties/version")

### version Type

`string`

## rules



`rules`

* is required

* Type: `object[]` ([ServerTimeLimitRule](serverdatastatus-definitions-servertimelimitrule.md))

* cannot be null

* defined in: [ServerDataStatus](serverdatastatus-definitions-serverupdatedtimelimitrules-properties-rules.md "https://timelimit.io/ServerDataStatus#/definitions/ServerUpdatedTimeLimitRules/properties/rules")

### rules Type

`object[]` ([ServerTimeLimitRule](serverdatastatus-definitions-servertimelimitrule.md))
