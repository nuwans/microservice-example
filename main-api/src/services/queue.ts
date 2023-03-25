import amqp, { Channel, Connection } from "amqplib/callback_api";
const {
  RABITMQ_URL = "amqp://localhost",
} = process.env;
class Queue {
  private readonly amqpServer: string;
  private connection?: Connection;
  private channel?: Channel;
  constructor() {
    this.amqpServer = RABITMQ_URL;
  }

  private connect(): Promise<Channel> {
    return new Promise((resolve, reject) => {
      if (this.channel) {
        resolve(this.channel);
      } else {
        amqp.connect(this.amqpServer, (err, connection) => {
          if (err) {
            reject(err);
          }
          connection.createChannel((err, channel) => {
            if (err) {
              reject(err);
            }
            this.connection = connection;
            this.channel = channel;
            resolve(channel);
          });
        });
      }
    });
  }
  public async addToQueue(queueName: string, message: string): Promise<boolean> {
    const channel = await this.connect();
    channel.assertQueue(queueName);
    return await channel.sendToQueue(queueName, Buffer.from(message));
    
    
  }
  public close(): void {
    if (this.connection) {
      this.connection.close();
    }
  }
}

const QueueConnection = new Queue();
export default QueueConnection;
