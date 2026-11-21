# SerializedUpdateCategoryBlockAllNotificationsAction Schema

```txt
https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryBlockAllNotificationsAction
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                        |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedParentAction.schema.json\*](SerializedParentAction.schema.json "open original schema") |

## SerializedUpdateCategoryBlockAllNotificationsAction Type

`object` ([SerializedUpdateCategoryBlockAllNotificationsAction](serializedparentaction-definitions-serializedupdatecategoryblockallnotificationsaction.md))

# SerializedUpdateCategoryBlockAllNotificationsAction Properties

| Property                  | Type      | Required | Nullable       | Defined by                                                                                                                                                                                                                                                                     |
| :------------------------ | :-------- | :------- | :------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)             | `string`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategoryblockallnotificationsaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryBlockAllNotificationsAction/properties/type")             |
| [categoryId](#categoryid) | `string`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategoryblockallnotificationsaction-properties-categoryid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryBlockAllNotificationsAction/properties/categoryId") |
| [blocked](#blocked)       | `boolean` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategoryblockallnotificationsaction-properties-blocked.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryBlockAllNotificationsAction/properties/blocked")       |
| [blockDelay](#blockdelay) | `number`  | Optional | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategoryblockallnotificationsaction-properties-blockdelay.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryBlockAllNotificationsAction/properties/blockDelay") |

## type



`type`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategoryblockallnotificationsaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryBlockAllNotificationsAction/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                                       | Explanation |
| :------------------------------------------ | :---------- |
| `"UPDATE_CATEGORY_BLOCK_ALL_NOTIFICATIONS"` |             |

## categoryId



`categoryId`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategoryblockallnotificationsaction-properties-categoryid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryBlockAllNotificationsAction/properties/categoryId")

### categoryId Type

`string`

## blocked



`blocked`

* is required

* Type: `boolean`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategoryblockallnotificationsaction-properties-blocked.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryBlockAllNotificationsAction/properties/blocked")

### blocked Type

`boolean`

## blockDelay



`blockDelay`

* is optional

* Type: `number`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategoryblockallnotificationsaction-properties-blockdelay.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryBlockAllNotificationsAction/properties/blockDelay")

### blockDelay Type

`number`
