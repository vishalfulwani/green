import dbConnect from "@/dbconfig/dbConnect"
import { ApiResponse } from "@/helpers/ApiResponse";
import UserModel, { IUser } from "@/models/user.models"






interface RequestBody {
    code: string;
    userName: string;
}

export async function POST(req: Request) {

    await dbConnect()

    try {
        const { code, userName }: RequestBody = await req.json()
        console.log(code,"***",userName)

        const user = await UserModel.findOne({ userName })

        if (!user) {
            return Response.json(
                new ApiResponse(false, 400, {}, "User not found"),
                { status: 400 }
            );
        }

        const isCodeValid = parseInt(user.verifyCode) === parseInt(code)
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date()

        if (isCodeValid && isCodeNotExpired) {
            user.isVerified = true
            await user.save()
            return Response.json(
                new ApiResponse(true, 201, {}, "User is verified"),
                { status: 201 }
            );
        }
        else if (!isCodeNotExpired) {
            return Response.json(
                new ApiResponse(false, 400, {}, "Verification Code has expired , please signup again to get new code"),
                { status: 400 }
            );
        }
        else {
             return Response.json(
            new ApiResponse(false, 400, {}, "Incorrect verification code"),
            { status: 400 }
        );
        }

    } catch (error) {
        return Response.json(
            new ApiResponse(false, 500, {}, "Error while code verification"),
            { status: 500 }
        );
    }
}






