import { iEmailBody } from "../interfaces/body";
import { Email } from "../models/email";

const saveEmailRecord=async (emailObj:iEmailBody)=>{
    const {id,content,email,deliverd}=emailObj
    let emailData = new Email({ id, email, content,deliverd });
    return await emailData.save();

}

export default saveEmailRecord;