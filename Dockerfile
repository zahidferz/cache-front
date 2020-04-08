FROM node:alpine as build-stage

WORKDIR /app
# Copying the package json in order to avoid rerun package installation
COPY package*.json ./

# Install all dependencies for this project
RUN npm install
# Copy all contents of this app to the container in /appdoc
COPY . .
# Run build script found in package.json "build"
RUN npm run build

FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
