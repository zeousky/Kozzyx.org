# kozzyx.org static site on Railway (pages/ flattened into nginx web root).
FROM nginx:1.27-alpine

COPY pages/  /var/www/html/
COPY assets/ /var/www/html/assets/
COPY css/    /var/www/html/css/
COPY js/     /var/www/html/js/
COPY robots.txt /var/www/html/robots.txt
COPY .well-known/ /var/www/html/.well-known/

RUN rm -f /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]