# SerializedAddCategoryNetworkIdAction Schema

```txt
https://timelimit.io/SerializedParentAction#/definitions/SerializedAddCategoryNetworkIdAction
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                        |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedParentAction.schema.json\*](SerializedParentAction.schema.json "open original schema") |

## SerializedAddCategoryNetworkIdAction Type

`object` ([SerializedAddCategoryNetworkIdAction](serializedparentaction-definitions-serializedaddcategorynetworkidaction.md))

# SerializedAddCategoryNetworkIdAction Properties

| Property                            | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                                                 |
| :---------------------------------- | :------- | :------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)                       | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedaddcategorynetworkidaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedAddCategoryNetworkIdAction/properties/type")                       |
| [categoryId](#categoryid)           | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedaddcategorynetworkidaction-properties-categoryid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedAddCategoryNetworkIdAction/properties/categoryId")           |
| [itemId](#itemid)                   | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedaddcategorynetworkidaction-properties-itemid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedAddCategoryNetworkIdAction/properties/itemId")                   |
| [hashedNetworkId](#hashednetworkid) | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedaddcategorynetworkidaction-properties-hashednetworkid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedAddCategoryNetworkIdAction/properties/hashedNetworkId") |

## type



`type`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedaddcategorynetworkidaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedAddCategoryNetworkIdAction/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                       | Explanation |
| :-------------------------- | :---------- |
| `"ADD_CATEGORY_NETWORK_ID"` |             |

## categoryId



`categoryId`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedaddcategorynetworkidaction-properties-categoryid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedAddCategoryNetworkIdAction/properties/categoryId")

### categoryId Type

`string`

## itemId



`itemId`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedaddcategorynetworkidaction-properties-itemid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedAddCategoryNetworkIdAction/properties/itemId")

### itemId Type

`string`

## hashedNetworkId



`hashedNetworkId`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedaddcategorynetworkidaction-properties-hashednetworkid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedAddCategoryNetworkIdAction/properties/hashedNetworkId")

### hashedNetworkId Type

`string`
