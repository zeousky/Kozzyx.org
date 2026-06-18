#!/bin/sh
# Railway assigns a port via $PORT; nginx can't read env vars in `listen`, so
# substitute it into the config before starting. Default 8080 for local runs.
set -e
: "${PORT:=8080}"
sed -i "s/__PORT__/${PORT}/g" /etc/nginx/conf.d/default.conf
exec nginx -g 'daemon off;'