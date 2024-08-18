
import { NextApiRequest, NextApiResponse } from 'next';
import Razorpay from 'razorpay';
import mongoose from 'mongoose';
import Donation from '@/models/donation.models';
import { NextRequest } from 'next/server';

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest, res: NextApiResponse) {
    // if (req.method === 'POST') {
        await mongoose.connect(process.env.MONGODB_URI!, {});

        const { amount, donorName, donorEmail, donorContact } = await req.json();

        console.log("uuu",amount)

        const options = {
            amount: amount * 100, // Convert to paise
            currency: 'INR',
            receipt: `receipt_order_${new Date().getTime()}`,
        };

        try {
            const order = await razorpay.orders.create(options);

            const donation = new Donation({
                amount,
                currency: options.currency,
                razorpayOrderId: order.id,
                donorName,
                donorEmail,
                donorContact,
                status: 'created',
            });

            await donation.save();

            res.status(200).json(order);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        } 
        // finally {
            // mongoose.connection.close();
        // }
    // } else {
    //     res.setHeader('Allow', ['POST']);
    //     res.status(405).end(`Method ${req.method} Not Allowed`);
    // }
}
