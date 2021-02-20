FROM node:14.15.5

RUN mkdir /app
WORKDIR /app

COPY package.json .
RUN yarn

COPY . .

EXPOSE 5001

CMD ["yarn", "start"]
