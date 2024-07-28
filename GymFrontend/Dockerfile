# Stage 1: Building react app from node image

FROM node:22-alpine as build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build 

# Stage 2: Building nginx image and copying react app above 

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/build .

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]