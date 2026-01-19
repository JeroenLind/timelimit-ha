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

RUN echo "===== DEBUG: /build/src =====" && ls -al /build/src
RUN echo "===== DEBUG: /build/src/api =====" && ls -al /build/src/api
RUN echo "===== DEBUG: /build/src/routes =====" && ls -al /build/src/routes || echo "routes missing"
RUN echo "===== DEBUG: /build/src/server* =====" && ls -al /build/src/server* || echo "server.ts missing"

RUN echo "===== DEBUG: package.json =====" && head -n 40 /build/package.json

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

# Debug: laat zien wat er in /app staat
RUN echo "===== DEBUG: inhoud van /app =====" \
 && ls -R /app

# run.sh kopiëren
COPY run.sh /app/run.sh
RUN chmod +x /app/run.sh

CMD ["/app/run.sh"]