#!/usr/bin/env bash

# fork mongod process and make logs silence
mongod --smallfiles --logpath=/dev/null --fork

# run server with forever inside, see
npm start -- --sourceDir /usr/app/server

# finally run nginx proxy
nginx -g daemon off;
