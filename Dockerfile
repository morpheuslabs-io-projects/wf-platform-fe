FROM node:18-alpine as builder

WORKDIR /app

COPY . .

RUN yarn install

RUN yarn build

RUN yarn

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app .

CMD ["yarn","dev"]