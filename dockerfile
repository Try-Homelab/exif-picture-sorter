FROM node:18.1.0-alpine

ENV FOLDER_NAME="" \
    FILE_NAME=""

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "node", "src/index.js"]