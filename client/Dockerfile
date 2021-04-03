FROM node:14.16.0-alpine AS build-image
COPY package.json package-lock.json ./
RUN npm ci && mkdir /ng-app && mv ./node_modules ./ng-app
WORKDIR /ng-app
COPY . .
RUN npm run build:prod

FROM nginx:alpine
COPY nginx.template.conf /etc/nginx/conf.d/default.conf.template
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build-image /ng-app/dist/client /usr/share/nginx/html

CMD /bin/sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'
