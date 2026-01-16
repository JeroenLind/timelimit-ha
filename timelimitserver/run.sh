#!/bin/sh

echo "======================================="
echo " TimeLimit Home Assistant Add-on"
echo " Version: ${ADDON_VERSION:-unknown}"
echo "======================================="
echo

# Config laden uit /data/options.json
if [ -f /data/options.json ]; then
  echo "Loaded configuration from /data/options.json:"
  cat /data/options.json
  echo
else
  echo "WARNING: /data/options.json not found. Using defaults."
  echo
fi

# Config-waarden uitlezen
PORT=$(jq -r '.port // 8080' /data/options.json 2>/dev/null)
LOG_LEVEL=$(jq -r '.log_level // "info"' /data/options.json 2>/dev/null)
DATA_DIR=$(jq -r '.data_dir // "/data/timelimit"' /data/options.json 2>/dev/null)

echo "Using configuration:"
echo "  Port:       $PORT"
echo "  Log level:  $LOG_LEVEL"
echo "  Data dir:   $DATA_DIR"
echo

# Controleren of de build aanwezig is
if [ ! -f /app/build/index.js ]; then
  echo "ERROR: TimeLimit server build not found at /app/build/index.js"
  echo "The build stage may have failed."
  exit 1
fi

# Zorg dat de data directory bestaat
mkdir -p "$DATA_DIR"

echo "Starting TimeLimit server..."
echo

# Start de server in de foreground (belangrijk voor HA)
exec node /app/build/index.js \
  --port "$PORT" \
  --log-level "$LOG_LEVEL" \
  --data-dir "$DATA_DIR"
  