FROM node:20.9.0-alpine3.17

WORKDIR /app
COPY package.json package-lock.json ./

RUN npm install
COPY . .

EXPOSE 3000
CMD ["sh", "-c", "node server.js 2>/dev/null"]
