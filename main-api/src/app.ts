import express, { Express, Request, Response } from "express";
const bodyParser = require("body-parser");
const app: Express = express();
import QueueConnection from "./services/queue";

const { QUEUE = "main" } = process.env;
app.use(bodyParser.json({ limit: "10mb" }));
app.get("/", (req: Request, res: Response) => {
  let response = {
    statusCode: 200,
    api: "Main Api",
  };
  return res.status(200).json(response);
});
app.post("/", async (req: Request, res: Response) => {
  let response = {
    ...req.body,
    timestamp: Date.now(),
  };
  const message = JSON.stringify(response);
  QueueConnection.addToQueue(QUEUE, message);
  res.status(204).send();
});

export default app;
