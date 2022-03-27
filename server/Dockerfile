FROM node:16

WORKDIR /usr

COPY package*.json ./
COPY yarn.lock ./

RUN yarn

# Bundle app source
COPY . .

ENV NODE_ENV production

EXPOSE 8080
CMD [ "node", "src/index.js" ]