
import { NextApiRequest, NextApiResponse } from 'next';
import Razorpay from 'razorpay';
import mongoose from 'mongoose';
import Donation from '@/models/donation.models';
import { NextRequest } from 'next/server';
import dbConnect from '@/dbconfig/dbConnect';
import { ApiResponse } from '@/helpers/ApiResponse';
import bcrypt from 'bcrypt';


const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest, res: NextApiResponse) {

    await dbConnect()

        const { amount, donorName, donorEmail,donorEmailPassword, donorContact } = await req.json();

        console.log("uuu",amount)

        const options = {
            amount: amount * 100, // Convert to paise
            currency: 'INR',
            receipt: `receipt_order_${new Date().getTime()}`,
        };

        try {
            const order = await razorpay.orders.create(options);
            console.log(order,"=-=-=-=")

            const hashedPassword = await bcrypt.hash(donorEmailPassword, 10)
            const donation = new Donation({
                amount,
                currency: options.currency,
                razorpayOrderId: order.id,
                donorName,
                donorEmail,
                donorEmailPassword:hashedPassword,
                donorContact,
                status: 'created',
            });

            await donation.save();

            return Response.json(
                new ApiResponse(true,200,order,"Donation order created"),
                {status:200}
            )
        } catch (error: any) {
            console.log({ error: error.message });
            return Response.json(
                new ApiResponse(false,500,{},"error while creating donation order")
            )
        } 
}
