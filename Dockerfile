FROM node:22-alpine

WORKDIR /app

# Dependencies voor build
RUN apk add --no-cache git

# Clone TimeLimit server
RUN git clone https://codeberg.org/timelimit/timelimit-server.git .

# Installeer dependencies en build
RUN npm install && npm run build && npm prune --production

# Data directory
RUN mkdir -p /data

ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

CMD ["node", "dist/server.js"]
