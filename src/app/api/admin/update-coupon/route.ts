
import dbConnect from '@/dbconfig/dbConnect';
import { ApiResponse } from '@/helpers/ApiResponse';
import CouponModel from '@/models/coupon.models';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { couponCode, userId } = await request.json();

    const coupon = await CouponModel.findOne({ code:couponCode });
    console.log("8888888888",coupon)
    if (!coupon || !coupon.isActive || coupon.expirationDate < new Date()) {
      return NextResponse.json(
        new ApiResponse(false, 400, {}, `${couponCode} is invalid or expired`),
        { status: 400 }
      );
    }
  
    // Add the user to the appliedBy array if not already added
    if (!coupon.appliedBy) {
      coupon.appliedBy = []; 
    }
    if (!coupon.appliedBy.includes(userId)) {  
      console.log("*****",)    
      coupon.appliedBy.push(userId);
      await coupon.save();
    } else {
      return Response.json(
        new ApiResponse(false, 400, {}, `${couponCode} is already applied by this user`),
        { status: 400 }
      );
    }

    return Response.json(
      new ApiResponse(true, 200, {}, 'Coupon updated successfully'),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating coupon:', error);
    return Response.json(
      new ApiResponse(false, 500, {}, 'Failed to update coupon'),
      { status: 500 }
    );
  }
}
