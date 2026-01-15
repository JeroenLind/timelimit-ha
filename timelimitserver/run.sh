#!/bin/sh
# Dit script houdt de container actief en laat zien dat hij echt draait.
# De teller loopt elke minuut op zodat je in de Home Assistant log kunt zien
# dat de container niet vastloopt of crasht.

echo "TimeLimit test add-on container is starting..."

# Startwaarde van de teller
counter=0

# Oneindige loop
while true; do
  counter=$((counter + 1))   # Verhoog de teller met 1
  echo "TimeLimit test add-on heartbeat: $counter"  # Log de huidige waarde
  sleep 60                    # Wacht 60 seconden
done