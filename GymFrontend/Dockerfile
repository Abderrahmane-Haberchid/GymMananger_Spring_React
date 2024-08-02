# Stage 1: Building react app from node image

FROM node:19.5.0-alpine as build

WORKDIR /app

ENV NODE_OPTIONS=--max_old_space_size=2048

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build 

# Stage 2: Building nginx image and copying react app above 

FROM nginx:latest

WORKDIR /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY --from=build /app/build .

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]