FROM node:alpine
WORKDIR /usr/src/enter-data-app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD ["npm", "start"]

