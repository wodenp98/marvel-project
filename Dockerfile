FROM node:19-alpine

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run build

COPY .next ./.next

CMD ["npm", "run", "dev"]
