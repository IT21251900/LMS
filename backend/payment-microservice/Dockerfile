FROM node:18-alpine
WORKDIR /src
COPY package*.json ./
RUN npm install
COPY . .
CMD ["nodemon", "src/index.js"]
EXPOSE 4204