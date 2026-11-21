# ServerUpdatedCategoryAssignedApps Schema

```txt
https://timelimit.io/ServerDataStatus#/definitions/ServerUpdatedCategoryAssignedApps
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                            |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [ServerDataStatus.schema.json\*](ServerDataStatus.schema.json "open original schema") |

## ServerUpdatedCategoryAssignedApps Type

`object` ([ServerUpdatedCategoryAssignedApps](serverdatastatus-definitions-serverupdatedcategoryassignedapps.md))

# ServerUpdatedCategoryAssignedApps Properties

| Property                  | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                               |
| :------------------------ | :------- | :------- | :------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [categoryId](#categoryid) | `string` | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverupdatedcategoryassignedapps-properties-categoryid.md "https://timelimit.io/ServerDataStatus#/definitions/ServerUpdatedCategoryAssignedApps/properties/categoryId") |
| [apps](#apps)             | `array`  | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverupdatedcategoryassignedapps-properties-apps.md "https://timelimit.io/ServerDataStatus#/definitions/ServerUpdatedCategoryAssignedApps/properties/apps")             |
| [version](#version)       | `string` | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverupdatedcategoryassignedapps-properties-version.md "https://timelimit.io/ServerDataStatus#/definitions/ServerUpdatedCategoryAssignedApps/properties/version")       |

## categoryId



`categoryId`

* is required

* Type: `string`

* cannot be null

* defined in: [ServerDataStatus](serverdatastatus-definitions-serverupdatedcategoryassignedapps-properties-categoryid.md "https://timelimit.io/ServerDataStatus#/definitions/ServerUpdatedCategoryAssignedApps/properties/categoryId")

### categoryId Type

`string`

## apps



`apps`

* is required

* Type: `string[]`

* cannot be null

* defined in: [ServerDataStatus](serverdatastatus-definitions-serverupdatedcategoryassignedapps-properties-apps.md "https://timelimit.io/ServerDataStatus#/definitions/ServerUpdatedCategoryAssignedApps/properties/apps")

### apps Type

`string[]`

## version



`version`

* is required

* Type: `string`

* cannot be null

* defined in: [ServerDataStatus](serverdatastatus-definitions-serverupdatedcategoryassignedapps-properties-version.md "https://timelimit.io/ServerDataStatus#/definitions/ServerUpdatedCategoryAssignedApps/properties/version")

### version Type

`string`
