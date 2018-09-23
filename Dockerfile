FROM node:8-slim

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY angular.json tsconfig.json tslint.json ./

EXPOSE 3031

CMD ["npm", "start"]
