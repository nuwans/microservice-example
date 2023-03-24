import express, {Express, Request, Response} from 'express';
const bodyParser = require('body-parser')
import dotenv from "dotenv"
import {  rabitMqSendChannel } from './connecter/rabitMq';
const app: Express = express();
dotenv.config({path:'../dev.env'})

const {QUEUE='main',MAIN_SERVICE_PORT=3005}=process.env
app.use(bodyParser.json({ limit: '10mb' }));
const channel = rabitMqSendChannel()

app.get('/', (req: Request, res: Response)=>{
    let response = {
        statusCode: 201,
        api:'Main Api'
    };
    return res.status(201).send(response);
});
app.post('/', async (req: Request, res: Response)=>{
    let response = {
        ...req.body,
        timestamp:Date.now()
    };
    (await channel).assertQueue(QUEUE);
    const message = JSON.stringify(response);
    (await channel).sendToQueue(QUEUE, Buffer.from(message));

    return res.status(201).json(response);
});
app.listen(MAIN_SERVICE_PORT, ()=> {
console.log(`[Server]: Main server running at https://localhost:${MAIN_SERVICE_PORT}`);
});