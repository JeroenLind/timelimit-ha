#! /bin/bash
set -e

# use the test environment
# certenv=live
# certbotparams="--test-cert"
# use the production environment
certenv=live
certbotparams=""

if [ "$(id -u)" != 0 ]; then
  echo "You must run this as root (with sudo)"
  exit 1
fi

if ! command -v dialog &> /dev/null; then
  apt update && apt install -y dialog
fi

dialog --yesno "This script will setup a timelimit-server installation. It assumes running at a clean Debian installation for this. Doing this will overwrite and delete some files - you have been warned. Do you want to continue?" 8 60

dialog --yesno "This device must be reachable from the public internet at port 80 and port 443 and you must have a (sub)domain at which this device can be reached. Do you have got both?" 8 60

dialog --yesno "Do you accept the current Let's Encrypt Subscriber Agreement which can be found at https://letsencrypt.org/repository/?" 8 60

apt update

firewall_mode="$(dialog --menu "Do you want to setup a firewall?" 10 60 3 \
  no "do not setup a firewall" \
  base "install ufw and allow http and https" \
  ssh "install ufw and allow http, https and ssh" \
  3>&1 1>&2 2>&3)"

if [ "$firewall_mode" != "no" ]; then
  apt install -y ufw

  ufw --force reset

  ufw default deny incoming
  ufw allow http
  ufw allow https

  if [ "$firewall_mode" = "ssh" ]; then
    ufw limit ssh
  fi

  ufw enable
fi

apt install -y curl certbot nginx python3-certbot-nginx

# minimal nginx setup
rm /etc/nginx/sites-enabled/default || true # ignore if it is already deleted
curl https://ssl-config.mozilla.org/ffdhe2048.txt > /usr/share/mozilla-dhparam
cat > /etc/nginx.conf <<"EOF"
user www-data;
worker_processes auto;
pid /run/nginx.pid;
include /etc/nginx/modules-enabled/*.conf;

events {
  worker_connections 512;
}

http {
  sendfile on;
  tcp_nopush on;
  tcp_nodelay on;
  keepalive_timeout 65;
  types_hash_max_size 2048;

  include /etc/nginx/mime.types;
  default_type application/octet-stream;

  ssl_session_timeout 1d;
  ssl_session_tickets off;
  ssl_dhparam /usr/share/mozilla-dhparam;

  ssl_protocols TLSv1.2 TLSv1.3;
  ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
  ssl_prefer_server_ciphers off;

  ssl_stapling on;
  ssl_stapling_verify on;

  gzip off;

  include /etc/nginx/conf.d/*.conf;
  include /etc/nginx/sites-enabled/*;
}
EOF
cat > /etc/nginx/sites-enabled/http-empty <<"EOF"
# this ensures that the certificates can be created/renewed
server {
  listen 80;
  listen [::]:80;

  server_tokens off;

  return 403;
}
EOF
systemctl reload nginx

# get data for cert creation
domain="$(dialog --inputbox "At which domain is this device reachable?" 10 60 "" 3>&1 1>&2 2>&3)"
if [[ ! "$domain" =~ ^([0-9a-zA-Z]|.)+$ ]] || [[ "$domain" =~ ^\.+$ ]]; then
  echo "This does not look like a valid domain"
  exit 1
fi

mail="`dialog --inputbox "What's your mail address? It will be the default mail address which can sign in at your timelimit server and it will be sent to Let's Encrypt for the certificate creation." 10 60 "" 3>&1 1>&2 2>&3`"

if [[ ! $mail =~ ^([0-9a-zA-Z]|-|\.)+@([0-9a-zA-Z]|-|\.)+$ ]]; then
  echo "This is not look like a valid mail address"
  exit 1
fi

# get certificates
certbot certonly --nginx $certbotparams -m "$mail" --agree-tos --non-interactive -d "$domain"

# add nginx site config
cat > /etc/nginx/sites-enabled/https-timelimit <<EOF
upstream timelimitbackend {
  server unix:/var/run/timelimit/server max_fails=0;
}

server {
  listen 443 ssl;
  listen [::]:443 ssl;

  server_name $domain;
  server_tokens off;

  ssl_certificate /etc/letsencrypt/$certenv/$domain/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/$certenv/$domain/privkey.pem;

  location / {
    proxy_pass http://timelimitbackend/;

    proxy_set_header X-Real-IP \$remote_addr;
    proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto \$scheme;
    proxy_set_header Host \$http_host;
    proxy_set_header Upgrade \$http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_http_version 1.1;

    client_max_body_size 10m;
  }
}
EOF
nginx -t
systemctl reload nginx

# install and configure the database
apt install -y postgresql-11
runuser -u postgres -- createuser timelimitrun
runuser -u postgres -- createdb --encoding=utf8 --owner=timelimitrun timelimit
echo "listen_addresses = ''" > /etc/postgresql/11/main/conf.d/disable-tcp-listen.conf
cat > /etc/postgresql/11/main/pg_hba.conf <<"EOF"
# TYPE  DATABASE        USER            ADDRESS                 METHOD
local   all             postgres                                peer
local   timelimit       timelimitrun                            peer
EOF
systemctl restart postgresql

# install more dependencies
apt install -y pgp git npm jq

# create a config
mkdir --mode=u=rwx,go=rx /etc/timelimit
jq --null-input --arg mailWhitelist "$mail" '{mailWhitelist:$mailWhitelist}' > /etc/timelimit/config.json
chmod u=rw,go= /etc/timelimit/config.json

# create timelimit users
useradd timelimitrun && useradd timelimitbuild

# create directoreis
mkdir --mode=u=rwx,go=rx /var/lib/timelimit
mkdir --mode=u=rwx,go=rx /var/lib/timelimit/build
chown timelimitbuild /var/lib/timelimit/build

# clone the source code
runuser -u timelimitbuild -- git clone --mirror https://codeberg.org/timelimit/timelimit-server.git /var/lib/timelimit/build/mirror

# create helperscript for building the source code and run it
cat > /var/lib/timelimit/build/build.sh <<"EOF"
#! /bin/bash
set -e
cd /var/lib/timelimit/build/mirror
git remote update

current_version=""
if [ -f /var/lib/timelimit/run/version.txt ]; then
  current_version="$(cat /var/lib/timelimit/run/version.txt)"
fi

options=()

for option in $(git tag | grep -E '^2[0-9]{3}-[0-9]{2}-[0-9]{2}$' | sort --reverse); do
  info=""

  if [ "$option" = "$current_version" ]; then
    info="(currently installed)"
  fi

  options+=("$option" "$info")
done

selected_version="$(dialog --menu "Which version do you want to use?" 15 60 10 "${options[@]}" 3>&1 1>&2 2>&3)"

rm -rf .gnupg
curl https://keys.openpgp.org/vks/v1/by-fingerprint/2E5C672DE893055D04F5B7BC36B449FB5364BDC4 | HOME=/var/lib/timelimit/build/mirror gpg --import
echo "2E5C672DE893055D04F5B7BC36B449FB5364BDC4:6:" | HOME=/var/lib/timelimit/build/mirror gpg --import-ownertrust
err=0
HOME=/var/lib/timelimit/build/mirror git verify-tag --raw "$selected_version" 2>&1 | grep -q '\[GNUPG:\] TRUST_ULTIMATE' || err=$?
if [[ $err != 0 ]]; then
  echo "invalid signature"
  exit
fi

rm -rf /var/lib/timelimit/build/output/
mkdir --mode=u=rwx,go=rx /var/lib/timelimit/build/output
git --work-tree=/var/lib/timelimit/build/output/ checkout "$selected_version" -- .

cd /var/lib/timelimit/build/output/
mkdir .npmcache
export npm_config_cache=/var/lib/timelimit/build/output/.npmcache
# retry a few times
npm install --no-optional || npm install --no-optional || npm install --no-optional || npm install --no-optional
npm run build
npm prune --production
rm -rf src .npmcache
echo "$selected_version" > version.txt
EOF
chown timelimitbuild /var/lib/timelimit/build/build.sh
chmod u+x /var/lib/timelimit/build/build.sh
runuser -u timelimitbuild -- /var/lib/timelimit/build/build.sh

# create helperscript to use the new built version and use it
cat > /var/lib/timelimit/copy-new-build.sh <<"EOF"
#! /bin/bash
set -e
if [[ ! -f /var/lib/timelimit/build/output/version.txt ]]; then
  echo "There is no new build"
  exit 1
fi

if [[ -f /var/lib/timelimit/run/version.txt ]]; then
  NEWVERSION="$(cat /var/lib/timelimit/build/output/version.txt)"
  OLDVERSION="$(cat /var/lib/timelimit/run/version.txt)"

  if [[ "$OLDVERSION" > "$NEWVERSION" ]]; then
    echo ""
    echo "IMPORTANT"
    echo ""
    echo "It looks like you're trying to do a downgrade."
    echo "This is not recommend so it's blocked."
    echo "You can run 'rm /var/lib/timelimit/run/version.txt' to remove this check temporarily."
    echo ""
    exit 1
  fi
fi

rm -rf /var/lib/timelimit/run
mkdir --mode=u=rwx,go= /var/lib/timelimit/run
cp -r /var/lib/timelimit/build/output/* /var/lib/timelimit/run
chmod -R u-w,go-rwx /var/lib/timelimit/run
chown -R timelimitrun /var/lib/timelimit/run
# allow everyone to see the version
chmod go+x /var/lib/timelimit/run
chmod go+r /var/lib/timelimit/run/version.txt
EOF
chmod u+x /var/lib/timelimit/copy-new-build.sh
/var/lib/timelimit/copy-new-build.sh

# create a helperscript to create a env file and use it
cat > /var/lib/timelimit/build-env.sh <<"EOF"
#! /bin/bash
set -e
umask 077
config="$(cat /etc/timelimit/config.json)"
mail_whitelist="$(jq --argjson config "$config" --null-input --raw-output '$config.mailWhitelist | if type == "string" then . else "" end')"
disable_signup="$(jq --argjson config "$config" --null-input --raw-output '$config.disableSignup | if type == "boolean" and . == true then "yes" else "no" end')"
mail_sender="$(jq --argjson config "$config" --null-input --raw-output '$config.mailTransport.sender | if type == "string" then . else "" end')"
mail_transport="$(jq --compact-output --argjson config "$config" --null-input --raw-output '$config.mailTransport | if type == "object" then { host, port, secure, auth: { user, pass } } else null end')"
mail_imprint="$(jq --argjson config "$config" --null-input --raw-output '$config.mailImprint | if type == "string" then . else "" end')"
encode() {
  jq --null-input --raw-output --arg data "$1" '$data | gsub("\\\\"; "\\\\") | gsub("\n"; "\\n")'
}
(
  [[ "$mail_whitelist" != "" ]] && echo "MAIL_WHITELIST=$(encode "$mail_whitelist")"
  [[ "$mail_sender" != "" ]] && echo "MAIL_SENDER=$(encode "$mail_sender")"
  [[ "$mail_transport" != "null" ]] && echo "MAIL_TRANSPORT=$(encode "$mail_transport")"
  [[ "$mail_imprint" != "" ]] && echo "MAIL_IMPRINT=$(encode "$mail_imprint")"
  echo "DISABLE_SIGNUP=$disable_signup"
) > /etc/timelimit/env
EOF
chmod u+x /var/lib/timelimit/build-env.sh
/var/lib/timelimit/build-env.sh

# create a systemd unit and start the server
cat > /etc/systemd/system/timelimit.service <<"EOF"
[Unit]
Description=the timelimit server application

[Service]
Type=simple
WorkingDirectory=/var/lib/timelimit/run/
RuntimeDirectory=timelimit
ExecStartPre=rm -f /var/run/timelimit/server
ExecStart=/usr/bin/node /var/lib/timelimit/run/build/index.js
User=timelimitrun
Group=timelimitrun
Restart=always
PrivateTmp=yes
ProtectSystem=yes
ProtectHome=yes
ProtectDevices=yes
UMask=0555

Environment="DATABASE_URL=postgres://timelimitrun:unused@localhost/timelimit?host=/var/run/postgresql"
Environment="PORT=/var/run/timelimit/server"
Environment="NODE_ENV=production"
Environment="ALWAYS_PRO=yes"
EnvironmentFile=/etc/timelimit/env

[Install]
WantedBy=multi-user.target
EOF
systemctl daemon-reload
systemctl enable --now timelimit.service

# create timelimit-dump
cat > /bin/timelimit-dump <<"EOF"
#! /bin/bash
set -e
if [ "$(id -u)" != 0 ]; then
  echo "You must run this as root (with sudo)"
  exit 1
fi
runuser -u postgres -- pg_dump timelimit
EOF
chmod +x /bin/timelimit-dump

# implement timelimit-restore
cat > /bin/timelimit-restore <<"EOF"
#! /bin/bash
set -e
if [ "$(id -u)" != 0 ]; then
  echo "You must run this as root (with sudo)"
  exit 1
fi
if [ "$#" != 1 ]; then
  echo "You must supply one parameter, the file with the data to restore"
  exit 1
fi
if [ ! -f "$1" ]; then
  echo "You supplied a parameter, but it wasn't a file"
  exit 1
fi
TEMPFILE="$(mktemp)"
chown root "$TEMPFILE"
chgrp postgres "$TEMPFILE"
chmod u=rw,g=r,o= "$TEMPFILE"
cat "$1" > "$TEMPFILE"
dialog --yesno "Restoring \"$1\" will delete the current database content. Do you want to continue?" 8 60
systemctl stop timelimit
runuser -u postgres -- dropdb timelimit
runuser -u postgres -- createdb --encoding=utf8 --owner=timelimitrun timelimit
runuser -u postgres -- psql -f "$TEMPFILE" --dbname=timelimit
rm "$TEMPFILE"
systemctl start timelimit
dialog --msgbox "The backup was restored." 8 60
EOF
chmod +x /bin/timelimit-restore

# create timelimit-upgrade
cat > /bin/timelimit-upgrade <<"EOF"
#! /bin/bash
set -e
if [ "$(id -u)" != 0 ]; then
  echo "You must run this as root (with sudo)"
  exit 1
fi
runuser -u timelimitbuild -- /var/lib/timelimit/build/build.sh
/var/lib/timelimit/copy-new-build.sh
systemctl restart timelimit.service
dialog --msgbox "The new timelimit server version was installed." 8 60
EOF
chmod +x /bin/timelimit-upgrade

# create timelimit-config
cat > /bin/timelimit-config <<"EOF"
#! /bin/bash
set -e
if [ "$(id -u)" != 0 ]; then
  echo "You must run this as root (with sudo)"
  exit 1
fi
configfilepath=/etc/timelimit/config.json
config_write() {
  new_config="$(jq --null-input --argjson 'oldConfig' "$(cat /etc/timelimit/config.json)" "$@")"
  [[ "$new_config" == "" ]] && return 1
  echo "$new_config" > /etc/timelimit/config.json
  /var/lib/timelimit/build-env.sh
  systemctl restart timelimit
}
config_whitelist() {
  config="$(cat "$configfilepath")"

  old_whitelist="$(jq --argjson config "$config" --null-input --raw-output '$config.mailWhitelist | if type == "string" then . else "" end')"
  mail_whitelist="`dialog --inputbox "Which users are allowed to sign in? This is a list of mail addresses (someone@somewhere.com) or domains (mailbox.org), separated by comma; if a user requests signing in with a mail address which is not in this list, then the request is rejected" 12 60 "$old_whitelist" 3>&1 1>&2 2>&3`"
  [[ $? -eq 0 ]] || return 0

  config_write --arg whitelist "$mail_whitelist" '$oldConfig + { mailWhitelist: $whitelist }' || return 1

  dialog --msgbox "The whitelist was saved. It is now \"$mail_whitelist\"." 8 60
}
config_mail_delivery() {
  config="$(cat "$configfilepath")"

  old_sender="$(jq --argjson config "$config" --null-input --raw-output '$config.mailTransport.sender | if type == "string" then . else "" end')"
  sender_mail="`dialog --inputbox "From which mail address do you want to send the mails. It's recommend to NOT use your primary mail address." 10 60 "$old_sender" 3>&1 1>&2 2>&3`"
  [[ $? -eq 0 ]] || return 0

  old_host="$(jq --argjson config "$config" --null-input --raw-output '$config.mailTransport.host | if type == "string" then . else "" end')"
  sender_host="`dialog --inputbox "What's the hostname of the SMTP server which should be used?" 10 60 "$old_host" 3>&1 1>&2 2>&3`"
  [[ $? -eq 0 ]] || return 0

  old_secure="$(jq --argjson config "$config" --null-input --raw-output '$config.mailTransport.secure | if type == "boolean" and . == false then "--defaultno" else "" end')"
  sender_secure=true
  dialog $old_secure --yesno "Do you want to use TLS when connecting to the mail server?" 8 60 || sender_secure=false

  recommend_port=465
  if [[ "$sender_secure" == "false" ]]; then
    recommend_port=587
  fi

  old_port="$(jq --arg fallback "$recommend_port" --argjson config "$config" --null-input --raw-output '$config.mailTransport.port | if type == "number" then . else $fallback end')"
  sender_port="`dialog --inputbox "Which port should be used for SMTP? It's most likely ${recommend_port}." 10 60 "$old_port" 3>&1 1>&2 2>&3`"
  [[ $? -eq 0 ]] || return 0

  old_user="$(jq --argjson config "$config" --null-input --raw-output '$config.mailTransport.user | if type == "string" then . else "" end')"
  sender_user="`dialog --inputbox "What's the SMTP username?" 10 60 "$old_user" 3>&1 1>&2 2>&3`"
  [[ $? -eq 0 ]] || return 0

  old_pass="$(jq --argjson config "$config" --null-input --raw-output '$config.mailTransport.pass | if type == "string" then . else "" end')"
  sender_pass="`dialog --inputbox "What's the SMTP password?" 10 60 "$old_pass" 3>&1 1>&2 2>&3`"
  [[ $? -eq 0 ]] || return 0

  dialog --yesno "Do you want to use this settings?\nSender: $sender_mail\nHost: $sender_host\nTLS: $sender_secure\nPort: $sender_port\nUser: $sender_user\nPassword: $sender_pass" 11 60 || return 0

  config_write --arg sender "$sender_mail" --arg host "$sender_host" --argjson secure "$sender_secure" --arg port "$sender_port" --arg user "$sender_user" --arg pass "$sender_pass" '$oldConfig + {mailTransport: { sender: $sender, secure: $secure, host: $host, port: $port | tonumber, user: $user, pass: $pass }}' || return 1

  dialog --msgbox "Your settings were saved" 8 60
}
config_imprint() {
  config="$(cat "$configfilepath")"

  old_imprint="$(jq --argjson config "$config" --null-input --raw-output '$config.mailImprint | if type == "string" then . else "" end')"
  imprint="`dialog --inputbox "What footer would you like to set for the sent mails?" 10 60 "$old_imprint" 3>&1 1>&2 2>&3`"
  [[ $? -eq 0 ]] || return 0

  config_write --arg imprint "$imprint" '$oldConfig + { mailImprint: $imprint }' || return 1

  dialog --msgbox "The footer was saved. It is now \"$imprint\"." 8 60
}
config_signup() {
  old_value="$(jq --argjson config "$config" --null-input --raw-output '$config.disableSignup | if type == "boolean" and . == true then "--defaultno" else "" end')"

  value=false
  dialog $old_value --no-label "Disable sign up" --yes-label "Enable sign up" --yesno "Do you want to allow new users to sign up?" 8 60 || value=true
  config_write --argjson value "$value" '$oldConfig + {disableSignup: $value}' || return 1
  if [[ "$value" == "false" ]]; then
    dialog --msgbox "Users CAN sign up now" 8 60
  else
    dialog --msgbox "Users CAN NOT sign up now" 8 60
  fi
}
config_main() {
  config="$(cat "$configfilepath")"
  mail_whitelist="$(jq --argjson config "$config" --null-input --raw-output '$config.mailWhitelist | if type == "string" then . else "" end')"
  mail_sender="$(jq --argjson config "$config" --null-input --raw-output '$config.mailTransport.sender | if type == "string" then . else "(not configured)" end')"
  mail_imprint="$(jq --argjson config "$config" --null-input --raw-output '$config.mailImprint | if type == "string" then . else "" end')"
  disable_signup="$(jq --argjson config "$config" --null-input --raw-output '$config.disableSignup | if type == "boolean" and . == true then "CAN NOT" else "CAN" end')"

  option="$(dialog --menu "What would you like to change?" 12 0 5 \
  "mail-whitelist" "The allowed mail addresses for signing in - currently \"$mail_whitelist\"" \
  "mail-delivery" "The parameters for sending mails - currently using $mail_sender" \
  "mail-imprint" "The footer of the mails - currently \"$mail_imprint\"" \
  "disable-signup" "Allow/disallow new users; currently new users $disable_signup sign up" \
  "nothing" "Close the settings" \
  3>&1 1>&2 2>&3)"

  [[ $? -eq 0 ]] || return 0

  if [[ "$option" == "mail-whitelist" ]]; then
    config_whitelist || return 1
  elif [[ "$option" == "mail-delivery" ]]; then
    config_mail_delivery || return 1
  elif [[ "$option" == "mail-imprint" ]]; then
    config_imprint || return 1
  elif [[ "$option" == "disable-signup" ]]; then
    config_signup || return 1
  elif [[ "$option" == "nothing" ]]; then
    exit 0
  else
    echo "unknown option"
    exit 1
  fi
}

while true; do
  config_main
done
EOF
chmod +x /bin/timelimit-config

dialog --msgbox "Installation finished. You have to configure the mail delivery before you can use your server. You will get a list of possible commands after confirming this message." 8 60
reset
cat <<"EOF"
There are the following new commands available at your system now:

timelimit-dump
  This will output the current database content; redirect the output, e.g.
  using 'timelimit-dump > backup' to create a backup
timelimit-restore
  Use this to restore a dump using 'timelimit-restore ./backup'
timelimit-upgrade
  Use this to upgrade the timelimit server installation
timelimit-config
  Use this to adjust your configuration of the timelimit-server

You can get a list of them using 'timelimit-<tab>' or by look at the source code
of the installation script. This message is written at the end of the script.
EOF
