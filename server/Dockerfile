FROM node:alpine
WORKDIR /server/src/livenex-server
COPY package*.json .
RUN npm ci
COPY  . .
EXPOSE 8000
EXPOSE 3100
CMD ["npm","start"]


