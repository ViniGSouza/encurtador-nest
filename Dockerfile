FROM node:22.11.0-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

RUN npx prisma generate

COPY . .

RUN npm run build

EXPOSE ${PORT:-3333}

CMD ["sh", "-c", "npx prisma migrate deploy && npm run start:prod"] 