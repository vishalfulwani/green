import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/dbconfig/dbConnect';
import { ApiResponse } from '@/helpers/ApiResponse';
import CouponModel from '@/models/coupon.models';

export async function GET(req: NextApiRequest, res: NextApiResponse) {

    await dbConnect();

    try {
        const coupons = await CouponModel.find({});

        const currentDate = new Date();
        const updatedCoupons = await Promise.all(
            coupons.map(async (coupon) => {
                if (coupon.expirationDate < currentDate) {
                    coupon.isActive = false;
                    await coupon.save(); 
                }
                return coupon;
            })
        );

        return Response.json(
            new ApiResponse(true, 200, updatedCoupons, "Coupon data fetched and updated"),
            { status: 200 }
        );
    } catch (error) {
        return Response.json(
            new ApiResponse(false, 500, {}, "Error while fetching and updating coupon data"),
            { status: 500 }
        );
    }


}
