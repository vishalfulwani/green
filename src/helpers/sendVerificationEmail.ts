
import { resend } from "@/lib/resend";
import { ApiError } from "./ApiError";
import { ApiResponse } from "./ApiResponse";
import VerificationEmail from "@/components/VerificationEmail";

export async function sendVerificationEmail(
    email: string,
    userName:string,
    verifyCode:string,
): Promise<ApiResponse>{

    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Email Verification',
            react: VerificationEmail({ userName , otp :verifyCode }),
        })
        return {success:true,statusCode:201,message:"Verification email send successfully"}
    }catch(emailError){
        console.log("Error sending verification email",emailError)
        return {success:false,statusCode:500,message:"failed to send verification email"}
    }
}