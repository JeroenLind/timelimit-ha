# SerializedUpdateCategoryBatteryLimitAction Schema

```txt
https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryBatteryLimitAction
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                        |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedParentAction.schema.json\*](SerializedParentAction.schema.json "open original schema") |

## SerializedUpdateCategoryBatteryLimitAction Type

`object` ([SerializedUpdateCategoryBatteryLimitAction](serializedparentaction-definitions-serializedupdatecategorybatterylimitaction.md))

# SerializedUpdateCategoryBatteryLimitAction Properties

| Property                    | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                                                     |
| :-------------------------- | :------- | :------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)               | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorybatterylimitaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryBatteryLimitAction/properties/type")               |
| [categoryId](#categoryid)   | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorybatterylimitaction-properties-categoryid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryBatteryLimitAction/properties/categoryId")   |
| [chargeLimit](#chargelimit) | `number` | Optional | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorybatterylimitaction-properties-chargelimit.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryBatteryLimitAction/properties/chargeLimit") |
| [mobileLimit](#mobilelimit) | `number` | Optional | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorybatterylimitaction-properties-mobilelimit.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryBatteryLimitAction/properties/mobileLimit") |

## type



`type`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorybatterylimitaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryBatteryLimitAction/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                             | Explanation |
| :-------------------------------- | :---------- |
| `"UPDATE_CATEGORY_BATTERY_LIMIT"` |             |

## categoryId



`categoryId`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorybatterylimitaction-properties-categoryid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryBatteryLimitAction/properties/categoryId")

### categoryId Type

`string`

## chargeLimit



`chargeLimit`

* is optional

* Type: `number`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorybatterylimitaction-properties-chargelimit.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryBatteryLimitAction/properties/chargeLimit")

### chargeLimit Type

`number`

## mobileLimit



`mobileLimit`

* is optional

* Type: `number`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorybatterylimitaction-properties-mobilelimit.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryBatteryLimitAction/properties/mobileLimit")

### mobileLimit Type

`number`
