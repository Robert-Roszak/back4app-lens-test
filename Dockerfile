FROM node:18
WORKDIR /
COPY . .
RUN npm install
RUN npm run start
EXPOSE 3000