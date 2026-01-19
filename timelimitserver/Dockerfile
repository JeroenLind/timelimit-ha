# -----------------------------
# Stage 1: Build TimeLimit server
# -----------------------------
FROM node:20-alpine AS build

WORKDIR /build

# Haal de broncode automatisch binnen
RUN apk add --no-cache git \
 && git clone https://codeberg.org/timelimit/timelimit-server.git .

# Installeer dependencies
RUN npm ci

# Build de server (maakt de map /build/build aan)
RUN npm run build


# -----------------------------
# Stage 2: Runtime container
# -----------------------------
FROM alpine:3.20

# Nodige runtime dependencies
RUN apk add --no-cache bash jq nodejs

# Versie van de add-on wordt via build-arg binnengebracht
ARG ADDON_VERSION
ENV ADDON_VERSION=${ADDON_VERSION}

WORKDIR /app

# Kopieer de gebuilde server (TypeScript output)
COPY --from=build /build/build ./build

# Kopieer node_modules (runtime dependencies)
COPY --from=build /build/node_modules ./node_modules

# Kopieer mailtemplates en andere niet-gecompileerde assets
COPY --from=build /build/other ./other

# Kopieer run-script
COPY run.sh /app/run.sh
RUN chmod +x /app/run.sh

# Start de add-on
CMD ["/app/run.sh"]