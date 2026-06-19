FROM node:20-alpine

WORKDIR /usr/src/app

# Copiar archivos de dependencias e instalar
COPY package*.json ./
RUN npm install --production

# Copiar el resto del código
COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
