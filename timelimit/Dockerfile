FROM node:22-alpine

WORKDIR /app

# Install required system packages
RUN apk add --no-cache git sqlite

# Clone backend
RUN git clone https://codeberg.org/timelimit/timelimit-server.git .

# Install backend dependencies
RUN npm install

# Install bcryptjs for run.sh
RUN npm install bcryptjs

# Build TypeScript → JavaScript
RUN npm run build

# Remove dev dependencies
RUN npm prune --production

# Copy start script
COPY run.sh /app/run.sh
RUN chmod +x /app/run.sh

EXPOSE 8080

CMD ["/app/run.sh"]
