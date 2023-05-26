FROM nginx:stable-alpine
WORKDIR /app
COPY /build /usr/share/nginx/html
COPY /nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000