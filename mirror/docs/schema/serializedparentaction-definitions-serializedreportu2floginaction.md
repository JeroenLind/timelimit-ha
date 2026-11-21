# SerializedReportU2fLoginAction Schema

```txt
https://timelimit.io/SerializedParentAction#/definitions/SerializedReportU2fLoginAction
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                        |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedParentAction.schema.json\*](SerializedParentAction.schema.json "open original schema") |

## SerializedReportU2fLoginAction Type

`object` ([SerializedReportU2fLoginAction](serializedparentaction-definitions-serializedreportu2floginaction.md))

# SerializedReportU2fLoginAction Properties

| Property      | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                               |
| :------------ | :------- | :------- | :------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type) | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedreportu2floginaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedReportU2fLoginAction/properties/type") |

## type



`type`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedParentAction](serializedparentaction-definitions-serializedreportu2floginaction-properties-type.md "https://timelimit.io/SerializedParentAction#/definitions/SerializedReportU2fLoginAction/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                | Explanation |
| :------------------- | :---------- |
| `"REPORT_U2F_LOGIN"` |             |
