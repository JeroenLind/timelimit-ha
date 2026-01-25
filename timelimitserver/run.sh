#!/bin/sh

# Versie uitlezen uit bestand (fallback naar unknown)
VERSION="unknown"
if [ -f /app/version.txt ]; then
  VERSION=$(cat /app/version.txt)
fi

echo "======================================="
echo " TimeLimit Home Assistant Add-on"
echo " Version: $VERSION"
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

# Admin token exporteren
if [ -n "$ADMIN_TOKEN" ]; then
  export ADMIN_TOKEN="$ADMIN_TOKEN"
fi

# DEBUG variabele toevoegen voor Node.js/Express logging
export DEBUG="express:router,express:main,timelimit:*"

# VOEG DEZE REGEL TOE:
export NODE_ENV="development"

# Sanity checks
if [ ! -d "$BUILD_DIR" ]; then
  echo "ERROR: Build directory not found: $BUILD_DIR"
  exit 1
fi

if [ ! -f "$BUILD_DIR/index.js" ]; then
  echo "ERROR: Entry file not found: $BUILD_DIR/index.js"
  exit 1
fi

mkdir -p "$DATA_DIR"

echo "Starting UI webserver (Caddy)..."
# We gebruiken 'run' in plaats van 'start' voor Caddy als we logs willen zien, 
# maar voor nu laten we de config zoals hij is.
caddy start --config /etc/caddy/Caddyfile

echo "Starting TimeLimit server..."
cd "$BUILD_DIR" || exit 1

# De 'exec' regel aangepast om DEBUG door te geven aan node
exec node index.js \
  --port "$PORT" \
  --log-level "$LOG_LEVEL" \
  --data-dir "$DATA_DIR"