import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

import { User } from "next-auth";
import mongoose from "mongoose";
import { ApiError } from "@/helpers/ApiError";
import dbConnect from "@/dbconfig/dbConnect";
import UserModel from "@/models/user.models";



export async function GET(request:Request){
    await dbConnect()

    const session = await getServerSession(authOptions)
    const user = session?.user 
    
    if (!session || !session.user){
        return Response.json({
            success:false,
            message:"Not Authenticated"
        },{status:401})
    }

    if (!user){
        throw new ApiError(400,"user not found")
    }
    const userId  = user._id

    try {
        const user = await UserModel.aggregate([
            {$match :{id:userId}},
            {$unwind :'$message'},
            {$sort:{'message.createdAt':-1}},
            {$group: {_id:'$_id',message:{$push:'message'}}}
        ])

        if (!user || user.length === 0){
            return Response.json({
                success:false,
                message:"user not found"
            },
            {status:401})
        }
        return Response.json({
            success:false,
            message:"user not found",
            messages:user[0].message
        },
        {status:200})

    } catch (error) {
        return Response.json({
            success:false,
            message:"error while getting message"
        },{status:500})
    }
}