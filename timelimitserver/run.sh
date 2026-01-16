#!/bin/sh
# Lees versie uit /etc/hassio.json (altijd aanwezig in HA add-ons)
ADDON_VERSION=$(jq -r '.version // empty' /etc/hassio.json 2>/dev/null)

echo "TimeLimit test add-on container is starting..."

counter=0
while true; do
  counter=$((counter + 1))
  echo "TimeLimit test add-on heartbeat: $counter"
  sleep 10
done
