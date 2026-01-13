FROM node:22-alpine

WORKDIR /app

RUN apk add --no-cache git

# Clone backend
RUN git clone https://codeberg.org/timelimit/timelimit-server.git .

# Install dependencies
RUN npm install

# Build TypeScript → JavaScript
RUN npm run build

# Remove dev dependencies
RUN npm prune --production

# Copy start script
COPY run.sh /app/run.sh
RUN chmod +x /app/run.sh

EXPOSE 8080

CMD ["/app/run.sh"]
