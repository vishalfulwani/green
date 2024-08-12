import dbConnect from "@/dbconfig/dbConnect";
import { ApiResponse } from "@/helpers/ApiResponse";
import ProductModel from "@/models/product.models";
import mongoose from "mongoose";





export  async function POST(req:Request){
    await dbConnect()

    try {
        const { productId } = await req.json();
    
        console.log(productId)
        const product = await ProductModel.findOne({ _id: productId });
        console.log(product)
    
        if (!product) {
            return Response.json(
                new ApiResponse(false,404,{},"product not found or already deleted"),
                {status: 404},
            )
        }
        
        const objProductId = new mongoose.Types.ObjectId(productId)
        console.log(objProductId,"ooooooooooooo",product._id)

        if (!objProductId.equals(product._id)){
            return Response.json(
                new ApiResponse(false, 400, {},"Product is not found or already deleted"),
                { status: 400 }
            )
        }

       
        await ProductModel.findByIdAndDelete(objProductId)
        return Response.json(
            new ApiResponse(true, 200, {}, "Product deleted successfully"),
            { status: 200 }
        )
    
    
    } catch (error) {
        return Response.json(
            new ApiResponse(false, 500, {}, "Error while deleting product"),
            { status: 500 }
        )
        
    }
   
}