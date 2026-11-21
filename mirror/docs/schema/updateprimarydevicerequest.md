# UpdatePrimaryDeviceRequest Schema

```txt
https://timelimit.io/UpdatePrimaryDeviceRequest
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                              |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------------------------ |
| Can be instantiated | Yes        | Unknown status | No           | Forbidden         | Forbidden             | none                | [UpdatePrimaryDeviceRequest.schema.json](UpdatePrimaryDeviceRequest.schema.json "open original schema") |

## UpdatePrimaryDeviceRequest Type

`object` ([UpdatePrimaryDeviceRequest](updateprimarydevicerequest.md))

# UpdatePrimaryDeviceRequest Properties

| Property                        | Type     | Required | Nullable       | Defined by                                                                                                                                                       |
| :------------------------------ | :------- | :------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [action](#action)               | `string` | Required | cannot be null | [UpdatePrimaryDeviceRequest](updateprimarydevicerequest-properties-action.md "https://timelimit.io/UpdatePrimaryDeviceRequest#/properties/action")               |
| [currentUserId](#currentuserid) | `string` | Required | cannot be null | [UpdatePrimaryDeviceRequest](updateprimarydevicerequest-properties-currentuserid.md "https://timelimit.io/UpdatePrimaryDeviceRequest#/properties/currentUserId") |
| [authToken](#authtoken)         | `string` | Required | cannot be null | [UpdatePrimaryDeviceRequest](updateprimarydevicerequest-properties-authtoken.md "https://timelimit.io/UpdatePrimaryDeviceRequest#/properties/authToken")         |

## action



`action`

* is required

* Type: `string`

* cannot be null

* defined in: [UpdatePrimaryDeviceRequest](updateprimarydevicerequest-properties-action.md "https://timelimit.io/UpdatePrimaryDeviceRequest#/properties/action")

### action Type

`string`

### action Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                 | Explanation |
| :-------------------- | :---------- |
| `"set this device"`   |             |
| `"unset this device"` |             |

## currentUserId



`currentUserId`

* is required

* Type: `string`

* cannot be null

* defined in: [UpdatePrimaryDeviceRequest](updateprimarydevicerequest-properties-currentuserid.md "https://timelimit.io/UpdatePrimaryDeviceRequest#/properties/currentUserId")

### currentUserId Type

`string`

## authToken



`authToken`

* is required

* Type: `string`

* cannot be null

* defined in: [UpdatePrimaryDeviceRequest](updateprimarydevicerequest-properties-authtoken.md "https://timelimit.io/UpdatePrimaryDeviceRequest#/properties/authToken")

### authToken Type

`string`

# UpdatePrimaryDeviceRequest Definitions
