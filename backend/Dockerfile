FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# ✅ CRITICAL: Create the storage directory inside the container space explicitly
RUN mkdir -p uploads

EXPOSE 5000

CMD ["node", "server.js"]