
import amqp, { Channel, Connection } from "amqplib/callback_api";
export const rabitMqReceiver = async (): Promise<Channel> => {
    const amqpServer = 'amqp://localhost';
    return new Promise<Channel>((resolve, reject) => {
      amqp.connect(amqpServer, async (err: any, connection: Connection) => {
        if (err) {
          reject(err);
          return;
        }
        connection.createChannel((err: any, ch: Channel) => {
          if (err) {
            reject(err);
            return;
          }
          console.log("producer rabbitMQ: connected");
          resolve(ch);
        });
      });
    });
  };