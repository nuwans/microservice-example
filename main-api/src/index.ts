import dotenv from "dotenv";
//import { rabitMqSendChannel } from "./connecter/rabitMq";
import app from "./app";
dotenv.config({ path: "../dev.env" });
const {  MAIN_SERVICE_PORT = 3005 } = process.env;
app.listen(MAIN_SERVICE_PORT, () => {
  console.log(
    `[Server]: Main server running at https://localhost:${MAIN_SERVICE_PORT}`
  );
});
