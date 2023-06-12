# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:14.17.0 as build

# Set the working directory
WORKDIR /usr/local/app

# Add the source code to app
COPY ./ /usr/local/app/

# Install all the dependencies
RUN npm install

# Generate the build of the application
RUN npm run build

# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:1.21.0

COPY --from=build /usr/local/app/dist/frontend-bsc-thesis /usr/share/nginx/html

EXPOSE 7001
#D:/Projekty/Engineering-Thesis/Frontend-BSc-Thesis/Dockerfile

# Etap 1: Budowanie aplikacji
#FROM node:14.17.0 AS build
#WORKDIR /app
#COPY package*.json ./
#RUN npm install
#COPY . .
#RUN npm run build
#
## Etap 2: Uruchamianie aplikacji
#FROM nginx:1.21.0
#COPY --from=build /app/dist/frontend-bsc-thesis /usr/share/nginx/html
#EXPOSE 7001
#CMD ["nginx", "-g", "daemon off;"]
