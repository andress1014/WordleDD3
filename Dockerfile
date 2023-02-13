FROM node:18.0

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 3001


CMD npm run dev


