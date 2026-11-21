# ProtectionLevel Schema

```txt
https://timelimit.io/ServerDataStatus#/definitions/ServerDeviceData/properties/hProtectionLevel
```



| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                            |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [ServerDataStatus.schema.json\*](ServerDataStatus.schema.json "open original schema") |

## hProtectionLevel Type

`string` ([ProtectionLevel](serverdatastatus-definitions-serverdevicedata-properties-protectionlevel-1.md))

## hProtectionLevel Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                     | Explanation |
| :------------------------ | :---------- |
| `"device owner"`          |             |
| `"none"`                  |             |
| `"password device admin"` |             |
| `"simple device admin"`   |             |
