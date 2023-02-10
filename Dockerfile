FROM node:18-alpine as build

LABEL maintainer="Eduardo Avila"

# Create app directory
WORKDIR /usr/src/app

COPY .yarn /usr/src/app/.yarn
# Install app dependencies
COPY .yarnrc.yml /usr/src/app/.yarnrc.yml
COPY package*.json ./
RUN yarn install

COPY . .

FROM build as start
CMD [ "yarn", "start" ]
