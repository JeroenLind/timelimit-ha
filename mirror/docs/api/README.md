# TimeLimit Server API documentation

The client communicates with the server using HTTP(S) requests
and a socket.io websocket connection.

All requests bodies (if any) and responses are encoded as JSON
if not said otherwise.

## /admin

This endpoint is for the server administrator.
Its interface is described at [admin.md](./admin.md).

## /auth

This endpoint is used for the user authentication.
Its interface is described at [auth.md](./auth.md).

## /child

This endpoint is used for by devices which are used by a child.
Its interface is described at [child.md](./child.md).

## /parent

This endpoint is used by devices which are used by a parent.
Its interface is described at [parent.md](./parent.md).

## /purchase

This endpoint is used for handling purchases from the client.
Its interface is described at [purchase.md](./purchase.md).

## /sync

This endpoint is used by clients for syncing.
Its interface is described at [sync.md](./sync.md).

## GET /time

This endpoint returns the current time of the server
as a Unix timestamp in milliseconds. This does not need
any authentication.

The response is a object with the property ``ms`` whose
value is the timestamp as number.

Example response: ``{"ms":1578311020747}``

## Websocket

The websocket is used for real time notifications from the server
to the client. The protocol is described at [websocket.md](./websocket.md).
