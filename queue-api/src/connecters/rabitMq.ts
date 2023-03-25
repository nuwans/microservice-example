import amqp, { Channel, Connection } from "amqplib/callback_api";

const { RABITMQ_URL = "amqp://localhost" } = process.env;
export const rabbitMqReceiver = async (): Promise<Channel> => {
  return new Promise<Channel>((resolve, reject) => {
    amqp.connect(RABITMQ_URL, async (err: any, connection: Connection) => {
      if (err) {
        console.log("connection failed-------------", err);
        reject(err);
        return;
      }
      connection.createChannel((err: any, ch: Channel) => {
        if (err) {
          reject(err);
          return;
        }
        console.log("rabbitMQ: connected");
        resolve(ch);
      });
    });
  });
};
