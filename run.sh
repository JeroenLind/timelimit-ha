#!/bin/sh

# Maak runtime config.json
cat <<EOF > /data/config.json
{
  "adminToken": "${ADMIN_TOKEN}",
  "database": "/data/timelimit.sqlite",
  "port": 8080
}
EOF

echo "Generated /data/config.json"
echo "Starting TimeLimit server..."

node build/index.js
