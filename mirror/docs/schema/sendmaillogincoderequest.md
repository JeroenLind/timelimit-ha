# SendMailLoginCodeRequest Schema

```txt
https://timelimit.io/SendMailLoginCodeRequest
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                          |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :-------------------------------------------------------------------------------------------------- |
| Can be instantiated | Yes        | Unknown status | No           | Forbidden         | Forbidden             | none                | [SendMailLoginCodeRequest.schema.json](SendMailLoginCodeRequest.schema.json "open original schema") |

## SendMailLoginCodeRequest Type

`object` ([SendMailLoginCodeRequest](sendmaillogincoderequest.md))

# SendMailLoginCodeRequest Properties

| Property                            | Type     | Required | Nullable       | Defined by                                                                                                                                                     |
| :---------------------------------- | :------- | :------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [mail](#mail)                       | `string` | Required | cannot be null | [SendMailLoginCodeRequest](sendmaillogincoderequest-properties-mail.md "https://timelimit.io/SendMailLoginCodeRequest#/properties/mail")                       |
| [locale](#locale)                   | `string` | Required | cannot be null | [SendMailLoginCodeRequest](sendmaillogincoderequest-properties-locale.md "https://timelimit.io/SendMailLoginCodeRequest#/properties/locale")                   |
| [deviceAuthToken](#deviceauthtoken) | `string` | Optional | cannot be null | [SendMailLoginCodeRequest](sendmaillogincoderequest-properties-deviceauthtoken.md "https://timelimit.io/SendMailLoginCodeRequest#/properties/deviceAuthToken") |

## mail



`mail`

* is required

* Type: `string`

* cannot be null

* defined in: [SendMailLoginCodeRequest](sendmaillogincoderequest-properties-mail.md "https://timelimit.io/SendMailLoginCodeRequest#/properties/mail")

### mail Type

`string`

## locale



`locale`

* is required

* Type: `string`

* cannot be null

* defined in: [SendMailLoginCodeRequest](sendmaillogincoderequest-properties-locale.md "https://timelimit.io/SendMailLoginCodeRequest#/properties/locale")

### locale Type

`string`

## deviceAuthToken



`deviceAuthToken`

* is optional

* Type: `string`

* cannot be null

* defined in: [SendMailLoginCodeRequest](sendmaillogincoderequest-properties-deviceauthtoken.md "https://timelimit.io/SendMailLoginCodeRequest#/properties/deviceAuthToken")

### deviceAuthToken Type

`string`

# SendMailLoginCodeRequest Definitions
