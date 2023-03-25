import express, { Express, Request, Response } from "express";
import amqp, { Channel, ConsumeMessage } from "amqplib/callback_api";
import saveEmailRecord from "./services/saveEmail";
import sendEmail from "./services/sendEmail";
const app: Express = express();
const { QUEUE = "main", RABITMQ_URL = "amqp://localhost" } = process.env;
amqp.connect(RABITMQ_URL, (err, conn) => {
  if (err) {
    console.error("[AMQP]", err.message);
    return setTimeout(() => {
      process.exit(1);
    }, 1000);
  }

  conn.createChannel((err, ch) => {
    if (err) {
      console.error("[AMQP]", err.message);
      return setTimeout(() => {
        process.exit(1);
      }, 1000);
    }

    ch.assertQueue(QUEUE, { durable: true });
    console.log(
      "[AMQP] Waiting for messages in %s. To exit press CTRL+C",
      QUEUE
    );

    // Set up a consumer to listen for messages on the queue
    ch.consume(
      QUEUE,
      async (msg) => {
        if (msg) {
          const messageContent = msg?.content.toString();
          const { timestamp, email, content } = JSON.parse(messageContent);
          //Send an email
          const e = await sendEmail({ id: timestamp, email, content });
          if (e.accepted.length > 0) {
            //Save in database
            //We can add another queue if we want
            const emailRecord = await saveEmailRecord({
              id: timestamp,
              email,
              content,
              deliverd: true,
            });
            if (emailRecord.id) {
              ch.ack(msg);
            }
          }
        }
      },
      { noAck: false }
    );
  });
});

app.get("/", (req: Request, res: Response) => {
  let response = {
    statusCode: 200,
    api: "Queue Api",
  };
  return res.status(200).json(response);
});

export default app;
