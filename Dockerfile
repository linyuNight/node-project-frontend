FROM nginx:1.15.0
ADD dist/ /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80