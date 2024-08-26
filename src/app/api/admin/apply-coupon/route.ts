import dbConnect from '@/dbconfig/dbConnect';
import { ApiResponse } from '@/helpers/ApiResponse';
import CouponModel from '@/models/coupon.models';
import { NextResponse } from 'next/server';


export async function POST(request: Request) {
  await dbConnect();

  try {
    const { code } = await request.json();

    if (!code) {
      return NextResponse.json({ error: 'Coupon code is required' }, { status: 400 });
    }

    const coupon = await CouponModel.findOne({ code });
    if (!coupon || !coupon.isActive || coupon.expirationDate < new Date()) {
      return NextResponse.json({ error: 'Invalid or expired coupon code' }, { status: 400 });
    }

    // return NextResponse.json({ discount: coupon.discountPercentage }, { status: 200 });
    return Response.json(
        new ApiResponse(true,200,{ discount: coupon.discountPercentage },"Coupon is ready to apply"),
        { status: 200 }
    )
  } catch (error) {
    // return NextResponse.json({ error: 'Failed to apply coupon' }, { status: 500 });
    return Response.json(
        new ApiResponse(true,500,{},"Failed to apply coupon"),
        { status: 500 }
    )
  }
}
