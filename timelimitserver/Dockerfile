FROM alpine:3.20

# Zorg voor een minimale, nette basis
RUN apk add --no-cache bash jq

# Versie wordt via build-arg binnengebracht en als env gezet
ARG ADDON_VERSION
ENV ADDON_VERSION=${ADDON_VERSION}

# Werkdirectory
WORKDIR /app

# Kopieer run-script
COPY run.sh /app/run.sh
RUN chmod +x /app/run.sh

# Startscript
CMD ["/app/run.sh"]
