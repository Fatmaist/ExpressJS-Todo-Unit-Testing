From node:lts-alpine3.17

WORKDIR /HomeworkExpressJS_Unit_Testing_Fatma

COPY package*.json ./

COPY . .

EXPOSE 8090

CMD ["npm", "run", "start"]