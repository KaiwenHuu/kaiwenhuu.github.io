---
title: "Docker"
date: "2025-01-11"
slug: "docker"
---

## Reviewing Basics

Create `Dockerfile` in directory. The `Dockerfile` should look something like [this](https://github.com/docker/welcome-to-docker/blob/main/Dockerfile)

```
# Start your image with a node base image. Images can be found in https://hub.docker.com/
FROM node:18-alpine

# The /app directory should act as the main application directory of the image.
WORKDIR /app

# Copying directories have the following format
# COPY {local_directory} {image_directory}

# Copy the app package and package-lock.json file.
COPY package*.json ./

# Copy local directories to the current local directory of our docker image (/app)
COPY ./src ./src
COPY ./public ./public

# Install node packages, install serve, build the app, and remove dependencies at the end
RUN npm install \
    && npm install -g serve \
    && npm run build \
    && rm -fr node_modules

# Expose port
EXPOSE 3000

# There should only be one CMD in a Dockerfile
# Start the app using serve command
CMD [ "serve", "-s", "build" ]
```

Then run the following commands

```
docker build -t {image_name} . # builds a docker image
docker run -d -p {local_port}:{image_port} --name {container_name}
```

Another way to start a docker container:

```
docker init
docker compose up
```

http://localhost:{local_port}/

`docker ps` shows all the docker containers that are running

`docker stop {container_id}` to stop a container

`docker rm {container_id}` to remove a container
