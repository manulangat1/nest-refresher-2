FROM node:18-alpine As development

WORKDIR /app 

COPY package*.json ./

RUN npm install --force

COPY . . 

# RUN npm run start:dev


# CMD [ "node", "dist/main.js" ]