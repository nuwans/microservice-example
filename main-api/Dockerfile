FROM node:19-slim
EXPOSE 3005
RUN mkdir /usr/src/main-api
WORKDIR /usr/src/main-api
RUN chmod -R 777 /usr/src/main-api
COPY  ./node_modules node_modules
COPY  ./package.json package.json
COPY  ./src src
COPY  ./tsconfig.json tsconfig.json
COPY  ./dev.env .dev.env
COPY ./dist dist
ENV PORT=3005
ENV OPARATION_SERVICE_PORT=3006
ENV RABITMQ_URL=amqps://oejnrppx:TsudzYCPK53Al0hjShN4jhQoaQdEmrVU@crow.rmq.cloudamqp.com/oejnrppx
ENV QUEUE=main
USER node

CMD ["node", "./dist/index.js"]
