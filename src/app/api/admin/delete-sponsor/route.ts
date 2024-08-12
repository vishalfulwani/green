import dbConnect from "@/dbconfig/dbConnect";
import { ApiResponse } from "@/helpers/ApiResponse";
import ProductModel from "@/models/product.models";
import SponsorModel from "@/models/sponsor.models";
import mongoose from "mongoose";





export  async function POST(req:Request){
    await dbConnect()

    try {
        const { sponsorId } = await req.json();
    
        console.log("--------",sponsorId)
        const sponsor = await SponsorModel.findOne({ _id: sponsorId });
    console.log(sponsor)
        if (!sponsor) {
            return Response.json(
                new ApiResponse(false,404,{},"Sponsor not found"),
                {status: 404},
            )
        }
        
        const objSponsorId = new mongoose.Types.ObjectId(sponsorId)
        console.log(objSponsorId,"ooooooooooooo",sponsor._id)

        if (!objSponsorId.equals(sponsor._id)){
            return Response.json(
                new ApiResponse(false, 400, {},"Sponsor is not found or already deleted"),
                { status: 400 }
            )
        }

       
        const del = await SponsorModel.findByIdAndDelete(sponsorId)
        console.log("===",del)
        return Response.json(
            new ApiResponse(true, 200, {}, "Sponsor deleted successfully"),
            { status: 200 }
        )
    
    
    } catch (error) {
        return Response.json(
            new ApiResponse(false, 500, {}, "Error while deleting Sponsor"),
            { status: 500 }
        )
        
    }
   
}