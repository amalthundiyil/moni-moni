FROM node:16-alpine AS client 
WORKDIR /client
COPY . .

ARG REACT_APP_HOST
ARG REACT_APP_PORT
ARG REACT_APP_SCHEME

ENV REACT_APP_HOST=${REACT_APP_HOST}
ENV REACT_APP_PORT=${REACT_APP_PORT}

RUN npm install && npm run build

FROM nginx:1.22.0-alpine

ARG FRONTEND_PORT
ENV PORT=${FRONTEND_PORT}

RUN apk add --no-cache bash

COPY --from=client /client/build/ /var/www/frontend
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'
