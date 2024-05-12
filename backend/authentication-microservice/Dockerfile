FROM node:18-alpine
WORKDIR /src
COPY package*.json ./
RUN npm install
CMD ["nodemon", "src/index.js"]
EXPOSE 4201