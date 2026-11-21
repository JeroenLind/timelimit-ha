# ServerSessionDurationItem Schema

```txt
https://timelimit.io/ServerDataStatus#/definitions/ServerSessionDurationItem
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                            |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [ServerDataStatus.schema.json\*](ServerDataStatus.schema.json "open original schema") |

## ServerSessionDurationItem Type

`object` ([ServerSessionDurationItem](serverdatastatus-definitions-serversessiondurationitem.md))

# ServerSessionDurationItem Properties

| Property    | Type     | Required | Nullable       | Defined by                                                                                                                                                                                 |
| :---------- | :------- | :------- | :------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [md](#md)   | `number` | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serversessiondurationitem-properties-md.md "https://timelimit.io/ServerDataStatus#/definitions/ServerSessionDurationItem/properties/md")   |
| [spd](#spd) | `number` | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serversessiondurationitem-properties-spd.md "https://timelimit.io/ServerDataStatus#/definitions/ServerSessionDurationItem/properties/spd") |
| [sm](#sm)   | `number` | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serversessiondurationitem-properties-sm.md "https://timelimit.io/ServerDataStatus#/definitions/ServerSessionDurationItem/properties/sm")   |
| [em](#em)   | `number` | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serversessiondurationitem-properties-em.md "https://timelimit.io/ServerDataStatus#/definitions/ServerSessionDurationItem/properties/em")   |
| [l](#l)     | `number` | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serversessiondurationitem-properties-l.md "https://timelimit.io/ServerDataStatus#/definitions/ServerSessionDurationItem/properties/l")     |
| [d](#d)     | `number` | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serversessiondurationitem-properties-d.md "https://timelimit.io/ServerDataStatus#/definitions/ServerSessionDurationItem/properties/d")     |

## md

the maximum duration of a session (maxSessionDuration)

`md`

* is required

* Type: `number`

* cannot be null

* defined in: [ServerDataStatus](serverdatastatus-definitions-serversessiondurationitem-properties-md.md "https://timelimit.io/ServerDataStatus#/definitions/ServerSessionDurationItem/properties/md")

### md Type

`number`

## spd

the pause duration after a session (sessionPauseDuration)

`spd`

* is required

* Type: `number`

* cannot be null

* defined in: [ServerDataStatus](serverdatastatus-definitions-serversessiondurationitem-properties-spd.md "https://timelimit.io/ServerDataStatus#/definitions/ServerSessionDurationItem/properties/spd")

### spd Type

`number`

## sm

the start minute of the day of the session/ the rule
which created this session (startMinuteOfDay)

`sm`

* is required

* Type: `number`

* cannot be null

* defined in: [ServerDataStatus](serverdatastatus-definitions-serversessiondurationitem-properties-sm.md "https://timelimit.io/ServerDataStatus#/definitions/ServerSessionDurationItem/properties/sm")

### sm Type

`number`

## em

the end minute of the day of the session/ the rule
which created this session (endMinuteOfDay)

`em`

* is required

* Type: `number`

* cannot be null

* defined in: [ServerDataStatus](serverdatastatus-definitions-serversessiondurationitem-properties-em.md "https://timelimit.io/ServerDataStatus#/definitions/ServerSessionDurationItem/properties/em")

### em Type

`number`

## l

the timestamp of the last usage of this session (lastUsage)

`l`

* is required

* Type: `number`

* cannot be null

* defined in: [ServerDataStatus](serverdatastatus-definitions-serversessiondurationitem-properties-l.md "https://timelimit.io/ServerDataStatus#/definitions/ServerSessionDurationItem/properties/l")

### l Type

`number`

## d

the duration of the last/ current session (lastSessionDuration)

`d`

* is required

* Type: `number`

* cannot be null

* defined in: [ServerDataStatus](serverdatastatus-definitions-serversessiondurationitem-properties-d.md "https://timelimit.io/ServerDataStatus#/definitions/ServerSessionDurationItem/properties/d")

### d Type

`number`
