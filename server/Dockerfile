FROM node:8-slim

RUN mkdir -p /app
WORKDIR app

RUN ls -la /app

COPY .env index.js /app/

EXPOSE 3030

CMD ["node", "index.js"]
