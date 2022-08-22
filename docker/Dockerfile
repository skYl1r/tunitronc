FROM node:14-alpine as builder
RUN apk add git
WORKDIR /opt
COPY . .
RUN npm install
RUN npm run build --prod

FROM nginx:1.18-alpine
COPY --from=builder /opt/dist/MySite /usr/share/nginx/html