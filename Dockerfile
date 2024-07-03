FROM node:18.14.0

WORKDIR /usr/src/app/mobility-broker

COPY package*.json ./

RUN npm install

COPY . .

COPY entrypoint.sh /usr/src/app/mobility-broker/entrypoint.sh
RUN chmod +x /usr/src/app/mobility-broker/entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["/usr/src/app/mobility-broker/entrypoint.sh"]
CMD ["npm", "start"]