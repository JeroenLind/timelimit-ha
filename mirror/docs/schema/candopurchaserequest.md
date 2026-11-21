# CanDoPurchaseRequest Schema

```txt
https://timelimit.io/CanDoPurchaseRequest
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                  |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------------ |
| Can be instantiated | Yes        | Unknown status | No           | Forbidden         | Forbidden             | none                | [CanDoPurchaseRequest.schema.json](CanDoPurchaseRequest.schema.json "open original schema") |

## CanDoPurchaseRequest Type

`object` ([CanDoPurchaseRequest](candopurchaserequest.md))

# CanDoPurchaseRequest Properties

| Property                            | Type     | Required | Nullable       | Defined by                                                                                                                                         |
| :---------------------------------- | :------- | :------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)                       | `string` | Optional | cannot be null | [CanDoPurchaseRequest](candopurchaserequest-properties-type.md "https://timelimit.io/CanDoPurchaseRequest#/properties/type")                       |
| [deviceAuthToken](#deviceauthtoken) | `string` | Required | cannot be null | [CanDoPurchaseRequest](candopurchaserequest-properties-deviceauthtoken.md "https://timelimit.io/CanDoPurchaseRequest#/properties/deviceAuthToken") |

## type



`type`

* is optional

* Type: `string`

* cannot be null

* defined in: [CanDoPurchaseRequest](candopurchaserequest-properties-type.md "https://timelimit.io/CanDoPurchaseRequest#/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value          | Explanation |
| :------------- | :---------- |
| `"any"`        |             |
| `"googleplay"` |             |

## deviceAuthToken



`deviceAuthToken`

* is required

* Type: `string`

* cannot be null

* defined in: [CanDoPurchaseRequest](candopurchaserequest-properties-deviceauthtoken.md "https://timelimit.io/CanDoPurchaseRequest#/properties/deviceAuthToken")

### deviceAuthToken Type

`string`

# CanDoPurchaseRequest Definitions
