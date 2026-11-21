# SignInByMailCodeRequest Schema

```txt
https://timelimit.io/SignInByMailCodeRequest
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                        |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------------------ |
| Can be instantiated | Yes        | Unknown status | No           | Forbidden         | Forbidden             | none                | [SignInByMailCodeRequest.schema.json](SignInByMailCodeRequest.schema.json "open original schema") |

## SignInByMailCodeRequest Type

`object` ([SignInByMailCodeRequest](signinbymailcoderequest.md))

# SignInByMailCodeRequest Properties

| Property                          | Type     | Required | Nullable       | Defined by                                                                                                                                                |
| :-------------------------------- | :------- | :------- | :------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [mailLoginToken](#maillogintoken) | `string` | Required | cannot be null | [SignInByMailCodeRequest](signinbymailcoderequest-properties-maillogintoken.md "https://timelimit.io/SignInByMailCodeRequest#/properties/mailLoginToken") |
| [receivedCode](#receivedcode)     | `string` | Required | cannot be null | [SignInByMailCodeRequest](signinbymailcoderequest-properties-receivedcode.md "https://timelimit.io/SignInByMailCodeRequest#/properties/receivedCode")     |

## mailLoginToken



`mailLoginToken`

* is required

* Type: `string`

* cannot be null

* defined in: [SignInByMailCodeRequest](signinbymailcoderequest-properties-maillogintoken.md "https://timelimit.io/SignInByMailCodeRequest#/properties/mailLoginToken")

### mailLoginToken Type

`string`

## receivedCode



`receivedCode`

* is required

* Type: `string`

* cannot be null

* defined in: [SignInByMailCodeRequest](signinbymailcoderequest-properties-receivedcode.md "https://timelimit.io/SignInByMailCodeRequest#/properties/receivedCode")

### receivedCode Type

`string`

# SignInByMailCodeRequest Definitions
