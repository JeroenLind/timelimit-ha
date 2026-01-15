#!/bin/sh
# Log de add-on versie zoals Home Assistant die doorgeeft
echo "TimeLimit add-on version: ${BUILD_VERSION:-unknown}"

echo "TimeLimit test add-on container is starting..."

counter=0
while true; do
  counter=$((counter + 1))
  echo "TimeLimit test add-on heartbeat: $counter"
  sleep 10
done
