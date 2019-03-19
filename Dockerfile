FROM node:alpine

COPY package.json .
RUN npm install
RUN npm install gulp
RUN npm install -g gulp

COPY . .

RUN gulp serve
