#   React build stage
FROM node:15-alpine3.10 as react-build

WORKDIR /app

COPY package.json /app/

RUN yarn install

COPY ./ /app/

RUN npm run build

#   Nginx server
FROM nginx:1.15

COPY --from=react-build /app/build/ /usr/share/nginx/html

# Copy the default nginx.conf provided by tiangolo/node-frontend
COPY config/nginx.conf /etc/nginx/conf.d/default.conf