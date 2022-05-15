# base image
FROM postgres:14.2-alpine

RUN apk add --no-cache bash

# run create.sql on init
ADD create.sql /docker-entrypoint-initdb.d