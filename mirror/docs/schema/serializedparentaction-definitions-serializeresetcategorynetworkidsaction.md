# SerializeResetCategoryNetworkIdsAction Schema

```txt
https://timelimit.io/SerializedParentAction#/definitions/SerializeResetCategoryNetworkIdsAction
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                        |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedParentAction.schema.json\*](SerializedParentAction.schema.json "open original schema") |

## SerializeResetCategoryNetworkIdsAction Type

`object` ([SerializeResetCategoryNetworkIdsAction](serializedparentaction-definitions-serializeresetcategorynetworkidsaction.md))

# SerializeResetCategoryNetworkIdsAction Properties

| Property                  | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                                           |
| :------------------------ | :------- | :------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)             | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializeresetcategorynetworkidsaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializeResetCategoryNetworkIdsAction/properties/type")             |
| [categoryId](#categoryid) | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializeresetcategorynetworkidsaction-properties-categoryid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializeResetCategoryNetworkIdsAction/properties/categoryId") |

## type



`type`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializeresetcategorynetworkidsaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializeResetCategoryNetworkIdsAction/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                          | Explanation |
| :----------------------------- | :---------- |
| `"RESET_CATEGORY_NETWORK_IDS"` |             |

## categoryId



`categoryId`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializeresetcategorynetworkidsaction-properties-categoryid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializeResetCategoryNetworkIdsAction/properties/categoryId")

### categoryId Type

`string`
