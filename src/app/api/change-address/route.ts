import dbConnect from '@/dbconfig/dbConnect';
import { ApiError } from '@/helpers/ApiError';
import { ApiResponse } from '@/helpers/ApiResponse';
import UserModel, { IUser } from '@/models/user.models';
import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
// import { ecommerceAuthOptions } from '../auth/ecommerce/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { authOptions } from '../auth/[...nextauth]/options';


interface ChangePasswordRequest extends NextApiRequest {
    user?: IUser & { _id: mongoose.Types.ObjectId };
}

export async function POST(req: Request, res: NextApiResponse) {
    await dbConnect();

    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return Response.json(
            new ApiResponse(false, 401, {}, "Not authenticated"),
            { status: 401 }
        )
    }

    if (session.platform != "ecommerce") {
        return Response.json(
            new ApiResponse(false, 401, {}, "Wrong platform or Login first"),
            { status: 401 }
        )
    }

    try {

        const { street, city, state, postalCode ,phone} = await req.json() as { street: string; city: string; state: string; postalCode: string;phone:string };

        console.log("====", phone)

        const selectedUser = await UserModel.findById(session.user._id);
        if (!selectedUser) {
            return Response.json(
                new ApiResponse(false, 500, {}, "User not found"),
                { status: 500 }
            )
        }

        selectedUser.address = selectedUser.address || {
            street: '',
            city: '',
            state: '',
            postalCode: '',
        };

        // Update address fields
        selectedUser.address.street = street || selectedUser.address.street;
        selectedUser.address.city = city || selectedUser.address.city;
        selectedUser.address.state = state || selectedUser.address.state;
        selectedUser.address.postalCode = postalCode || selectedUser.address.postalCode;
        selectedUser.phone = phone

        // Save user with updated address
        await selectedUser.save({ validateBeforeSave: false });

        console.log("Updated User:", selectedUser);
        return Response.json(
            new ApiResponse(true, 200, {}, "Address modified successfully"),
            { status: 200 }
        )

    } catch (error) {
        console.error(error);
        return Response.json(
            new ApiResponse(false, 500, {}, "Address change failed"),
            { status: 500 }
        )
    }
}
