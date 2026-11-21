# -----------------------------
# Stage 1: Build TimeLimit server (arm64 native)
# -----------------------------
FROM node:24-alpine AS serverbuild

WORKDIR /build

RUN apk add --no-cache git
# Upstream vastgezet op een bekende commit (lokaal gecontroleerd: b0b50389, 9 nov 2026).
# Zet UPSTREAM_REF op "master" om de nieuwste versie te proberen; als de patches
# dan niet meer passen faalt de build op de stap "git apply" met een duidelijke fout.
ARG UPSTREAM_REF=b0b50389be29c78144b60d9e1e1187fa9ce3d34d
RUN git clone https://codeberg.org/timelimit/timelimit-server.git . \
 && git checkout "$UPSTREAM_REF" \
 && git log -1 --format='Upstream at %H (%cI)'

# Eigen aanpassingen als diff-patches (geen hele bestanden meer overschrijven)
COPY patches/ /patches/
RUN git apply --verbose /patches/*.patch

RUN npm ci
RUN npm run build
# dev-dependencies weghalen (kleiner image, zoals de upstream Dockerfile doet)
RUN npm prune --omit=dev


# -----------------------------
# Stage 2: Runtime container
# -----------------------------
FROM node:24-alpine

# <<< NIEUW
ARG ADDON_VERSION

# De server heeft PostgreSQL nodig; die draait in deze container (zie run.sh)
RUN apk add --no-cache bash jq caddy postgresql su-exec

WORKDIR /app

# <<< NIEUW: versie opslaan in image
RUN echo "$ADDON_VERSION" > /app/version.txt

# Server build output
COPY --from=serverbuild /build/build /app/build
COPY --from=serverbuild /build/package.json /app/package.json
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