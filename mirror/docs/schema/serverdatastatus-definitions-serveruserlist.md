# ServerUserList Schema

```txt
https://timelimit.io/ServerDataStatus#/definitions/ServerUserList
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                            |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [ServerDataStatus.schema.json\*](ServerDataStatus.schema.json "open original schema") |

## ServerUserList Type

`object` ([ServerUserList](serverdatastatus-definitions-serveruserlist.md))

# ServerUserList Properties

| Property            | Type     | Required | Nullable       | Defined by                                                                                                                                                                   |
| :------------------ | :------- | :------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [version](#version) | `string` | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serveruserlist-properties-version.md "https://timelimit.io/ServerDataStatus#/definitions/ServerUserList/properties/version") |
| [data](#data)       | `array`  | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serveruserlist-properties-data.md "https://timelimit.io/ServerDataStatus#/definitions/ServerUserList/properties/data")       |

## version



`version`

* is required

* Type: `string`

* cannot be null

* defined in: [ServerDataStatus](serverdatastatus-definitions-serveruserlist-properties-version.md "https://timelimit.io/ServerDataStatus#/definitions/ServerUserList/properties/version")

### version Type

`string`

## data



`data`

* is required

* Type: `object[]` ([ServerUserEntry](serverdatastatus-definitions-serveruserentry.md))

* cannot be null

* defined in: [ServerDataStatus](serverdatastatus-definitions-serveruserlist-properties-data.md "https://timelimit.io/ServerDataStatus#/definitions/ServerUserList/properties/data")

### data Type

`object[]` ([ServerUserEntry](serverdatastatus-definitions-serveruserentry.md))
