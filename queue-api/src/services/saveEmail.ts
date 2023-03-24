import { iEmailBody } from "../../interfaces/body";
import { Email } from "../models/email";

const saveEmailRecord=async (emailObj:iEmailBody)=>{
    const {id,content,email}=emailObj
    let emailData = new Email({ id, email, content });
    return await emailData.save();

}

export default saveEmailRecord;