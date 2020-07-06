FROM nginx

# install the js module (on the official nginx image it's already there, but adding
# this step for the demonstration)
RUN apt-get install nginx-module-njs

COPY html /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY maskQueryParams.js /etc/nginx/