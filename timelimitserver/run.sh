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

# Config laden
if [ -f /data/options.json ]; then
  PORT=$(jq -r '.port // 8080' /data/options.json)
  LOG_LEVEL=$(jq -r '.log_level // "info"' /data/options.json)
  DATA_DIR=$(jq -r '.data_dir // "/data/timelimit"' /data/options.json)
  ADMIN_TOKEN=$(jq -r '.admin_token // empty' /data/options.json)
  DEBUG_MODE=$(jq -r '.debug // false' /data/options.json)
  # let op: jq's "//" behandelt false als leeg, dus expliciet vergelijken
  ALWAYS_PRO=$(jq -r 'if .always_pro == false then "no" else "yes" end' /data/options.json)
else
  PORT=8080
  LOG_LEVEL="info"
  DATA_DIR="/data/timelimit"
  ADMIN_TOKEN=""
  DEBUG_MODE="false"
  ALWAYS_PRO="yes"
fi

echo "Using configuration:"
echo "  Port:        $PORT"
echo "  Log level:   $LOG_LEVEL (wordt door deze serverversie niet meer gebruikt)"
echo "  Data dir:    $DATA_DIR"
echo "  Admin token: $( [ -n "$ADMIN_TOKEN" ] && echo "set" || echo "not set" )"
echo "  Debug mode:  $DEBUG_MODE"
echo "  Always pro:  $ALWAYS_PRO"
echo

# De serverversie leest zijn instellingen alleen nog uit omgevingsvariabelen.
export PORT
export ALWAYS_PRO

if [ -n "$ADMIN_TOKEN" ]; then
  export ADMIN_TOKEN="$ADMIN_TOKEN"
fi

# NODE_ENV=development zorgt dat e-mails (login-codes) in de log worden geprint
# in plaats van verstuurd; zonder mailserver is dat de enige manier om in te loggen.
export NODE_ENV="development"

# Extra debug-logging alleen aan als de add-on-optie "debug" aan staat.
if [ "$DEBUG_MODE" = "true" ]; then
  export DEBUG="express:router,express:main,timelimit:*"
  export TIMELIMIT_DEBUG="1"   # volledige actiedata in de patch-logging
else
  unset DEBUG
  unset TIMELIMIT_DEBUG
fi

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

# ---------------------------------------------------------------------------
# PostgreSQL (de serverversie ondersteunt alleen nog PostgreSQL)
# Draait in deze container, alleen bereikbaar via een unix-socket, data in $DATA_DIR/pgdata.
# ---------------------------------------------------------------------------
PGDATA="$DATA_DIR/pgdata"
PGSOCKET="/run/postgresql"
PG_USER="timelimit"
PG_DB="timelimit"

mkdir -p "$PGDATA" "$PGSOCKET"
chown postgres:postgres "$PGSOCKET"
chown -R postgres:postgres "$PGDATA"
chmod 700 "$PGDATA"

if [ ! -s "$PGDATA/PG_VERSION" ]; then
  echo "Initializing PostgreSQL database cluster in $PGDATA ..."
  su-exec postgres initdb -D "$PGDATA" -E UTF8 --locale=C.UTF-8 --auth-local=trust > /dev/null || exit 1

  # Alleen via unix-socket; zuinig met geheugen (Raspberry Pi)
  cat >> "$PGDATA/postgresql.conf" <<PGCONF
listen_addresses = ''
unix_socket_directories = '$PGSOCKET'
shared_buffers = 32MB
max_connections = 30
log_min_messages = warning
PGCONF
fi

echo "Starting PostgreSQL..."
su-exec postgres pg_ctl -D "$PGDATA" -w -t 120 start || { echo "ERROR: PostgreSQL did not start"; exit 1; }

if ! su-exec postgres psql -h "$PGSOCKET" -d postgres -tAc "SELECT 1 FROM pg_roles WHERE rolname='$PG_USER'" | grep -q 1; then
  su-exec postgres createuser -h "$PGSOCKET" "$PG_USER" || exit 1
fi
if ! su-exec postgres psql -h "$PGSOCKET" -d postgres -tAc "SELECT 1 FROM pg_database WHERE datname='$PG_DB'" | grep -q 1; then
  su-exec postgres createdb -h "$PGSOCKET" --owner "$PG_USER" "$PG_DB" || exit 1
fi

export DATABASE_URL="postgres://$PG_USER:empty@localhost/$PG_DB?host=$PGSOCKET"

echo "Starting UI webserver (Caddy)..."
caddy start --config /etc/caddy/Caddyfile

stop_services() {
  caddy stop > /dev/null 2>&1
  su-exec postgres pg_ctl -D "$PGDATA" -m fast -w -t 30 stop
}

# Netjes afsluiten: eerst de server, dan PostgreSQL (voorkomt crash-recovery bij de volgende start)
on_signal() {
  echo "Stopping TimeLimit server..."
  kill -TERM "$NODE_PID" 2> /dev/null
  wait "$NODE_PID" 2> /dev/null
  stop_services
  exit 0
}
trap on_signal TERM INT

echo "Starting TimeLimit server..."
cd "$BUILD_DIR" || exit 1

node index.js &
NODE_PID=$!
wait "$NODE_PID"
STATUS=$?

echo "TimeLimit server stopped with status $STATUS"
stop_services
exit "$STATUS"
