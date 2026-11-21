# /purchase

This endpoint is used for handling purchases from the client.
It currently only supports purchases using Google Play in app purchases.

## see

- [premium concept](../concept/premium.md)

## POST /purchase/can-do-purchase

Use this before a purchase to check if a purchase is possible.

### request

see [this JSON schema](../schema/candopurchaserequest.md)

Note that ``type`` is not used at all.

### response

On a invalid request body: HTTP status code 400 Bad request

On a invalid auth token: HTTP status code 401 Unauthorized

On success: a JSON object with the property ``canDoPurchase`` (string).

possible values of ``canDoPurchase``:

- ``yes``
- ``no due to old purchase``
- ``no because not supported by the server`` (currently unused)
