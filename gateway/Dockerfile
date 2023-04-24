FROM node:18-alpine
WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN yarn install
CMD if [ -f "init.sh" ]; then sh init.sh; fi && yarn start
