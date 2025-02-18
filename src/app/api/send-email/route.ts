// pages/api/send-email.ts
import { ApiResponse } from '@/helpers/ApiResponse';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest } from 'next/server';
import nodemailer from 'nodemailer';

// export default async (req, res) => {
export async function POST(req: NextRequest, res: NextApiResponse) {
    
  if (req.method === 'POST') {
    const { name, email,subject, message } = await req.json()

console.log(name,"==========",email,"--------**********")

    // async function createTestAccount() {
        let testAccount = await nodemailer.createTestAccount();
        console.log('Ethereal Credentials:', testAccount);
    // }
    
    // createTestAccount();

    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email', // Use your SMTP provider's host here
      port: 587, // Or the appropriate port (Mailtrap uses 587)
      auth: {
        // user: process.env.SMTP_USER,  // Store sensitive credentials in .env
        // pass: process.env.SMTP_PASS,  // Same here
        user:testAccount.user,
        pass:testAccount.pass,
      },
    });

    const mailOptions = {
      from: email,  
      to: 'vk19062004@gmail.com', 
      subject: `${subject}`,
      text: message,
      html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
    };

    try {
    await transporter.sendMail(mailOptions);
    
    return Response.json(
        new ApiResponse(true,200,{},"Message sent successfully"),
        {status:200}
      )
    } catch (error) {
      console.error(error);
    Response.json(
        new ApiResponse(false,500,{},"error "),
        {status:500}
      )
    }
  } else {
    Response.json(
        new ApiResponse(false,500,{},"error while fetching sponsors data"),
        {status:500}
      )
  }
};
