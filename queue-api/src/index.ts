import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config({ path: "../dev.env" });
console.log(process.env)
const {  MONGODB_URL = "main"  } = process.env;
const port = process.env.OPARATION_SERVICE_PORT;
import app from "./app";
mongoose.connect(MONGODB_URL,{
  }).then(() => 
{
  console.log('Connected to MongoDB');
  app.listen(port, () => {
    console.log(`[Server]: Queue server running at https://localhost:${port}`);
  });
}).catch((err:any) => {
  console.log('Failed to connect to MongoDB:', err);
});


