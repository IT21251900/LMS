FROM node:18-alpine
WORKDIR /src
COPY package*.json ./
COPY . .
RUN npm install
CMD ["npm", "run", "dev"]
EXPOSE 4203