FROM node:12.8 AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
COPY tsconfig.json ./
COPY src ./src
COPY public ./public
RUN yarn build

FROM nginx:latest
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
