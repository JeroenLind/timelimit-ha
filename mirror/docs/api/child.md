# /child

This endpoint is used for by devices which are used by a child.

## POST /child/add-device

Use this during the setup to add a device to an existing family using an add device code.

### request

see [this JSON schema](../schema/registerchilddevicerequest.md)

### response

On a invalid request body: HTTP status code 400 Bad request

On a invalid add device token: HTTP status code 401 Unauthorized

On success: object with ``deviceAuthToken`` (string), ``ownDeviceId`` (string) and ``data`` (like a ``/sync/pull-status`` response)

## POST /child/update-primary-device

Use this to (un)set the calling device as primary device.

### request

see [this JSON schema](../schema/updateprimarydevicerequest.md)

### response

On a invalid request body: HTTP status code 400 Bad request

On a invalid auth token: HTTP status code 401 Unauthorized

If the transmitted ``currentUserId`` is empty or does not match the current user of the device:
HTTP status code 409 Conflict

If the transmitted ``currentUserId`` does not match a valid user: HTTP status code 409 Conflict

If trying to unset the device as primary device and the device is not the current device of the user:
HTTP status code 409 Conflict

Otherwise: a JSON object with the property ``status`` (string)

``status`` can have the following values:

- ``assigned to other device`` (if the user is assigned to an other device)
- ``requires full version``
- ``success``

### see

- [primary device concept](../concept/primary-device.md)

## POST /child/logout-at-primary-device

Use this to request unsetting the current primary device of the user
which is currently assigned to the calling device. This triggers a websocket
message to the current primary device of the user.

### request

see [this JSON schema](../schema/requestwithauthtoken.md)

### response

On a invalid request body: HTTP status code 400 Bad request

On a invalid auth token: HTTP status code 401 Unauthorized

If there is no user assigned to the calling device or
if there is no existing current primary device: HTTP status code 409 Conflict

On success: ``{"ok": true}``

### see

- [primary device concept](../concept/primary-device.md)
