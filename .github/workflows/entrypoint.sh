#!/bin/sh
# start
printf "prepare config for env: ${ENV}\n"
if [ ${ENV} = "prod" ]; then
  cp -r /usr/share/nginx/dist-prod/* /usr/share/nginx/html
elif [ ${ENV} = "test" ]; then
  cp -r /usr/share/nginx/dist-test/* /usr/share/nginx/html
else
  cp -r /usr/share/nginx/dist-test/* /usr/share/nginx/html
fi
# exec CMD
exec "$@"
