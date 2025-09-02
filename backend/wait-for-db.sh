#!/bin/sh

set -e

host="$1"
shift
cmd="$@"

echo "Waiting for database at $host..."

until pg_isready -h "$host" -p 5432; do
  echo "Database is unavailable - sleeping"
  sleep 2
done

echo "Database is up - executing command"
exec $cmd
