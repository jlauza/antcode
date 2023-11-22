# Stage 1: Building the code
FROM node:latest as build

WORKDIR /app

COPY package*.json yarn.lock* ./

RUN yarn install

COPY . .

RUN yarn build

# Stage 2: Run the server
FROM node:latest

WORKDIR /app

COPY --from=build /app/next.config.js ./
COPY --from=build /app/public ./public
COPY --from=build /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3030

CMD ["yarn", "start"]
