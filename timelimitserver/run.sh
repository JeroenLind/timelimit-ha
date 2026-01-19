#!/bin/sh

echo "======================================="
echo " TimeLimit Home Assistant Add-on"
echo " Version: ${ADDON_VERSION:-unknown}"
echo "======================================="
echo

# Basispad
APP_DIR="/app"
BUILD_DIR="$APP_DIR/build"
OTHER_DIR="$APP_DIR/other"

# Config laden uit /data/options.json
if [ -f /data/options.json ]; then
  echo "Loaded configuration from /data/options.json:"
  cat /data/options.json
  echo
else
  echo "WARNING: /data/options.json not found. Using defaults."
  echo
fi

# Config-waarden uitlezen met defaults
PORT=$(jq -r '.port // 8080' /data/options.json 2>/dev/null)
LOG_LEVEL=$(jq -r '.log_level // "info"' /data/options.json 2>/dev/null)
DATA_DIR=$(jq -r '.data_dir // "/data/timelimit"' /data/options.json 2>/dev/null)

echo "Using configuration:"
echo "  Port:       $PORT"
echo "  Log level:  $LOG_LEVEL"
echo "  Data dir:   $DATA_DIR"
echo

# === Sanity checks op de build ===

# 1. Bestaat de build directory?
if [ ! -d "$BUILD_DIR" ]; then
  echo "ERROR: Build directory not found: $BUILD_DIR"
  echo "The build stage may have failed or was not copied correctly."
  exit 1
fi

# 2. Bestaat de hoofd-entrypoint?
if [ ! -f "$BUILD_DIR/index.js" ]; then
  echo "ERROR: Entry file not found: $BUILD_DIR/index.js"
  echo "Check if 'npm run build' produced the expected output."
  exit 1
fi

# 3. Bestaat server.js (waar de Express server en routes in zitten)?
if [ ! -f "$BUILD_DIR/server.js" ]; then
  echo "WARNING: server.js not found in $BUILD_DIR"
  echo "Routes may not be loaded correctly."
fi

# 4. Bestaat de routes directory?
if [ ! -d "$BUILD_DIR/routes" ]; then
  echo "WARNING: routes directory not found: $BUILD_DIR/routes"
  echo "If you get 'Cannot GET /api/...', the routes may be missing."
else
  echo "Found routes directory: $BUILD_DIR/routes"
fi

# 5. Bestaat de 'other' directory voor mailtemplates?
if [ ! -d "$OTHER_DIR" ]; then
  echo "WARNING: 'other' directory not found: $OTHER_DIR"
  echo "Mail templates may be missing; some features could fail."
else
  echo "Found 'other' directory: $OTHER_DIR"
fi

echo

# Zorg dat de data directory bestaat
mkdir -p "$DATA_DIR"

echo "Starting TimeLimit server..."
echo

# Start de server in de foreground (belangrijk voor HA)
cd "$BUILD_DIR" || {
  echo "ERROR: Failed to change directory to $BUILD_DIR"
  exit 1
}

# We starten via index.js, dat op zijn beurt de server opzet
exec node index.js \
  --port "$PORT" \
  --log-level "$LOG_LEVEL" \
  --data-dir "$DATA_DIR"