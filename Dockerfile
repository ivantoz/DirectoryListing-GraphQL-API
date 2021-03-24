FROM node:alpine

WORKDIR /app

ENV PORT=4000

COPY package.json ./


RUN npm install

COPY . .

EXPOSE $PORT

CMD [ "node", "app/index.js"]
