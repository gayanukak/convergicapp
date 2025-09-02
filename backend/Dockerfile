FROM python:3.12-slim

# Set working directory
WORKDIR /app

# Install PostgreSQL client and other dependencies
RUN apt-get update && \
    apt-get install -y postgresql-client && \
    rm -rf /var/lib/apt/lists/*

# Copy and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the app
COPY . .

# Make wait-for-db.sh executable
RUN chmod +x wait-for-db.sh

# Expose Django port
EXPOSE 8000

# Start Django only after Postgres is ready
CMD ["./wait-for-db.sh", "db", "python", "manage.py", "runserver", "0.0.0.0:8000", "--settings=backend_convergic.settings"]
