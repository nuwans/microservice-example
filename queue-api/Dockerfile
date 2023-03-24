FROM node:11-slim
EXPOSE 3006
RUN mkdir /usr/src/queue-api
WORKDIR /usr/src/queue-api
RUN chmod -R 777 /usr/src/queue-api
COPY  ./node_modules node_modules
COPY  ./package.json package.json
COPY  ./src src
COPY  ./tsconfig.json tsconfig.json
COPY  ./dist dist
RUN chmod -R 777 /usr/src/queue-api/dist
ENV PORT=3006
USER node
RUN yarn build
CMD ["node", "./dist/index.js"]
