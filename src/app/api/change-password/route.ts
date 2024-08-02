import dbConnect from '@/dbconfig/dbConnect';
import { ApiError } from '@/helpers/ApiError';
import { ApiResponse } from '@/helpers/ApiResponse';
import UserModel, { IUser } from '@/models/user.models';
import mongoose from 'mongoose';
import type { NextApiRequest } from 'next';
import { authOptions } from '../auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';


interface changePasswordRequest extends NextApiRequest {
    user?: IUser & { _id: mongoose.Types.ObjectId };
}
export async function POST(req: changePasswordRequest) {

    await dbConnect()

    const session = await getServerSession(authOptions)
    const user = session?.user

    if (!session || !session.user){
        return Response.json({
            success:false,
            message:"Not Authenticated"
        },{status:401})
    }

    try {
        const { oldPassword, newPassword } = await req.body as { oldPassword: string; newPassword: string };

        console.log(oldPassword, "====", newPassword)
        const selectedUser = await UserModel.findById(user?._id);
        if (!selectedUser) {
            return Response.json(
                new ApiResponse(false, 500, {}, "User not found"),
                { status: 500 }
            );
        }
        const isPasswordCorrect = await selectedUser?.isPasswordCorrect(oldPassword);

        if (!isPasswordCorrect) {
            return Response.json(
                new ApiResponse(false, 401, {}, "Invalid old password"),
                { status: 401 }
            );
        }

        selectedUser.password = newPassword;
        await selectedUser.save({ validateBeforeSave: false });

        return Response.json(
            new ApiResponse(false, 200, {}, "Password changed successfully"),
            { status: 200 }
        );

    } catch (error) {
        return Response.json(
            new ApiResponse(false, 500, {}, "Error while registering user"),
            { status: 500 }
        );
    }
};



