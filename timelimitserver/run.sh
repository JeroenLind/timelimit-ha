#!/bin/sh

echo "=== ENVIRONMENT VARIABLES ==="
env
echo

echo "=== ROOT DIRECTORY STRUCTURE ==="
ls -R /
echo

echo "=== /etc DIRECTORY ==="
ls -R /etc
echo

echo "=== /data DIRECTORY ==="
ls -R /data 2>/dev/null || echo "/data does not exist"
echo

echo "=== /run DIRECTORY ==="
ls -R /run 2>/dev/null || echo "/run does not exist"
echo

echo "=== /app DIRECTORY ==="
ls -R /app 2>/dev/null || echo "/app does not exist"
echo

echo "=== CHECKING KNOWN HA METADATA FILES ==="

for f in \
  /etc/addon_info.json \
  /etc/hassio.json \
  /data/options.json \
  /run/hassio.json \
  /run/s6/container_environment/BUILD_VERSION \
  /run/s6/container_environment \
  /etc/s6-overlay \
  /etc/services.d \
  /etc/cont-init.d \
  /etc/cont-finish.d
do
  if [ -f "$f" ]; then
    echo "--- FOUND FILE: $f ---"
    cat "$f"
    echo
  elif [ -d "$f" ]; then
    echo "--- FOUND DIRECTORY: $f ---"
    ls -R "$f"
    echo
  else
    echo "--- NOT FOUND: $f ---"
  fi
done


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
