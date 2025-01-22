FROM node:alpine

WORKDIR /animage_server

COPY package*.json ./
RUN npm install --silent

COPY . ./

EXPOSE 3000