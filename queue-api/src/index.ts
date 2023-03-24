import express, { Express, Request, Response } from "express";
const bodyParser = require("body-parser");
import dotenv from "dotenv";
import { Channel } from "amqplib/callback_api";
dotenv.config({ path: "../dev.env" });

import { rabitMqReceiver } from "./connecters/rabitMq";
import saveEmailRecord from "./services/saveEmail";
import sendEmail from "./services/sendEmail";
const app: Express = express();

const port = process.env.OPARATION_SERVICE_PORT;
const { QUEUE = "main" } = process.env;
rabitMqReceiver().then((channel: Channel) => {
  channel.assertQueue(QUEUE);
  channel.consume(QUEUE, async (msg) => {
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
          channel.ack(msg);
        }
      }
    }
  });
});
app.use(bodyParser.json({ limit: "10mb" }));
app.get("/", (req: Request, res: Response) => {
  let response = {
    statusCode: 201,
    api: "Queue Api",
  };
  return res.status(201).send(response);
});

app.listen(port, () => {
  console.log(`[Server]: Queue server running at https://localhost:${port}`);
});
