# Stage 1: Serve static assets using high-performance Nginx
FROM nginx:alpine

# Copy static frontend code into Nginx default delivery HTML folder
COPY . /usr/share/nginx/html

# Expose standard HTTP port inside the container
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]