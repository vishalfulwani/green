
import { NextApiRequest, NextApiResponse } from 'next';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import mongoose from 'mongoose';
import Donation from '@/models/donation.models';
import dbConnect from '@/dbconfig/dbConnect';
import OrderModel from '@/models/order.models';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    // if (req.method === 'POST') {

        await dbConnect()

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!);
        shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
        const digest = shasum.digest('hex');

        if (digest === razorpay_signature) {
            // Update donation record
            await OrderModel.findOneAndUpdate(
                { razorpayOrderId: razorpay_order_id },
                {
                    razorpayPaymentId: razorpay_payment_id,
                    razorpaySignature: razorpay_signature,
                    status: 'paid',
                }
            );

            res.status(200).json({ message: 'Payment verified successfully' });
        } else {
            // Update donation record with failure status
            await OrderModel.findOneAndUpdate(
                { razorpayOrderId: razorpay_order_id },
                { status: 'failed' }
            );
            res.status(400).json({ error: 'Invalid signature' });
        }

        
    // }
    //  else {
    //     res.setHeader('Allow', ['POST']);
    //     res.status(405).end(`Method ${req.method} Not Allowed`);
    // }
}
