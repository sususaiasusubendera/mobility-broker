FROM node:18.17.0

WORKDIR /usr/src/app/mobility-broker

COPY package*.json ./

RUN npm install -g npm@10.8.1
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]