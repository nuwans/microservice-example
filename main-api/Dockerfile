FROM node:11-slim
EXPOSE 3005
RUN mkdir /usr/src/main-api
WORKDIR /usr/src/main-api
RUN chmod -R 777 /usr/src/main-api
COPY  ./node_modules node_modules

COPY  ./package.json package.json
COPY  ./src src
COPY  ./tsconfig.json tsconfig.json
COPY  ./dist dist
RUN chmod -R 777 /usr/src/main-api/dist
ENV PORT=3005
USER node
RUN yarn build
CMD ["node", "./dist/index.js"]
