import dbConnect from '@/dbconfig/dbConnect';
import { ApiResponse } from '@/helpers/ApiResponse';
import CouponModel from '@/models/coupon.models';
import { NextResponse } from 'next/server';


export async function POST(request: Request) {
  await dbConnect();

  try {
    const { code , userId } = await request.json();

    if (!code) {
      return NextResponse.json({ error: 'Coupon code is required' }, { status: 400 });
    }

    const coupon = await CouponModel.findOne({ code });
    if (!coupon || !coupon.isActive || coupon.expirationDate < new Date()) {
      return NextResponse.json({ error: 'Invalid or expired coupon code' }, { status: 400 });
    }

    if (Number(coupon.limit) > 0 && Number(coupon.limit) > coupon.appliedBy.length - 1){
      coupon.appliedBy.push(userId);
      await coupon.save();
    }
    
    if (Number(coupon.limit) > 0 && Number(coupon.limit) < coupon.appliedBy.length - 1){
      return Response.json(
        new ApiResponse(true,400,{},"Coupon Limit Reached"),
        { status: 400 }
    )
    }
    

    // return NextResponse.json({ discount: coupon.discountPercentage }, { status: 200 });
    return Response.json(
        new ApiResponse(true,200,{},"Coupon data is updated"),
        { status: 200 }
    )
  } catch (error) {
    // return NextResponse.json({ error: 'Failed to apply coupon' }, { status: 500 });
    return Response.json(
        new ApiResponse(true,500,{},"Failed to update coupon"),
        { status: 500 }
    )
  }
}
