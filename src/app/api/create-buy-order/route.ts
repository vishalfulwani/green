
// // // // import { NextApiRequest, NextApiResponse } from 'next';
// // // // import Razorpay from 'razorpay';
// // // // import mongoose from 'mongoose';
// // // // import Donation from '@/models/donation.models';
// // // // import { NextRequest } from 'next/server';
// // // // import dbConnect from '@/dbconfig/dbConnect';
// // // // import { ApiResponse } from '@/helpers/ApiResponse';
// // // // import OrderModel from '@/models/order.models';

// // // // const razorpay = new Razorpay({
// // // //     key_id: process.env.RAZORPAY_KEY_ID!,
// // // //     key_secret: process.env.RAZORPAY_KEY_SECRET!,
// // // // });

// // // // export async function POST(req: NextRequest) {

// // // //     await dbConnect()

// // // //         const { userId , cartItems , address , totalAmount , phone ,couponCode} = await req.json();

// // // //         console.log("uuu",totalAmount,address,couponCode,userId, phone,cartItems)


// // // //         const options = {
// // // //             amount: totalAmount * 100, // Convert to paise
// // // //             currency: 'INR',
// // // //             receipt: `receipt_order_${new Date().getTime()}`,
// // // //         };

// // // //         try {
// // // //             console.log("order--->")
// // // //             const order = await razorpay.orders.create(options);
// // // //             console.log("order",order)

// // // //             const purchaseOrder = new OrderModel({
// // // //                 userId,
// // // //                 currency: options.currency,
// // // //                 razorpayOrderId: order.id,
// // // //                 items:cartItems,
// // // //                 address,
// // // //                 totalAmount,
// // // //                 phone,
// // // //                 couponCode,
// // // //                 status: 'created',
// // // //             });

// // // //             console.log("ppppppp",purchaseOrder)
// // // //             await purchaseOrder.save();

// // // //             return Response.json(
// // // //                 new ApiResponse(true,200,order,"Purchase order created"),
// // // //                 {status:200}
// // // //             )
// // // //         } catch (error: any) {
// // // //             console.log({ error: error.message });
// // // //             return Response.json(
// // // //                 new ApiResponse(false,500,{},"error while creating purchase order"),
// // // //                 {status:500}
// // // //             )
// // // //         } 
// // // // }







// // // import { NextApiRequest, NextApiResponse } from 'next';
// // // import Razorpay from 'razorpay';
// // // import mongoose from 'mongoose';
// // // import Donation from '@/models/donation.models';  // Optional import if needed
// // // import dbConnect from '@/dbconfig/dbConnect';
// // // import { ApiResponse } from '@/helpers/ApiResponse';
// // // import OrderModel from '@/models/order.models';

// // // const razorpay = new Razorpay({
// // //     key_id: process.env.RAZORPAY_KEY_ID!,
// // //     key_secret: process.env.RAZORPAY_KEY_SECRET!,
// // // });

// // // export default async function handler(req: NextApiRequest, res: NextApiResponse) {
// // //     if (req.method === 'POST') {
// // //         await dbConnect();

// // //         const { userId, cartItems, address, totalAmount, phone, couponCode } = req.body;

// // //         console.log("Request Data: ", totalAmount, address, couponCode, userId, phone, cartItems);

// // //         const options = {
// // //             amount: totalAmount * 100, // Convert to paise
// // //             currency: 'INR',
// // //             receipt: `receipt_order_${new Date().getTime()}`,
// // //         };

// // //         try {
// // //             console.log("Creating Razorpay Order...");
// // //             const order = await razorpay.orders.create(options);
// // //             console.log("Razorpay Order: ", order);

// // //             const purchaseOrder = new OrderModel({
// // //                 userId,
// // //                 currency: options.currency,
// // //                 razorpayOrderId: order.id,
// // //                 items: cartItems,
// // //                 address,
// // //                 totalAmount,
// // //                 phone,
// // //                 couponCode,
// // //                 status: 'created',
// // //             });

// // //             console.log("Saving Order to Database: ", purchaseOrder);
// // //             await purchaseOrder.save();

// // //             return res.status(200).json(
// // //                 new ApiResponse(true, 200, order, "Purchase order created")
// // //             );
// // //         } catch (error: any) {
// // //             console.error("Error while creating purchase order: ", error.message);
// // //             return res.status(500).json(
// // //                 new ApiResponse(false, 500, {}, "Error while creating purchase order")
// // //             );
// // //         }
// // //     } else {
// // //         return res.status(405).json({ message: "Method Not Allowed" });
// // //     }
// // // }

// // import Razorpay from 'razorpay';
// // import dbConnect from '@/dbconfig/dbConnect';
// // import { ApiResponse } from '@/helpers/ApiResponse';
// // import OrderModel from '@/models/order.models';

// // const razorpay = new Razorpay({
// //     key_id: process.env.RAZORPAY_KEY_ID!,
// //     key_secret: process.env.RAZORPAY_KEY_SECRET!,
// // });

// // export async function POST(req: Request) {
// //     await dbConnect();

// //     const { userId, cartItems, address, totalAmount, phone, couponCode } = await req.json();

// //     console.log("Request Data: ", totalAmount, address, couponCode, userId, phone, cartItems);

// //     const options = {
// //         amount: totalAmount * 100, // Convert to paise
// //         currency: 'INR',
// //         receipt: `receipt_order_${new Date().getTime()}`,
// //     };

// //     try {
// //         console.log("Creating Razorpay Order...");
// //         const order = await razorpay.orders.create(options);
// //         console.log("Razorpay Order: ", order);

// //         const purchaseOrder = new OrderModel({
// //             userId,
// //             currency: options.currency,
// //             razorpayOrderId: order.id,
// //             items: cartItems,
// //             address,
// //             totalAmount,
// //             phone,
// //             couponCode,
// //             status: 'created',
// //         });

// //         console.log("Saving Order to Database: ", purchaseOrder);
// //         await purchaseOrder.save();

// //         return new Response(
// //             JSON.stringify(
// //                 new ApiResponse(true, 200, order, "Purchase order created")
// //             ),
// //             { status: 200 }
// //         );
// //     } catch (error: any) {
// //         console.error("Error while creating purchase order: ", error.message);
// //         return new Response(
// //             JSON.stringify(
// //                 new ApiResponse(false, 500, {}, "Error while creating purchase order")
// //             ),
// //             { status: 500 }
// //         );
// //     }
// // }




// import Razorpay from 'razorpay';
// import dbConnect from '@/dbconfig/dbConnect';
// import { ApiResponse } from '@/helpers/ApiResponse';
// import OrderModel from '@/models/order.models';

// const razorpay = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID!,
//     key_secret: process.env.RAZORPAY_KEY_SECRET!,
// });

// export async function POST(req: Request) {
//     await dbConnect(); // Ensure the DB connection

//     try {
//         const { userId, cartItems, address, totalAmount, phone, couponCode } = await req.json();
        
//         // Log the data received from the request
//         console.log("Received Request Data: ", { userId, cartItems, address, totalAmount, phone, couponCode });

//         const options = {
//             amount: totalAmount * 100, // Convert to paise
//             currency: 'INR',
//             receipt: `receipt_order_${new Date().getTime()}`,
//         };

//         console.log("Razorpay Order Options: ", options);

//         // Create the Razorpay order
//         const order = await razorpay.orders.create(options);

//         // Log the order creation response
//         console.log("Razorpay Order Created: ", order);

//         if (!order || !order.id) {
//             throw new Error("Razorpay order creation failed");
//         }

//         // Create the purchase order to save in the database
//         const purchaseOrder = new OrderModel({
//             userId,
//             currency: options.currency,
//             razorpayOrderId: order.id,
//             items: cartItems,
//             address,
//             totalAmount,
//             phone,
//             couponCode,
//             status: 'created',
//         });

//         console.log("Saving Order to Database: ", purchaseOrder);
        
//         // Save the purchase order to the database
//         await purchaseOrder.save();

//         return new Response(
//             JSON.stringify(new ApiResponse(true, 200, order, "Purchase order created")),
//             { status: 200 }
//         );
//     } catch (error: any) {
//         // Log the error message and stack trace for debugging
//         console.error("Error while creating purchase order: ", error.message);
//         console.error("Stack Trace: ", error.stack);

//         return new Response(
//             JSON.stringify(new ApiResponse(false, 500, {}, "Error while creating purchase order")),
//             { status: 500 }
//         );
//     }
// }



import Razorpay from 'razorpay';
import dbConnect from '@/dbconfig/dbConnect';
import { ApiResponse } from '@/helpers/ApiResponse';
import OrderModel from '@/models/order.models';

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
    await dbConnect(); // Ensure the DB connection

    try {
        const { userId, cartItems, address, totalAmount, phone, couponCode } = await req.json();
        
        // Log the data received from the request
        console.log("Received Request Data: ", { userId, cartItems, address, totalAmount, phone, couponCode });

        const options = {
            amount: totalAmount * 100, // Convert to paise
            currency: 'INR',
            receipt: `receipt_order_${new Date().getTime()}`,
        };

        console.log("Razorpay Order Options: ", options);

        // Create the Razorpay order
        const order = await razorpay.orders.create(options);

        // Log the order creation response
        console.log("Razorpay Order Created: ", order);

        if (!order || !order.id) {
            throw new Error("Razorpay order creation failed");
        }

        // Create the purchase order to save in the database
        const purchaseOrder = new OrderModel({
            userId,
            currency: options.currency,
            razorpayOrderId: order.id,
            items: cartItems,
            address,
            totalAmount,
            phone,
            couponCode,
            status: 'created',
        });

        console.log("Saving Order to Database: ", purchaseOrder);
        
        // Save the purchase order to the database
        await purchaseOrder.save();

        return new Response(
            JSON.stringify(new ApiResponse(true, 200, order, "Purchase order created")),
            { status: 200 }
        );
    } catch (error: any) {
        // Log the error message and stack trace for debugging
        console.error("Error while creating purchase order: ", error.message);
        console.error("Error while creating purchase order: ", error);
        console.error("Stack Trace: ", error.stack);

        return new Response(
            JSON.stringify(new ApiResponse(false, 500, {}, "Error while creating purchase order")),
            { status: 500 }
        );
    }
}
