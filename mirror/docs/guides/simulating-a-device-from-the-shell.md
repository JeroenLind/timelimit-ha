## Simulating a device from the shell

This document describes how one can register a device, read the status and add used time at the TimeLimit server using curl and jq.
It requires a previous installation of the official client at some other device.

---

First, setup TimeLimit somehwere and chose the "add device" option at the overview screen to get a code.
In this example, it's "Spagat vertreiben Waise Schnitzel subtil". The Server is running in localhost in this case.

Then one can register a new device using this token.

```
curl -X POST -H "Content-Type: application/json" --data '{"registerToken":"Spagat vertreiben Waise Schnitzel subtil","deviceName":"Test-PC","childDevice":{"model":"PC"}}' http://localhost:8080/child/add-device
# response:
# {"deviceAuthToken":"bAz5nArfZz8IbsPlpinav5ODHpl6KyrQ","ownDeviceId":"q61lT0"}
```

The TimeLimit client will now show this new minimal device. Both values are important and should be written down for using them later.

The first idea would be to get the current configuration:

```
curl -X POST -H "Content-Type: application/json" --data '{"deviceAuthToken":"bAz5nArfZz8IbsPlpinav5ODHpl6KyrQ","status":{"devices":"","apps":{},"categories":{},"users":"","clientLevel":3}}' http://localhost:8080/sync/pull-status | jq .
```

This status parameters are required to get the current status. They can be set for caching, but for testing it's enough to kepp the values empty.
By replacing the dot as parameter for jq, it's possible to get some specific data.
One example would be to get the info for the device itself using ``curl ... | jq '[ .devices.data[] | {key:.deviceId,value:.} ] | from_entries | .q61lT0'``.

It's a good idea to read <https://stedolan.github.io/jq/manual/> to know how to extract values from this data using jq.

In this case, there is the category "Erlaubte Spiele" with the categoryId ``SLwtDr`` (can be found in the response). The error diagnose of the client showed 18608 as current day of epoch.

```
# first encode the action itself
echo '{"type":"ADD_USED_TIME_V2","d":18608,"i":[{"categoryId":"SLwtDr","tta":60000,"etts":0}]}' | jq --raw-input .
# d = dayOfEpoch
# tta = time to add in milliseconds
# etts = extra time to subtract in milliseconds
# then put it as the encodedAction here
curl -X POST -H "Content-Type: application/json" --data '{"deviceAuthToken":"bAz5nArfZz8IbsPlpinav5ODHpl6KyrQ","actions":[{"encodedAction":"{\"type\":\"ADD_USED_TIME_V2\",\"d\":18608,\"i\":[{\"categoryId\":\"SLwtDr\",\"tta\":60000,\"etts\":0}]}","sequenceNumber":2,"integrity":"","type":"appLogic","userId":""}]}' http://localhost:8080/sync/push-actions
# response: {"shouldDoFullSync":false} which indicates success
```

The sequence number must be increased. Otherwise, the actions are ignored. This allows sending actions again if the connection was interrupted without counting the time twice.

After running this, the client should show one used minute for the day and the pull-status should report it too.

jq can be used for constructing the request bodies and correctly escaping the values during this. For this, ``--arg name value`` which is described in its documentation is useful. For reading and using values, ``--raw-output`` can help.
