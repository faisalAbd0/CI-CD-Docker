FROM node:alpine

WORKDIR /usr/src/analytics-serves
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["node", "index.js"]