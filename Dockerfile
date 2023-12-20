FROM node:18-alpine as builder
WORKDIR /app
COPY . .
RUN yarn

WORKDIR /app
RUN cp .env.prod .env && yarn build && mv dist dist-prod
RUN cp .env.test .env && yarn build && mv dist dist-test

# -- RELEASE --
FROM nginx:stable-alpine as release

WORKDIR /app
COPY --from=builder /app/dist-prod /usr/share/nginx/dist-prod
COPY --from=builder /app/dist-test /usr/share/nginx/dist-test
COPY --from=builder /app/.github/workflows/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/.github/workflows/entrypoint.sh /app/entrypoint.sh
RUN chmod +x entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/app/entrypoint.sh"]
CMD ["/bin/sh", "-c", "nginx -g \"daemon off;\""]
