# Docker

You can run the timelimit server with docker. Here are two example configuration files:

## Important

Watch out to actually rebuild the images and restart the containers after updates (for example using ``docker-compose up --build``).

## example docker-compose.yml with external databases

```
# change the passwords and use https://docs.docker.com/compose/environment-variables/
# to keep sensitives value in a .env file while using ${VAR_NAME} here instead
version: '3'
services:
  api:
    build: /path/to/the/timelimit/source/code
    environment:
      NODE_ENV: production
      DATABASE_URL: postgres://user:pass@example.com:5432/dbname
      PORT: 8080
      MAIL_SENDER: me@my.timelimit.server
      MAIL_TRANSPORT: '{"host": "localhost", "port": 25}'
      ALWAYS_PRO: 'yes'
      # put additional config variables here
    restart: always
    # you can enable logging during testing by commenting this out,
    # but logging is not needed when everything works
    logging:
      driver: none
    # easy solution to use a database which does not run within docker
    network_mode: "host"
    # otherwise:
    # redirect host port 9000 to guest port 8080 (to allow access to the API)
    # ports:
    #  - "9000:8080"
    # in case the database runs outside of docker and you don't want to use the host network mode, see
    # https://forums.docker.com/t/accessing-host-machine-from-within-docker-container/14248
    # or don't use docker ...
```
