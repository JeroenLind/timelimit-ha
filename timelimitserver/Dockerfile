# -----------------------------
# Stage 1: Build TimeLimit server
# -----------------------------
FROM node:20-alpine AS build

WORKDIR /build

# Haal de broncode binnen
RUN apk add --no-cache git \
 && git clone https://codeberg.org/timelimit/timelimit-server.git .

# Installeer dependencies
RUN npm ci

# Build de server (maakt /build/build aan)
RUN npm run build

# -----------------------------
# Stage 2: Runtime container
# -----------------------------
FROM alpine:3.20

# Nodige runtime dependencies
RUN apk add --no-cache bash jq nodejs

ARG ADDON_VERSION
ENV ADDON_VERSION=${ADDON_VERSION}

WORKDIR /app

# Kopieer de volledige build-output naar /app/build
COPY --from=build /build/build /app/build

# Kopieer node_modules
COPY --from=build /build/node_modules /app/node_modules

# Kopieer overige assets (mailtemplates, defaults, etc.)
COPY --from=build /build/other /app/other

# run.sh kopiëren
COPY run.sh /app/run.sh
RUN chmod +x /app/run.sh

CMD ["/app/run.sh"]