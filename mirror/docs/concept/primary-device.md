# Primary device concept

One (child) user can be assigned to multiple devices. Without synchronization,
this can result in using the time limits once per device and not only once.
Due to that, there is (by default) the limitation that a child must select
one device for using limited Apps.

There can be one or zero primary devices. This is required for the primary device
switching process and for the initial state.

## assign process

- sync
- try to assign the user using the [child API](../api/child.md)
- if the user is assigned to a different device, request a logout using the [child API](../api/child.md) and retry it
  - this should not be done in a loop without delays
  - using the [websocket](./websocket.md) it is possible to get changes without polling
  - requesting a sign out should be repeated all few seconds

## unassign process

- sync
- unassign the user using the [child API](../api/child.md)
