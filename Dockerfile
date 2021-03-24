FROM node

WORKDIR /app

ENV PORT=4000


COPY package.json package-lock.json ./

RUN npm ci

COPY . .

EXPOSE $PORT

CMD [ "npm", "start" ]
