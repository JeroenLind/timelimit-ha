# /parent

This endpoint is used by devices which are used by a parent.

## see

- [auth API](./auth.md) for obtaining mail auth tokens which are needed at some APIs here

## POST /parent/get-status-by-mail-address

Use this to check the status of a mail auth token and the linked mail address.

### request

see [this JSON schema](../schema/mailauthtokenrequestbody.md)

### response

On a invalid request body: HTTP status code 400 Bad Request

If the mail auth token is invalid/ expired: HTTP status code 401 Unauthorized

On success: a object with the properties ``status`` (string), ``mail`` (string),
``canCreateFamily`` (boolean) and ``alwaysPro`` (boolean)

- ``status`` is ``with family`` or ``without family``
- ``mail`` is the mail address for which the auth token was created
- ``canCreateFamily`` is false if the sign up of new families was disabled and otherwise true
- ``alwaysPro`` is true if the premium version is always unlocked

## POST /parent/create-family

Use this to register a new family.

### request

see [this JSON schema](../schema/createfamilybymailtokenrequest.md)

### response

On a invalid request body: HTTP status code 400 Bad Request

If the mail auth token is invalid/ expired: HTTP status code 401 Unauthorized

If there is already a user with the mail address of the mail auth token: HTTP status code 409 Conflict

On success: object with ``deviceAuthToken`` (string), ``ownDeviceId`` (string) and ``data`` (like a ``/sync/pull-status`` response)

## POST /parent/sign-in-into-family

Use this to sign in into an existing family using a mail auth token.

### request

see [this JSON schema](../schema/signintofamilyrequest.md)

### response

On a invalid request body: HTTP status code 400 Bad Request

If there is no user with the mail address of the mail auth token: HTTP status code 409 Conflict

On success: object with ``deviceAuthToken`` (string), ``ownDeviceId`` (string) and ``data`` (like a ``/sync/pull-status`` response)

## POST /parent/can-recover-password

**Depreacted:** The caller should know by itself if the mail address belongs to the user.
``/recover-parent-password`` will report a failure if it does not.

Use this to check if the parent password can be recovered. This checks that the
mail auth token matches the mail address of the parent user.

### request

see [this JSON schema](/schema/canrecoverpasswordrequest.md)

### response

On a invalid request body: HTTP status code 400 Bad Request

If the mail auth token is invalid/ expired: HTTP status code 401 Unauthorized

On success: object with the property ``canRecover`` (boolean)

## POST /parent/recover-parent-password

Use this to set the password for a user without knowing the old password.

### request

see [this JSON schema](../schema/recoverparentpasswordrequest.md)

### response

On a invalid request body: HTTP status code 400 Bad Request

On a invalid new password: HTTP status code 400 Bad Request

If the mail auth token is invalid/ expired: HTTP status code 401 Unauthorized

If the mail address is not registered: HTTP status code 409 Conflict

On success: ``{"ok": true}``

## POST /parent/create-add-device-token

Use this to create a token which can be used by ``/child/add-device``.

### request

see [this JSON schema](../schema/createregisterdevicetokenrequest.md)

in case of a device used by a parent with disabled password checks, use ``device`` as ``secondPasswordHash``

### response

On a invalid request body: HTTP status code 400 Bad Request

If the device auth token is invalid: HTTP status code 401 Unauthorized

If the ``secondPasswordHash`` is invalid: HTTP status code 401 Unauthorized

On success: object with ``token`` and ``deviceId``

``token`` is the add device token

``deviceId`` is the device id which the new device will get if it uses the token

## POST /parent/link-mail-address

Use this to link a mail address to an existing parent user.

### request

see [this JSON schema](../schema/linkparentmailaddressrequest.md)

### response

On a invalid request body: HTTP status code 400 Bad Request

If the device auth token is invalid: HTTP status code 401 Unauthorized

If the mail auth token is invalid/ expired: HTTP status code 401 Unauthorized

If there is already a user with the mail address of the mail auth token: HTTP status code 409 Conflict

If there is no user with the specified ``parentId`` (user id): HTTP status code 409 Conflict

If there is already a mail address for the user: HTTP status code 409 Conflict

If the ``parentPasswordSecondHash`` is invalid: HTTP status code 409 Conflict

On success: ``{"ok": true}``

## POST /parent/remove-device

Use this to remove a device from a family.

### request

see [this JSON schema](../schema/removedevicerequest.md)

in case of a device used by a parent with disabled password checks, use ``device`` as ``secondPasswordHash``

### response

On a invalid request body: HTTP status code 400 Bad Request

If the device auth token is invalid: HTTP status code 401 Unauthorized

If there is no device with the specified ``deviceId``: HTTP status code 409 Conflict

If the ``secondPasswordHash`` is invalid: HTTP status code 401 Unauthorized

On success: ``{"ok": true}``

## POST /parent/create-identity-token

Use this to get a identity token.
This can be used to inform the server operator about ones user account.

### request

see [this JSON schema](../schema/requestidentitytokenrequest.md)

in case of a device used by a parent with disabled password checks, use ``device`` as ``secondPasswordHash``

## response

On a invalid request body: HTTP status code 400 Bad Request

If the device auth token is invalid: HTTP status code 401 Unauthorized

If there is no device with the specified ``deviceId``: HTTP status code 409 Conflict

If the ``secondPasswordHash`` is invalid: HTTP status code 401 Unauthorized

If the server does not support this request: HTTP status code 404

On success: ``{"token": "some string"}``; you should not make any assumptions about the token string

## POST /parent/delete-account

Use this to delete an account. This includes the complete family registration
with users and devices. Due to that, all parents with a linked mail address
have to authenticate this action.

## request

see [this JSON schema](../schema/deleteaccountpayload.md)

## response

On success: HTTP status code 200

On a invalid request body: HTTP status code 400 Bad Request

On unknown device auth token: HTTP status code 401 Unauthorized

On missing parent authentication: HTTP status code 401 Unauthorized

On unrelated parent authentication: HTTP status code 401 Unauthorized

If a newer endpoint must be used/the client is too old: HTTP status code 410 Gone
