FROM node:16-alpine AS client 
WORKDIR /client
COPY . .

ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL=${REACT_APP_BACKEND_URL}

RUN npm install && npm run build

FROM nginx:1.22.0-alpine

ARG FRONTEND_PORT=3000
ENV PORT=${FRONTEND_PORT}

RUN apk add --no-cache bash

COPY --from=client /client/build/ /var/www/frontend
COPY --from=client /client/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
