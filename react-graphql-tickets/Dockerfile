# Docker Image which is used as foundation to create
# a custom Docker Image with this Dockerfile
FROM node:lts-alpine

# A directory within the virtualized Docker environment
# Becomes more relevant when using Docker Compose later
WORKDIR /react

ENV PATH /react/node_modules/.bin:$PATH

# Copies package.json and yarn.lock to Docker environment
COPY package.json yarn.lock /react/

# Installs all packages
RUN yarn install

# Copies everything over to Docker environment
COPY . /react/

# Uses port which is used by the actual application
EXPOSE 3000

# polling instead of filesystem notifications
ENV CHOKIDAR_USEPOLLING true

# Finally runs the application
CMD [ "yarn", "start" ]
