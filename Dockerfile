FROM node:17

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY  . .

RUN npm run start

EXPOSE 8005

CMD ["node","start/app.js"]