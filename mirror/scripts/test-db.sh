#! /bin/bash
set -e

ISNEW=0

if ! [ -f  tempdb/.installed ]; then
  ISNEW=1

  rm -rf tempdb

  mkdir tempdb tempdb/data tempdb/socket

  pg_ctl init -D tempdb/data -s -o "--locale=en_US.UTF-8 -E UTF8"

  cat >> tempdb/data/postgresql.conf <<"EOF"
    unix_socket_directories = '../socket'
    listen_addresses = '' # do not listen using TCP
EOF
fi

pg_ctl start -D tempdb/data

if [ $ISNEW -eq 1 ]; then
  createuser -h "$(pwd)/tempdb/socket" tldemo
  createdb -h "$(pwd)/tempdb/socket" --owner tldemo tldemo

  touch tempdb/.installed
fi

echo
echo 'Postgres started in the new shell; leave to stop it'
echo

DATABASE_URL="postgres://tldemo:empty@localhost/tldemo?host=$(pwd)/tempdb/socket" $SHELL || true # ignore errors

pg_ctl stop -D tempdb/data

echo
echo Back at your regular shell
echo
