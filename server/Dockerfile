FROM node:8-slim

ENV NODE_ENV production
ENV SERVER_PORT 3035

RUN mkdir -p /app
WORKDIR app

COPY package-prod.json ./package.json
RUN npm install

COPY .env index.js /app/

EXPOSE 3035

CMD ["node", "index.js"]
