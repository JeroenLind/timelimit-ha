# ServerUpdatedCategoryTasks Schema

```txt
https://timelimit.io/ServerDataStatus#/definitions/ServerUpdatedCategoryTasks
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                            |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [ServerDataStatus.schema.json\*](ServerDataStatus.schema.json "open original schema") |

## ServerUpdatedCategoryTasks Type

`object` ([ServerUpdatedCategoryTasks](serverdatastatus-definitions-serverupdatedcategorytasks.md))

# ServerUpdatedCategoryTasks Properties

| Property                  | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                 |
| :------------------------ | :------- | :------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [categoryId](#categoryid) | `string` | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverupdatedcategorytasks-properties-categoryid.md "https://timelimit.io/ServerDataStatus#/definitions/ServerUpdatedCategoryTasks/properties/categoryId") |
| [version](#version)       | `string` | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverupdatedcategorytasks-properties-version.md "https://timelimit.io/ServerDataStatus#/definitions/ServerUpdatedCategoryTasks/properties/version")       |
| [tasks](#tasks)           | `array`  | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverupdatedcategorytasks-properties-tasks.md "https://timelimit.io/ServerDataStatus#/definitions/ServerUpdatedCategoryTasks/properties/tasks")           |

## categoryId



`categoryId`

* is required

* Type: `string`

* cannot be null

* defined in: [ServerDataStatus](serverdatastatus-definitions-serverupdatedcategorytasks-properties-categoryid.md "https://timelimit.io/ServerDataStatus#/definitions/ServerUpdatedCategoryTasks/properties/categoryId")

### categoryId Type

`string`

## version



`version`

* is required

* Type: `string`

* cannot be null

* defined in: [ServerDataStatus](serverdatastatus-definitions-serverupdatedcategorytasks-properties-version.md "https://timelimit.io/ServerDataStatus#/definitions/ServerUpdatedCategoryTasks/properties/version")

### version Type

`string`

## tasks



`tasks`

* is required

* Type: `object[]` ([ServerUpdatedCategoryTask](serverdatastatus-definitions-serverupdatedcategorytask.md))

* cannot be null

* defined in: [ServerDataStatus](serverdatastatus-definitions-serverupdatedcategorytasks-properties-tasks.md "https://timelimit.io/ServerDataStatus#/definitions/ServerUpdatedCategoryTasks/properties/tasks")

### tasks Type

`object[]` ([ServerUpdatedCategoryTask](serverdatastatus-definitions-serverupdatedcategorytask.md))
