FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.*.json ./
COPY tsconfig*.json ./

RUN npm install

COPY . .

ENV PATH /app/node_modules/.bin:$PATH

RUN chmod +x /app/node_modules/.bin/vite

# RUN npm run build

EXPOSE 5173

CMD [ "npm", "run", "dev" ]