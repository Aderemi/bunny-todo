FROM node:10.15.0-alpine

EXPOSE 3001

WORKDIR /app

COPY package.json /app
COPY package-lock.json /app

RUN npm install && npm install -g knex mocha

COPY . /app

RUN chmod +x ./docker/start.sh

CMD ./docker/start.sh
