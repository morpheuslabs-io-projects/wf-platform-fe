FROM node:18-alpine as builder
WORKDIR /app
COPY . .

RUN yarn

RUN yarn build

FROM node:18-alpine

WORKDIR /app

RUN npm install pm2 -g

COPY --from=builder /app .

CMD ["pm2-runtime", "start", "ecosystem.config.cjs"]
