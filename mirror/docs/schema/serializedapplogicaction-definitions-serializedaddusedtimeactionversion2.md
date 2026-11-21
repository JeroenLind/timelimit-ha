# SerializedAddUsedTimeActionVersion2 Schema

```txt
https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedAddUsedTimeActionVersion2
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                            |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :---------------------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedAppLogicAction.schema.json\*](SerializedAppLogicAction.schema.json "open original schema") |

## SerializedAddUsedTimeActionVersion2 Type

`object` ([SerializedAddUsedTimeActionVersion2](serializedapplogicaction-definitions-serializedaddusedtimeactionversion2.md))

# SerializedAddUsedTimeActionVersion2 Properties

| Property      | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                               |
| :------------ | :------- | :------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type) | `string` | Required | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedaddusedtimeactionversion2-properties-type.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedAddUsedTimeActionVersion2/properties/type") |
| [d](#d)       | `number` | Required | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedaddusedtimeactionversion2-properties-d.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedAddUsedTimeActionVersion2/properties/d")       |
| [i](#i)       | `array`  | Required | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedaddusedtimeactionversion2-properties-i.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedAddUsedTimeActionVersion2/properties/i")       |
| [t](#t)       | `number` | Optional | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedaddusedtimeactionversion2-properties-t.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedAddUsedTimeActionVersion2/properties/t")       |

## type



`type`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedaddusedtimeactionversion2-properties-type.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedAddUsedTimeActionVersion2/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                | Explanation |
| :------------------- | :---------- |
| `"ADD_USED_TIME_V2"` |             |

## d



`d`

* is required

* Type: `number`

* cannot be null

* defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedaddusedtimeactionversion2-properties-d.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedAddUsedTimeActionVersion2/properties/d")

### d Type

`number`

## i



`i`

* is required

* Type: `object[]` ([Details](serializedapplogicaction-definitions-serializedaddusedtimeactionversion2-properties-i-items.md))

* cannot be null

* defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedaddusedtimeactionversion2-properties-i.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedAddUsedTimeActionVersion2/properties/i")

### i Type

`object[]` ([Details](serializedapplogicaction-definitions-serializedaddusedtimeactionversion2-properties-i-items.md))

## t



`t`

* is optional

* Type: `number`

* cannot be null

* defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedaddusedtimeactionversion2-properties-t.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedAddUsedTimeActionVersion2/properties/t")

### t Type

`number`
