# IdentityTokenPayload Schema

```txt
https://timelimit.io/IdentityTokenPayload
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                  |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------------ |
| Can be instantiated | Yes        | Unknown status | No           | Forbidden         | Forbidden             | none                | [IdentityTokenPayload.schema.json](IdentityTokenPayload.schema.json "open original schema") |

## IdentityTokenPayload Type

`object` ([IdentityTokenPayload](identitytokenpayload.md))

# IdentityTokenPayload Properties

| Property              | Type     | Required | Nullable       | Defined by                                                                                                                           |
| :-------------------- | :------- | :------- | :------------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| [purpose](#purpose)   | `string` | Required | cannot be null | [IdentityTokenPayload](identitytokenpayload-properties-purpose.md "https://timelimit.io/IdentityTokenPayload#/properties/purpose")   |
| [familyId](#familyid) | `string` | Required | cannot be null | [IdentityTokenPayload](identitytokenpayload-properties-familyid.md "https://timelimit.io/IdentityTokenPayload#/properties/familyId") |
| [userId](#userid)     | `string` | Required | cannot be null | [IdentityTokenPayload](identitytokenpayload-properties-userid.md "https://timelimit.io/IdentityTokenPayload#/properties/userId")     |
| [mail](#mail)         | `string` | Required | cannot be null | [IdentityTokenPayload](identitytokenpayload-properties-mail.md "https://timelimit.io/IdentityTokenPayload#/properties/mail")         |
| [exp](#exp)           | `number` | Required | cannot be null | [IdentityTokenPayload](identitytokenpayload-properties-exp.md "https://timelimit.io/IdentityTokenPayload#/properties/exp")           |

## purpose



`purpose`

* is required

* Type: `string`

* cannot be null

* defined in: [IdentityTokenPayload](identitytokenpayload-properties-purpose.md "https://timelimit.io/IdentityTokenPayload#/properties/purpose")

### purpose Type

`string`

### purpose Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value        | Explanation |
| :----------- | :---------- |
| `"purchase"` |             |

## familyId



`familyId`

* is required

* Type: `string`

* cannot be null

* defined in: [IdentityTokenPayload](identitytokenpayload-properties-familyid.md "https://timelimit.io/IdentityTokenPayload#/properties/familyId")

### familyId Type

`string`

## userId



`userId`

* is required

* Type: `string`

* cannot be null

* defined in: [IdentityTokenPayload](identitytokenpayload-properties-userid.md "https://timelimit.io/IdentityTokenPayload#/properties/userId")

### userId Type

`string`

## mail



`mail`

* is required

* Type: `string`

* cannot be null

* defined in: [IdentityTokenPayload](identitytokenpayload-properties-mail.md "https://timelimit.io/IdentityTokenPayload#/properties/mail")

### mail Type

`string`

## exp



`exp`

* is required

* Type: `number`

* cannot be null

* defined in: [IdentityTokenPayload](identitytokenpayload-properties-exp.md "https://timelimit.io/IdentityTokenPayload#/properties/exp")

### exp Type

`number`

# IdentityTokenPayload Definitions
