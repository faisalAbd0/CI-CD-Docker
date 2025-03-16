FROM node:alpine
WORKDIR /usr/src/authentication
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 6000
CMD ["npm" , "start"]