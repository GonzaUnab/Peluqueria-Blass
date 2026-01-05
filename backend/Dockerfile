FROM node:20-alpine

WORKDIR /app

# Copiar package.json primero (para caché)
COPY package*.json ./
RUN npm install

# Copiar el resto
COPY . .

# Exponer puerto
EXPOSE 3001

# Comando de inicio
CMD ["npm", "run", "dev"]