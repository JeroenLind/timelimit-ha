FROM python:3.12-slim

WORKDIR /app

# Install git
RUN apt-get update && apt-get install -y git && apt-get clean

# Clone TimeLimit server
RUN git clone https://codeberg.org/timelimit/timelimit-server.git .

# Install Python dependencies
RUN pip install --no-cache-dir .

# Expose port
EXPOSE 8080

# Start the server
CMD ["uvicorn", "timelimit_server.main:app", "--host", "0.0.0.0", "--port", "8080"]
