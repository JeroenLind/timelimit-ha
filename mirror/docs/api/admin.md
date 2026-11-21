# /admin

This endpoint is for the server admin.

Due to that, it requires authentication using the HTTP basic authentication.
The username can be anything, the password must be the configured admin token.

Additionally, this endpoint allows cross origin requests.

## GET /admin/status

Use this to get the server status.

## Response

This returns a JSON object with ``websocketClients`` (of the type number,
the number of clients connected using the websocket) and the maps ``counters`` and ``maxValues``
which map values to numbers. You should not make any assumptions about the key names
and their availability.

### example response

```
{
  "websocketClients": 3,
  "counters": {
    "testCounter": 1
  },
  "maxValues": {
    "testMax": 3
  }
}
```

## POST /admin/reset-counters

Use this to reset the counters and maxValues included in the server status.

Although this uses POST, it does not take any request body

Response: ``{"ok": true}``

## GET /admin/status-message

Use this to get the current status message.

This returns a object with the key ``statusMessage`` whose value
of the type string is the current status message.

Example response: ``{"statusMessage":""}``

### see

- [status message concept](../concept/status-message.md)

## POST /admin/status-message

Use this to set the status message.

Request body: object with ``message`` (string)

Response: ``{"ok": true}``

### see

- [status message concept](../concept/status-message.md)

## POST /admin/unlock-premium-v2

Use this to unlock all features for one user for a specified duration.

### request

request properties: ``purchaseToken``, ``purchaseId`` and ``dryRun``

- ``purchasetoken`` is a string which the client shows at the purchase screen
- ``purchaseId`` is the ID that is used at the bill
- ``dryRun`` is a boolean
  - setting true will skip the actual unlocking
  - false will add a four week tolerance to the token expiry to permit checking now and unlocking later
- ``type`` is a string and must be ``year``, ``month`` or ``unpaid14``

### response

The response contains the following properties:

- ``ok`` (boolean)
- ``error``
  - string
  - set if and only if ``ok`` is false
  - possible values
    - ``token invalid``
    - ``illegal state``
    - ``purchase id already used``
- ``detail``
  - optional string
  - should be shown to the support
- ``lastPurchase``
  - optional object
  - should be shown to the support
- ``wasAlreadyExecuted`` (boolean, set if and only if ``ok`` is true)
- ``mail`` (string, set if and only if ``ok`` is true)

If the request was malformed: HTTP status code 400 Bad Request

Using the same ``purchaseId`` twice results in:

- ``wasAlreadyExecuted`` if the familyId is unchanged
- ``error`` = ``purchase id already used`` otherwise
