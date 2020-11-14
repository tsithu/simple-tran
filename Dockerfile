FROM node:14.12-alpine

WORKDIR /app

RUN apk update && apk upgrade

COPY package*.json ./

COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

ENV PORT=2020

EXPOSE 2020

CMD ["yarn", "start"]
