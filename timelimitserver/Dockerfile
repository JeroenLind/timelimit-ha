# -----------------------------
# Stage 1: Build TimeLimit server
# -----------------------------
FROM node:20-alpine AS build

WORKDIR /build

RUN apk add --no-cache git \
 && git clone https://codeberg.org/timelimit/timelimit-server.git .

RUN npm ci
RUN npm run build


# -----------------------------
# Stage 2: Runtime container
# -----------------------------
FROM alpine:3.20

RUN apk add --no-cache bash jq nodejs

ARG ADDON_VERSION
ENV ADDON_VERSION=${ADDON_VERSION}

WORKDIR /app

# Kopieer de juiste build output
COPY --from=build /build/build ./build
COPY --from=build /build/node_modules ./node_modules

COPY run.sh /app/run.sh
RUN chmod +x /app/run.sh

CMD ["/app/run.sh"]
