FROM node:8-slim

ENV NODE_ENV development
ENV SERVER_PORT 3030

RUN mkdir -p /app
WORKDIR app

COPY package-prod.json ./package.json
RUN npm install

COPY .env index.js /app/

EXPOSE 3030

CMD ["node", "index.js"]
