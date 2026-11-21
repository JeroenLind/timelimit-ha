# SerializedUpdateCategoryTimeWarningsAction Schema

```txt
https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryTimeWarningsAction
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                        |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedParentAction.schema.json\*](SerializedParentAction.schema.json "open original schema") |

## SerializedUpdateCategoryTimeWarningsAction Type

`object` ([SerializedUpdateCategoryTimeWarningsAction](serializedparentaction-definitions-serializedupdatecategorytimewarningsaction.md))

# SerializedUpdateCategoryTimeWarningsAction Properties

| Property                  | Type      | Required | Nullable       | Defined by                                                                                                                                                                                                                                                   |
| :------------------------ | :-------- | :------- | :------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)             | `string`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorytimewarningsaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryTimeWarningsAction/properties/type")             |
| [categoryId](#categoryid) | `string`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorytimewarningsaction-properties-categoryid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryTimeWarningsAction/properties/categoryId") |
| [enable](#enable)         | `boolean` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorytimewarningsaction-properties-enable.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryTimeWarningsAction/properties/enable")         |
| [flags](#flags)           | `number`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorytimewarningsaction-properties-flags.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryTimeWarningsAction/properties/flags")           |
| [minutes](#minutes)       | `number`  | Optional | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorytimewarningsaction-properties-minutes.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryTimeWarningsAction/properties/minutes")       |

## type



`type`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorytimewarningsaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryTimeWarningsAction/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                             | Explanation |
| :-------------------------------- | :---------- |
| `"UPDATE_CATEGORY_TIME_WARNINGS"` |             |

## categoryId



`categoryId`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorytimewarningsaction-properties-categoryid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryTimeWarningsAction/properties/categoryId")

### categoryId Type

`string`

## enable



`enable`

* is required

* Type: `boolean`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorytimewarningsaction-properties-enable.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryTimeWarningsAction/properties/enable")

### enable Type

`boolean`

## flags



`flags`

* is required

* Type: `number`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorytimewarningsaction-properties-flags.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryTimeWarningsAction/properties/flags")

### flags Type

`number`

## minutes



`minutes`

* is optional

* Type: `number`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorytimewarningsaction-properties-minutes.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryTimeWarningsAction/properties/minutes")

### minutes Type

`number`
