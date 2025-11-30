#!/bin/bash
set -e

# Ensure storage link exists
if [ ! -L "/var/www/html/public/storage" ]; then
    echo "Creating storage symlink..."
    php artisan storage:link
fi

# Create placeholder images if missing
if [ ! -f "/var/www/html/storage/app/public/headers/default.jpg" ]; then
    echo "Creating placeholder images..."
    mkdir -p /var/www/html/storage/app/public/headers
    echo 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==' | base64 -d > /var/www/html/storage/app/public/headers/default.jpg
fi

if [ ! -f "/var/www/html/storage/app/public/no-preview.png" ]; then
    echo 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==' | base64 -d > /var/www/html/storage/app/public/no-preview.png
fi

# Fix permissions
chown -R www-data:www-data /var/www/html/storage

# Execute the original entrypoint
exec "$@"
