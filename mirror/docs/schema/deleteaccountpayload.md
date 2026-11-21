# DeleteAccountPayload Schema

```txt
https://timelimit.io/DeleteAccountPayload
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                  |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------------ |
| Can be instantiated | Yes        | Unknown status | No           | Forbidden         | Forbidden             | none                | [DeleteAccountPayload.schema.json](DeleteAccountPayload.schema.json "open original schema") |

## DeleteAccountPayload Type

`object` ([DeleteAccountPayload](deleteaccountpayload.md))

# DeleteAccountPayload Properties

| Property                            | Type     | Required | Nullable       | Defined by                                                                                                                                         |
| :---------------------------------- | :------- | :------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| [deviceAuthToken](#deviceauthtoken) | `string` | Required | cannot be null | [DeleteAccountPayload](deleteaccountpayload-properties-deviceauthtoken.md "https://timelimit.io/DeleteAccountPayload#/properties/deviceAuthToken") |
| [mailAuthTokens](#mailauthtokens)   | `array`  | Required | cannot be null | [DeleteAccountPayload](deleteaccountpayload-properties-mailauthtokens.md "https://timelimit.io/DeleteAccountPayload#/properties/mailAuthTokens")   |

## deviceAuthToken



`deviceAuthToken`

* is required

* Type: `string`

* cannot be null

* defined in: [DeleteAccountPayload](deleteaccountpayload-properties-deviceauthtoken.md "https://timelimit.io/DeleteAccountPayload#/properties/deviceAuthToken")

### deviceAuthToken Type

`string`

## mailAuthTokens



`mailAuthTokens`

* is required

* Type: `string[]`

* cannot be null

* defined in: [DeleteAccountPayload](deleteaccountpayload-properties-mailauthtokens.md "https://timelimit.io/DeleteAccountPayload#/properties/mailAuthTokens")

### mailAuthTokens Type

`string[]`

# DeleteAccountPayload Definitions
