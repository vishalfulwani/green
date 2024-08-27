
import { NextApiRequest, NextApiResponse } from 'next';
import Razorpay from 'razorpay';
import mongoose from 'mongoose';
import Donation from '@/models/donation.models';
import { NextRequest } from 'next/server';
import dbConnect from '@/dbconfig/dbConnect';
import { ApiResponse } from '@/helpers/ApiResponse';
import OrderModel from '@/models/order.models';

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest) {

    await dbConnect()

        const { userId , cartItems , address , totalAmount , phone } = await req.json();

        console.log("uuu",totalAmount)

        const options = {
            amount: totalAmount * 100, // Convert to paise
            currency: 'INR',
            receipt: `receipt_order_${new Date().getTime()}`,
        };

        try {
            const order = await razorpay.orders.create(options);

            const purchaseOrder = new OrderModel({
                userId,
                currency: options.currency,
                razorpayOrderId: order.id,
                cartItems,
                address,
                totalAmount,
                phone,
                status: 'created',
            });

            await purchaseOrder.save();

            Response.json(
                new ApiResponse(true,200,order,"Purchase order created"),
                {status:200}
            )
        } catch (error: any) {
            console.log({ error: error.message });
            Response.json(
                new ApiResponse(false,500,{},"error while creating purchase order")
            )
        } 
}
