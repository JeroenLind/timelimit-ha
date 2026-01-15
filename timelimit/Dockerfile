FROM node:21-alpine

WORKDIR /app

RUN apk add --no-cache git sqlite

# Clone de echte server
RUN git clone https://github.com/timelimit/timelimit-server.git .

# Installeer en build
RUN npm ci
RUN npm run build

# Verwijder dev dependencies
RUN rm -rf node_modules
RUN npm ci --omit=dev

# Voeg je run.sh toe
COPY run.sh /app/run.sh
RUN chmod +x /app/run.sh

EXPOSE 8080
CMD ["/app/run.sh"]
