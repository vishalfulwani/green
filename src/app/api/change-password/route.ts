import dbConnect from '@/dbconfig/dbConnect';
import { ApiError } from '@/helpers/ApiError';
import { ApiResponse } from '@/helpers/ApiResponse';
import UserModel, { IUser } from '@/models/user.models';
import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ecommerceAuthOptions } from '../auth/ecommerce/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';


interface ChangePasswordRequest extends NextApiRequest {
    user?: IUser & { _id: mongoose.Types.ObjectId };
}

export async function POST(req: Request, res: NextApiResponse) {
    await dbConnect();

    const session = await getServerSession(ecommerceAuthOptions);

    if (!session || !session.user) {
        return Response.json(
            new ApiResponse(false, 401, {}, "Not authenticated"),
            { status: 401 }
        )
    }

    try {
        const { oldPassword, newPassword } = await req.json() as { oldPassword: string; newPassword: string };

        const selectedUser = await UserModel.findById(session.user._id);
        if (!selectedUser) {
            return Response.json(
                new ApiResponse(false, 500, {}, "User not found"),
                { status: 500 }
            )
        }



        const isPasswordCorrect = await bcrypt.compare(oldPassword, selectedUser.password);

        if (!isPasswordCorrect) {
            return Response.json(
                new ApiResponse(false, 401, {}, "Invalid old password"),
                { status: 401 }
            )
        }


        selectedUser.password = await bcrypt.hash(newPassword, 10);
        await selectedUser.save({ validateBeforeSave: false });

        return Response.json(
            new ApiResponse(true, 200, {}, "Password changed successfully"),
            { status: 200 }
        )

    } catch (error) {
        console.error(error);
        return Response.json(
            new ApiResponse(false, 500, {}, "Password change failed"),
            { status: 500 }
        )
    }
}
