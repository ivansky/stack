FROM node:8-slim

WORKDIR /app

ENV NODE_ENV development

COPY package.json package-lock.json /app/
RUN npm install

COPY angular.json tsconfig.json tslint.json /app/

EXPOSE 3031

CMD ["npm", "start"]
