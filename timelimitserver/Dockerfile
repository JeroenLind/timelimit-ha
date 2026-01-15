# Kleine basisimage om de container licht te houden
FROM alpine:3.20

# Metadata zodat je in GHCR en tooling ziet wat dit is
LABEL maintainer="jeroenlind" \
      description="Infrastructure-only test image for Home Assistant TimeLimit server add-on"

# Werkdirectory voor de add-on
WORKDIR /app

# Kopieer het run-script naar de container
COPY run.sh /app/run.sh

# Maak het script uitvoerbaar
RUN chmod +x /app/run.sh

# Standaard commando: start het run-script
CMD ["/app/run.sh"]