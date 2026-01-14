#!/bin/sh

DB_PATH="/data/timelimit.sqlite"
CONFIG_PATH="/data/config.json"

# Maak runtime config.json
cat <<EOF > $CONFIG_PATH
{
  "adminToken": "${ADMIN_TOKEN}",
  "database": "$DB_PATH",
  "port": 8080
}
EOF

echo "Generated $CONFIG_PATH"

# Wachtwoord hashen met Node.js (bcryptjs zit in de TimeLimit server dependencies)
HASHED_PASSWORD=$(node - <<EOF
const bcrypt = require('bcryptjs');
console.log(bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10));
EOF
)

# Controleer of database bestaat
if [ ! -f "$DB_PATH" ]; then
    echo "Database not found, creating new SQLite database..."
    sqlite3 "$DB_PATH" "VACUUM;"
fi

# Controleer of admin user al bestaat
ADMIN_EXISTS=$(sqlite3 "$DB_PATH" "SELECT COUNT(*) FROM users WHERE email='lindjeroen@gmail.com';")

if [ "$ADMIN_EXISTS" -eq 0 ]; then
    echo "Creating admin user in database..."

    sqlite3 "$DB_PATH" <<EOF
INSERT INTO users (email, passwordHash, isAdmin)
VALUES ('lindjeroen@gmail.com', '$HASHED_PASSWORD', 1);
EOF

    echo "Admin user created."
else
    echo "Admin user already exists, skipping creation."
fi

echo "Starting TimeLimit server..."
node build/index.js
