FROM node:18.16
WORKDIR /
COPY . .
RUN npm install
EXPOSE 8000
CMD ["npm", "run", "start"]