FROM node:16-alpine AS landing-build
WORKDIR /landing
COPY landing/ .

ENV REACT_APP_HOST localhost
ENV REACT_APP_PORT 80

RUN npm install && npm run build

# FROM node:16-alpine AS dashboard-build
# WORKDIR /dashboard
# COPY dashboard/ .
# RUN npm install && npm run build

FROM nginx:1.21.6-alpine
COPY --from=landing-build /landing/build/ /var/www/frontend
COPY ./nginx.conf /etc/nginx/conf.d/default.conf