FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./


RUN npm install

RUN npm install -g knex

COPY . .

EXPOSE 5000



CMD [ "node","index.js" ]

