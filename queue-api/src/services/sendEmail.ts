import nodemailer from 'nodemailer';
import { iEmailBody } from '../interfaces/body';


const  sendEmail=async (emailBody:iEmailBody)=> {
    const {email,content}=emailBody;
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'linkedasset@gmail.com',
          pass: 'shgtutujuoapribx@qwe', //
        },
      });
      

  const mailOptions = {
    from:'linkedasset@gmail.com',
    to:email,
    subject:'This is test Email from nuwan',
    text:content,
  };

  return await transporter.sendMail(mailOptions);
}

export default sendEmail