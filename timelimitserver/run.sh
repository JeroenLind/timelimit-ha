#!/bin/sh

# Lees versie uit addon_info.json (altijd aanwezig in HA add-ons)
ADDON_VERSION=$(jq -r '.version // empty' /etc/addon_info.json 2>/dev/null)

echo "TimeLimit add-on version: ${ADDON_VERSION:-unknown}"
echo "TimeLimit test add-on container is starting..."

counter=0
while true; do
  counter=$((counter + 1))
  echo "TimeLimit test add-on heartbeat: $counter"
  sleep 10
done
