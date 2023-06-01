FROM nginx:1.15.0
ADD dist/ /usr/share/nginx/html
EXPOSE 80