FROM node:alpine as base
WORKDIR /home/node/app/backend
COPY package*.json yarn.lock tsconfig.json ./
RUN yarn install --frozen-lockfile
COPY . .