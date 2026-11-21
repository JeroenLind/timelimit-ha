# Server Setup

There is a shell script for doing a mostly automated installation at <https://codeberg.org/timelimit/timelimit-server/raw/branch/master/docs/guides/timelimit-server-setup.sh>. During a test, it took 10 minutes to do a installation with it.

**Read the messages which the script shows** - it is recommend to run it on a clean Debian 10 installation because it overwrites some configuration files.

## Usage

- download it (using wget or a webbrowser)
- make it executable (``chmod +x timelimit-server-setup.sh``)
- run it (``sudo ./timelimit-server-setup.sh``)
- answer the questions

## Requirements

- a **public** IP address **with** a domain name
- a reachable port 80 and 443 (which can need a port forwarding at your router)
- a Debian 10 installation (or something comparable) which does not contain anything (important)
- a mail address for sending automated mails (using SMTP) which should **not** be your primary mail address

## Created setup

- timelimit-server (as a systemd service)
- postgresql (connected to timelimit-server using a unix socket)
- nginx (connected to timelimit-server using a unix socket)
- certbot (to get valid certificates)
- a few helper commands with the ``timelimit-`` prefix
