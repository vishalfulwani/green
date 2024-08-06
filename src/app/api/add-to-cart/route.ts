import { NextApiRequest, NextApiResponse } from 'next';
import ProductModel from '@/models/product.models';
import UserModel from '@/models/user.models';
import { ApiResponse } from '@/helpers/ApiResponse';
import dbConnect from '@/dbconfig/dbConnect';

export async function POST(req: NextApiRequest){

    await dbConnect()

  try {
    const { userId, productId } = await req.body;
    
    if (!userId || !productId) {
      return Response.json(
          new ApiResponse(false, 400, {}, "Missing cart information"),
          { status: 400 }
      )
    }
  
    const user = await UserModel.findById(userId);
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
  
    const existingItem = user.cart.find(item => item.productId.toString() === productId);
  
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cart.push({ productId, quantity: 1 });
    }
  
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

