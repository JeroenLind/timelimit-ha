#!/bin/sh
# Dit script start de TimeLimit test add-on en logt als eerste de versie
# zodat je in Home Assistant direct ziet welke build draait.

# Lees de versie uit config.yaml (die wordt door de workflow automatisch gebumpt)
ADDON_VERSION=$(grep -E '^version:' /data/options.json 2>/dev/null | sed -E 's/.*"([0-9]+\.[0-9]+\.[0-9]+)".*/\1/')

echo "TimeLimit add-on version: ${ADDON_VERSION:-unknown}"
echo "TimeLimit test add-on container is starting..."

counter=0
while true; do
  counter=$((counter + 1))
  echo "TimeLimit test add-on heartbeat: $counter"
  sleep 10
done
