FROM nginx:alpine

# Copy template files to /etc/nginx/templates/
COPY services/nginx/*.template /etc/nginx/templates/

# Process templates and place outputs correctly
RUN mkdir -p /etc/nginx/conf.d && \
    # nginx will auto-process templates in /etc/nginx/templates/ via docker-entrypoint.sh
    echo 'RUN statement for setup'

HEALTHCHECK CMD curl -f http://localhost/

EXPOSE 80 

CMD ["nginx", "-g", "daemon off;"]

# doc says:
# include -g daemon off in the CMD in order for nginx to stay in the foreground, so that Docker can track the process properly 
# otherwise your container will stop immediately after starting
