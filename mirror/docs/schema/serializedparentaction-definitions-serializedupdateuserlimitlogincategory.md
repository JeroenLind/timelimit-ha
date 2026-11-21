# SerializedUpdateUserLimitLoginCategory Schema

```txt
https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateUserLimitLoginCategory
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                        |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedParentAction.schema.json\*](SerializedParentAction.schema.json "open original schema") |

## SerializedUpdateUserLimitLoginCategory Type

`object` ([SerializedUpdateUserLimitLoginCategory](serializedparentaction-definitions-serializedupdateuserlimitlogincategory.md))

# SerializedUpdateUserLimitLoginCategory Properties

| Property                  | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                                           |
| :------------------------ | :------- | :------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)             | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdateuserlimitlogincategory-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateUserLimitLoginCategory/properties/type")             |
| [userId](#userid)         | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdateuserlimitlogincategory-properties-userid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateUserLimitLoginCategory/properties/userId")         |
| [categoryId](#categoryid) | `string` | Optional | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdateuserlimitlogincategory-properties-categoryid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateUserLimitLoginCategory/properties/categoryId") |

## type



`type`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdateuserlimitlogincategory-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateUserLimitLoginCategory/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                                | Explanation |
| :----------------------------------- | :---------- |
| `"UPDATE_USER_LIMIT_LOGIN_CATEGORY"` |             |

## userId



`userId`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdateuserlimitlogincategory-properties-userid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateUserLimitLoginCategory/properties/userId")

### userId Type

`string`

## categoryId



`categoryId`

* is optional

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdateuserlimitlogincategory-properties-categoryid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateUserLimitLoginCategory/properties/categoryId")

### categoryId Type

`string`
