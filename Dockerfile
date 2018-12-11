FROM node:boron

MAINTAINER Tobias Fink <tobias.fink@idorsia.com>

RUN npm install webpack -g

# defined in docker-compose file
ARG API_SERVER
ARG API_VERSION
ARG API_PORT

# args also used as env vars
ENV API_SERVER=${API_SERVER}
ENV API_VERSION=${API_VERSION}
ENV API_PORT=${API_PORT}

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Bundle app source
COPY package.json yarn.lock webpack* .eslintrc .babelrc /usr/src/app/
COPY ./src /usr/src/app/src

# Install app dependencies
RUN npm install -g yarn
RUN yarn install
RUN npm run build

EXPOSE 3000

ENTRYPOINT node ./dist/server.js
