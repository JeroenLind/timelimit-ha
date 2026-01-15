#!/bin/sh
# Dit script houdt de container actief en laat via een oplopende teller zien
# dat de add-on daadwerkelijk draait. De heartbeat staat op 10 seconden zodat
# je tijdens het testen snel feedback hebt zonder de log te overspoelen.

echo "TimeLimit test add-on container is starting..."

# Startwaarde van de teller
counter=0

# Oneindige loop
while true; do
  counter=$((counter + 1))   # Verhoog de teller met 1
  echo "TimeLimit test add-on heartbeat: $counter"  # Log de huidige waarde
  sleep 10                    # Wacht 10 seconden voor de volgende heartbeat
done
