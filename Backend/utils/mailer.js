
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT) || 587,
  secure: false, 
  auth: {
    user: process.env.MAIL_USER,     
    pass: process.env.MAIL_PASSWORD   
  }
});

const sendMail = async (to, subject, body, isHtml = true) => {
  const info = await transporter.sendMail({
    from: process.env.MAIL_SENDER,    
    to,
    subject,
    ...(isHtml ? { html: body } : { text: body })
  });
  console.log(`Email sent -> ${to} | subject: "${subject}"`);
  return info;
};

export default sendMail;
