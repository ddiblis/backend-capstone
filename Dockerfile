FROM node:lts-alpine

WORKDIR /src

COPY . .

CMD npm run start