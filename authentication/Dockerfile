FROM node:alpine
WORKDIR /usr/src/authentication
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 6000
CMD ["npm" , "start"]