FROM node:18-alpine
WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN npm install @graphql-mesh/cli @graphql-mesh/graphql @graphql-mesh/openapi @graphql-mesh/runtime graphql
CMD if [ -f "init.sh" ]; then sh init.sh; fi && npm run start
