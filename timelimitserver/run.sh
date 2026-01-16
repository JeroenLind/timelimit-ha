#!/bin/sh

echo "TimeLimit add-on version: ${ADDON_VERSION:-unknown}"
echo "TimeLimit test add-on container is starting..."

counter=0
while true; do
  counter=$((counter + 1))
  echo "TimeLimit test add-on heartbeat: $counter"
  sleep 10
done
