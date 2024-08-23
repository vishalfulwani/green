import { NextApiRequest, NextApiResponse } from 'next';
import ProductModel from '@/models/product.models';
import UserModel from '@/models/user.models';
import { ApiResponse } from '@/helpers/ApiResponse';
import dbConnect from '@/dbconfig/dbConnect';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest){

  await dbConnect()

  try {
    const { userId, productId } = await req.json();
    
    console.log(userId,"andd ",productId)
    if (!userId || !productId) {
      return Response.json(
          new ApiResponse(false, 400, {}, "Missing cart information"),
          { status: 400 }
      )
    }
  
    const user = await UserModel.findById(userId);
    console.log(user)
    if (!user) {
      return Response.json(
          new ApiResponse(false, 400, {}, "User not found"),
          { status: 400 }
      )
    }
  
    const product = await ProductModel.findById(productId);
    if (!product) {
      return Response.json(
          new ApiResponse(false, 400, {}, "Product not found"),
          { status: 400 }
      )
    }
    console.log("----------",product)
  
    const existingItem = user.cart.find(item => item._id.toString() === productId);
    console.log("----------",existingItem)
  
    if (!existingItem) {
      return Response.json(
        new ApiResponse(true, 201, {}, "Product already added to cart"),
        { status: 201 }
      )
    }
    
    user.cart.push(product);
  
    await user.save();
  
    return Response.json(
      new ApiResponse(true, 200, user.cart , "Product added to cart"),
      { status: 200 }
  )
  } catch (error) {
    return Response.json(
        new ApiResponse(false, 500, {} , "Error while adding product to cart"),
        { status: 500 }
    ) 
  }
};

