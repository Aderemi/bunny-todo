FROM node:10.15.0-alpine
EXPOSE 3000

WORKDIR /app

COPY package.json /app
COPY package-lock.json /app

RUN npm install

COPY . /app

RUN chmod +x ./docker/start.sh

CMD ./docker/start.sh
