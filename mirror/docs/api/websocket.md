# Websocket

The websocket is used for real time notifications from the server
to the client. For this, socket.io is used which internally
uses the ``/socket.io`` endpoint. It is highly recommend to only
use the websocket transport and to not use the polling transport.

Upon connecting, the client should emit ``devicelogin`` with one or two parameters.
The first parameter must be the device auth token and the second one can be an ack
function. After handling the connection, the server calls the ack function.

Clients should only do one ``devicelogin`` per connection. Doing it multiple
times per connection can result in missing events. Invalid auth tokens are ignored/
do not receive notifications.

## events from the server

### should sync

The server can emit ``should sync`` with one parameter of the type object.
This object has the boolean property ``isImportant``.

The client should sync after receiving this. If it is not important, then the client
can wait until to user opens the UI the next time.

### sign out

The server can emit ``sign out`` without any parameters. This tells the device
if it is the primary device for a user that it should leave that role if possible.

see the [primary device concept](../concept/primary-device.md)

### connected devices

The server can emit ``connected devices`` with one parameter of the type array of string.
This array contains the device ids of the devices which should be shown as connected.
