FROM node:22-alpine

WORKDIR /app

# Dependencies voor build
RUN apk add --no-cache git

# Clone TimeLimit server
RUN git clone https://codeberg.org/timelimit/timelimit-server.git .

# Installeer dependencies en build
RUN npm install
RUN npm run build

# Verwijder dev dependencies
RUN npm prune --production

# Expose port
EXPOSE 8080

# Start de server
CMD ["node", "build/index.js"]
