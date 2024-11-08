FROM node:alpine as base
WORKDIR /home/node/app/frontend
COPY package*.json ./
RUN yarn
COPY . .