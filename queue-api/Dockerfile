FROM node:19-slim
EXPOSE 3006
RUN mkdir /usr/src/queue-api
WORKDIR /usr/src/queue-api
RUN chmod -R 777 /usr/src/queue-api
COPY  ./node_modules node_modules
COPY  ./package.json package.json
COPY  ./src src
COPY  ./tsconfig.json tsconfig.json
COPY  ./dev.env dev.env
COPY ./dist dist
ENV PORT=3006
ENV OPARATION_SERVICE_PORT=3006
ENV RABITMQ_URL=amqps://oejnrppx:TsudzYCPK53Al0hjShN4jhQoaQdEmrVU@crow.rmq.cloudamqp.com/oejnrppx
ENV QUEUE=main
ENV MONGODB_URL=mongodb+srv://local:local@cluster0.aarpgzc.mongodb.net/?retryWrites=true&w=majority
USER node

CMD ["node", "./dist/index.js"]
