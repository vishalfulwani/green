import dbConnect from "@/dbconfig/dbConnect";
import { ApiResponse } from "@/helpers/ApiResponse";
import ProductModel from "@/models/product.models";
import SponserModel from "@/models/sponser.models";
import mongoose from "mongoose";





export  async function POST(req:Request){
    await dbConnect()

    try {
        const { sponserId } = await req.json();
    
        const sponser = await SponserModel.findOne({ _id: sponserId });
    
        if (!sponser) {
            return Response.json(
                new ApiResponse(false,404,{},"Sponser not found"),
                {status: 404},
            )
        }
        
        const objSponserId = new mongoose.Types.ObjectId(sponserId)
        console.log(objSponserId,"ooooooooooooo",sponser._id)

        if (!objSponserId.equals(sponser._id)){
            return Response.json(
                new ApiResponse(false, 400, {},"Sponser is not found or already deleted"),
                { status: 400 }
            )
        }

       
        await ProductModel.findByIdAndDelete(objSponserId)
        return Response.json(
            new ApiResponse(true, 200, {}, "Sponser deleted successfully"),
            { status: 200 }
        )
    
    
    } catch (error) {
        return Response.json(
            new ApiResponse(false, 500, {}, "Error while deleting Sponser"),
            { status: 500 }
        )
        
    }
   
}