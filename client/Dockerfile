FROM node:14.16.0-alpine AS build-image
COPY package.json package-lock.json ./
RUN npm ci && mkdir /ng-app && mv ./node_modules ./ng-app
WORKDIR /ng-app
COPY . .
RUN npm run build:prod

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build-image /ng-app/dist/puppygram-client /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
