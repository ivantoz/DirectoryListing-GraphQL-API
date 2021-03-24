FROM node:alpine

WORKDIR /app

ENV PORT=4000

COPY package.json ./


RUN npm install pm2 -g

RUN npm install

COPY . .

EXPOSE $PORT

CMD [ "pm2-runtime", "npm", "--", "start" ]
