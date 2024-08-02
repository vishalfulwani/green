import { ApiError } from "@/helpers/ApiError";
import { ApiResponse } from "@/helpers/ApiResponse";
import UserModel from "@/models/user.models";
import { IUser } from "@/models/user.models";
import dbConnect from "@/dbconfig/dbConnect";
import bcrypt from "bcrypt"
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";


interface RequestBody {
    userName: string;
    email: string;
    password: string;
  }
export async function POST(req: Request){

    await dbConnect()

    try {

        const body = await req.json()
        const { userName, email, password }:RequestBody = body as RequestBody 

        console.log(userName,"========",email,password)
        
        if ([userName, email, password].some(field => field.trim() === '')) {
            console.log(userName,"========")
            return Response.json(
                new ApiResponse(false, 400, {}, "All fields are required"),
                { status: 400 }
              );
        }
        
        const existingUserByUserName = await UserModel.findOne({
            $or: [{ userName, isVerified: true }]
        })
        if (existingUserByUserName) {
            return Response.json(
                new ApiResponse(false, 400, {}, "User already exists"),
                { status: 400 }
              );
        }
        
        const existingUserByEmail = await UserModel.findOne({
            email,
        })
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()
        console.log(verifyCode,"========")

        if (existingUserByEmail) {
            if (existingUserByEmail.isVerified) {
                return Response.json(
                    new ApiResponse(false, 401, {}, "User already exists with this email"),
                    { status: 401 }
                  ); 
            }
            else {
                const hashedPassword = await bcrypt.hash(password, 10)
                existingUserByEmail.password = hashedPassword
                existingUserByEmail.verifyCode = verifyCode
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000)

                await existingUserByEmail.save()
            }
        }
        else {
            const hashedPassword = await bcrypt.hash(password, 10)
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours() + 1)

            const newUser = new UserModel({
                userName,
                email,
                password: hashedPassword,
                verifyCode: verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                role: "user",
            })

            await newUser.save()
        }


        // send varification email
        const emailResponse = await sendVerificationEmail(email, userName, verifyCode)

        if (!emailResponse.success) {
            return Response.json(
                new ApiResponse(false, 401, {}, emailResponse.message),
                {status:401}
            )
        }

        return Response.json(
            new ApiResponse(true, 200, {}, "User registered successfully . Please verify through your email"),
            {status:200}
        )

    } catch (error) {
        return Response.json(
            new ApiResponse(false, 500, {}, "Error while registering user"),
            { status: 500 }
          );
        // throw new ApiError(401,"errrorr")
    }
}