import db from 'mongoose'
const emailSchema = new db.Schema({
    id: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    deliverd: {
        type: Boolean,
        required: true,
        default:false
      },
  });
  
  export const Email = db.model('email', emailSchema);