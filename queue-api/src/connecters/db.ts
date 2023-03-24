import mongoose from 'mongoose';
const { MONGODB_URL = "main" } = process.env;
mongoose.connect(MONGODB_URL).then(() => 
{
  console.log('Connected to MongoDB');
}).catch((err:any) => {
  console.log('Failed to connect to MongoDB:', err);
});

export default mongoose;