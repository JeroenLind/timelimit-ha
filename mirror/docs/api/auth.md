# /auth

This endpoint is for the user authentication.

For this, mail addresses are used. The user starts
a authentication flow by sending the mail address.
Then the caller gets a mail login token and a
code is sent to the specified mail address.
After this, the caller can send the mail login token
and the code received by mail to get a mail auth token which can be
used at other APIs for creating a family, signing in into an existing family or
recovering a password.

## POST /auth/send-mail-login-code-v2

Use this to start authenticating.

### Request

see [this JSON schema](../schema/sendmaillogincoderequest.md)

#### example request

```
{
  "mail": "test@timelimit.io",
  "locale": "de",
  "deviceAuthToken": "1234abcde"
}
```

### Response

If the request body is malformed or the mail address is invalid: HTTP status code 400 Bad Request

If the rate limit was exceeded: HTTP status code 429 Too Many Requests

If a deviceAuthToken was sent which is invalid: HTTP status code 401 Unauthorized

If a whitelist was configured and the mail address is not within it: ``{"mailAddressNotWhitelisted": true}``

If a blacklist was configured and the mail server is within it: ``{"mailServerBlacklisted": true}``

If a temporarily blacklist was configured and the mail server is within it (used in case of known mail delivery issues): ``{"mailServerBlacklistedTemporarily": true}``

If the client is suspicious: ``{"blockedForIntegrityReasons": true}``

On success: a object with a ``mailLoginToken`` of the type string

#### example response

```
{
  "mailLoginToken": "dhdgfssgsdgd"
}
```

#### see

- [mail black and whitelist concept](../concept/mail-blackwhitelist.md)

## POST /auth/sign-in-by-mail-code

Use this to finish authenticating.

### Request

see [this JSON schema](../api/signinbymailcoderequest.md)

#### example request

```
{
  "receivedCode": "ein test login",
  "mailLoginToken": "dhdgfssgsdgd"
}
```

### Response

If the request body is malformed: HTTP status code 400 Bad Request

If there were to many wrong attempts: HTTP status code 410 Gone

If the mail login token is unknown: HTTP status code 410 Gone

If the received code is wrong and it can be tried again: HTTP status code 403 Forbidden

On success: A object with a ``mailAuthToken`` of the type string

#### example response

``{"mailAuthToken": "wthdktjdejd"}``
