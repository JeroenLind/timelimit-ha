#!/bin/sh

echo "======================================="
echo " TimeLimit Home Assistant Add-on"
echo " Version: ${ADDON_VERSION:-unknown}"
echo "======================================="
echo

APP_DIR="/app"
BUILD_DIR="$APP_DIR/build"
OTHER_DIR="$APP_DIR/other"

# Config laden
if [ -f /data/options.json ]; then
  PORT=$(jq -r '.port // 8080' /data/options.json)
  LOG_LEVEL=$(jq -r '.log_level // "info"' /data/options.json)
  DATA_DIR=$(jq -r '.data_dir // "/data/timelimit"' /data/options.json)
  ADMIN_TOKEN=$(jq -r '.admin_token // empty' /data/options.json)
else
  PORT=8080
  LOG_LEVEL="info"
  DATA_DIR="/data/timelimit"
  ADMIN_TOKEN=""
fi

echo "Using configuration:"
echo "  Port:        $PORT"
echo "  Log level:   $LOG_LEVEL"
echo "  Data dir:    $DATA_DIR"
echo "  Admin token: $( [ -n "$ADMIN_TOKEN" ] && echo "set" || echo "not set" )"
echo

# Admin token exporteren (server activeert admin API alleen als deze bestaat)
if [ -n "$ADMIN_TOKEN" ]; then
  export ADMIN_TOKEN="$ADMIN_TOKEN"
fi

# === Sanity checks op de build ===

if [ ! -d "$BUILD_DIR" ]; then
  echo "ERROR: Build directory not found: $BUILD_DIR"
  exit 1
fi

if [ ! -f "$BUILD_DIR/index.js" ]; then
  echo "ERROR: Entry file not found: $BUILD_DIR/index.js"
  exit 1
fi

if [ ! -d "$OTHER_DIR" ]; then
  echo "WARNING: 'other' directory not found: $OTHER_DIR"
fi

mkdir -p "$DATA_DIR"

echo "Starting TimeLimit server..."
echo

cd "$BUILD_DIR" || {
  echo "ERROR: Failed to change directory to $BUILD_DIR"
  exit 1
}

exec node index.js \
  --port "$PORT" \
  --log-level "$LOG_LEVEL" \
  --data-dir "$DATA_DIR"