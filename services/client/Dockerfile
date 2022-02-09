FROM node:16-alpine AS landing-build
WORKDIR /landing
COPY landing/ .

ARG REACT_APP_HOST
ARG REACT_APP_PORT

ENV REACT_APP_HOST=${REACT_APP_HOST}
ENV REACT_APP_PORT=${REACT_APP_PORT}

RUN npm install && npm run build

# FROM node:16-alpine AS dashboard-build
# WORKDIR /dashboard
# COPY dashboard/ .
# RUN npm install && npm run build

FROM nginx:1.21.6-alpine
COPY --from=landing-build /landing/build/ /var/www/frontend
COPY ./nginx.conf /etc/nginx/conf.d/default.conf