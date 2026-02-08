# -----------------------------
# Stage 1: Build TimeLimit server (arm64 native)
# -----------------------------
FROM node:20-alpine AS serverbuild

WORKDIR /build

RUN apk add --no-cache git
RUN git clone --depth 1 https://codeberg.org/timelimit/timelimit-server.git .

# Copy custom patches over the cloned code
COPY patches/ /build/

RUN npm ci
RUN npm run build


# -----------------------------
# Stage 2: Runtime container
# -----------------------------
FROM alpine:3.20

# <<< NIEUW
ARG ADDON_VERSION

RUN apk add --no-cache bash jq nodejs caddy

WORKDIR /app

# <<< NIEUW: versie opslaan in image
RUN echo "$ADDON_VERSION" > /app/version.txt

# Server build output
COPY --from=serverbuild /build/build /app/build
COPY --from=serverbuild /build/node_modules /app/node_modules
COPY --from=serverbuild /build/other /app/other

# UI output (artifact)
COPY ui-dist /app/ui

# Caddy config
COPY Caddyfile /etc/caddy/Caddyfile

# run.sh
COPY run.sh /app/run.sh
RUN chmod +x /app/run.sh

CMD ["/app/run.sh"]