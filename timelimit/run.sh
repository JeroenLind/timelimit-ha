#!/bin/sh

echo "=== TimeLimit HA Add-on run.sh v1.3 ==="
echo "Starting initialization..."

DB_PATH="/data/timelimit.sqlite"
CONFIG_PATH="/data/config.json"

echo "[INFO] ADMIN_TOKEN: ${ADMIN_TOKEN}"
echo "[INFO] ADMIN_PASSWORD: (hidden)"
echo "[INFO] Database path: $DB_PATH"
echo "[INFO] Config path: $CONFIG_PATH"

echo "[STEP] Generating config.json..."
cat <<EOF > $CONFIG_PATH
{
  "adminToken": "${ADMIN_TOKEN}",
  "database": "$DB_PATH",
  "port": 8080
}
EOF
echo "[OK] Config generated at $CONFIG_PATH"

echo "[STEP] Generating bcrypt hash for admin password..."
HASHED_PASSWORD=$(node - <<EOF
const bcrypt = require('bcryptjs');
console.log(bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10));
EOF
)

if [ -z "$HASHED_PASSWORD" ]; then
    echo "[ERROR] Failed to generate bcrypt hash!"
else
    echo "[OK] Password hash generated."
fi

echo "[STEP] Checking if SQLite database exists..."
if [ ! -f "$DB_PATH" ]; then
    echo "[INFO] Database not found. Creating new SQLite DB..."
    sqlite3 "$DB_PATH" "VACUUM;"
    echo "[OK] New database created."
else
    echo "[OK] Database already exists."
fi

echo "[STEP] Checking if admin user exists..."
ADMIN_EXISTS=$(sqlite3 "$DB_PATH" "SELECT COUNT(*) FROM users WHERE email='lindjeroen@gmail.com';")

echo "[DEBUG] ADMIN_EXISTS returned: $ADMIN_EXISTS"

if [ "$ADMIN_EXISTS" -eq 0 ]; then
    echo "[INFO] No admin user found. Creating admin user..."

    sqlite3 "$DB_PATH" <<EOF
INSERT INTO users (email, passwordHash, isAdmin)
VALUES ('lindjeroen@gmail.com', '$HASHED_PASSWORD', 1);
EOF

    if [ $? -eq 0 ]; then
        echo "[OK] Admin user created successfully."
    else
        echo "[ERROR] Failed to insert admin user into database!"
    fi
else
    echo "[OK] Admin user already exists. Skipping creation."
fi

echo "[STEP] Starting TimeLimit server..."
node build/index.js

EXIT_CODE=$?
echo "[INFO] TimeLimit server exited with code: $EXIT_CODE"
echo "=== run.sh completed ==="
