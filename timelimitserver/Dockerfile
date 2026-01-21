# -----------------------------
# Stage 1: Build TimeLimit server
# -----------------------------
FROM node:20-alpine AS serverbuild

WORKDIR /build

RUN apk add --no-cache git
RUN git clone https://codeberg.org/timelimit/timelimit-server.git .

RUN npm ci
RUN npm run build


# -----------------------------
# Stage 2: Build TimeLimit UI
# -----------------------------
FROM node:20-alpine AS uibuild

WORKDIR /ui

RUN apk add --no-cache git
RUN git clone https://codeberg.org/timelimit/timelimit-server-ui.git .

RUN npm ci
RUN npm run build


# -----------------------------
# Stage 3: Runtime container
# -----------------------------
FROM alpine:3.20

RUN apk add --no-cache bash jq nodejs caddy

WORKDIR /app

# Server build output
COPY --from=serverbuild /build/build /app/build
COPY --from=serverbuild /build/node_modules /app/node_modules
COPY --from=serverbuild /build/other /app/other

# UI build output
COPY --from=uibuild /ui/dist /app/ui

# Caddy config
COPY Caddyfile /etc/caddy/Caddyfile

# run.sh
COPY run.sh /app/run.sh
RUN chmod +x /app/run.sh

CMD ["/app/run.sh"]