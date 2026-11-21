# SerializedSetKeepSignedInAction Schema

```txt
https://timelimit.io/SerializedParentAction#/definitions/SerializedSetKeepSignedInAction
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                        |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedParentAction.schema.json\*](SerializedParentAction.schema.json "open original schema") |

## SerializedSetKeepSignedInAction Type

`object` ([SerializedSetKeepSignedInAction](serializedparentaction-definitions-serializedsetkeepsignedinaction.md))

# SerializedSetKeepSignedInAction Properties

| Property                      | Type      | Required | Nullable       | Defined by                                                                                                                                                                                                                                 |
| :---------------------------- | :-------- | :------- | :------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)                 | `string`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetkeepsignedinaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetKeepSignedInAction/properties/type")                 |
| [deviceId](#deviceid)         | `string`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetkeepsignedinaction-properties-deviceid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetKeepSignedInAction/properties/deviceId")         |
| [keepSignedIn](#keepsignedin) | `boolean` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetkeepsignedinaction-properties-keepsignedin.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetKeepSignedInAction/properties/keepSignedIn") |

## type



`type`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetkeepsignedinaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetKeepSignedInAction/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                  | Explanation |
| :--------------------- | :---------- |
| `"SET_KEEP_SIGNED_IN"` |             |

## deviceId



`deviceId`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetkeepsignedinaction-properties-deviceid.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetKeepSignedInAction/properties/deviceId")

### deviceId Type

`string`

## keepSignedIn



`keepSignedIn`

* is required

* Type: `boolean`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetkeepsignedinaction-properties-keepsignedin.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedSetKeepSignedInAction/properties/keepSignedIn")

### keepSignedIn Type

`boolean`
