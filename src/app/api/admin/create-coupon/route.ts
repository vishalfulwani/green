
import dbConnect from '@/dbconfig/dbConnect';
import { ApiResponse } from '@/helpers/ApiResponse';
import CouponModel from '@/models/coupon.models';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {

  await dbConnect();

  try {
    // const { code, discountPercentage, expirationDate } = await request.json();

    const formData = await req.formData();
    const code = formData.get('code') as string
    const discountPercentage = formData.get('discountPercentage') as string
    const expirationDate = formData.get('expirationDate') ;

    console.log(code,"***",discountPercentage,"===",expirationDate)

    if (!code || !discountPercentage || !expirationDate) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const existingCoupon = await CouponModel.findOne({ code });
    if (existingCoupon) {
      return NextResponse.json({ error: 'Coupon code already exists' }, { status: 400 });
    }

    const coupon = new CouponModel({
      code,
      discountPercentage,
      expirationDate: new Date(expirationDate as string)
    });
    

    await coupon.save();

    // return NextResponse.json({ message: 'Coupon created successfully' }, { status: 201 });
    return Response.json(
        new ApiResponse(true,200,{}, 'Coupon created successfully'),
        {status:200}
    )
  } catch (error) {
    // return NextResponse.json({ error: 'Failed to create coupon' }, { status: 500 });
    return Response.json(
        new ApiResponse(false,500,{}, 'Failed to create coupen'),
        {status:500}
    )
  }
}
