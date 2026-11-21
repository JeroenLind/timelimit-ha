# SerializedChildSignInAction Schema

```txt
https://timelimit.io/SerializedChildAction#/definitions/SerializedChildSignInAction
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                      |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :---------------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedChildAction.schema.json\*](SerializedChildAction.schema.json "open original schema") |

## SerializedChildSignInAction Type

`object` ([SerializedChildSignInAction](serializedchildaction-definitions-serializedchildsigninaction.md))

# SerializedChildSignInAction Properties

| Property      | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                      |
| :------------ | :------- | :------- | :------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type) | `string` | Required | cannot be null | [SerializedChildAction](serializedchildaction-definitions-serializedchildsigninaction-properties-type.md "https://timelimit.io/SerializedChildAction#/definitions/SerializedChildSignInAction/properties/type") |

## type



`type`

* is required

* Type: `string`

* cannot be null

* defined in: [SerializedChildAction](serializedchildaction-definitions-serializedchildsigninaction-properties-type.md "https://timelimit.io/SerializedChildAction#/definitions/SerializedChildSignInAction/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value             | Explanation |
| :---------------- | :---------- |
| `"CHILD_SIGN_IN"` |             |
