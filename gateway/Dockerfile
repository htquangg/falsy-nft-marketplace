FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json .meshrc.yaml /usr/src/app/
RUN npm install
CMD if [ -f "init.sh" ]; then sh init.sh; fi && npm run start
