FROM node:alpine
WORKDIR /client/src/livenex-client
COPY package*.json .
RUN npm ci
COPY  . .
CMD ["npm","start"]