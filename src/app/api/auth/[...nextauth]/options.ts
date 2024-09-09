
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import dbConnect from "@/dbconfig/dbConnect";
import UserModel from "@/models/user.models";
import DonationModel from "@/models/donation.models";
import { ApiResponse } from "@/helpers/ApiResponse";

// Unified Authentication Options
export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
                platform: { label: "Platform", type: "text" } // Add platform to differentiate between E-commerce and Foundation
            },
            async authorize(credentials: any): Promise<any> {
                await dbConnect();
                console.log(credentials.platform,"======")

                try {
                    let user;

                    // Check the platform to decide where to find the user
                    if (credentials.platform === "ecommerce") {
                        user = await UserModel.findOne({ email: credentials.email });
                        if (!user) {
                            // return Response.json(
                            //     new ApiResponse(false, 400, {}, "User not found"),
                            //     { status: 400 }
                            // )
                            // console.log("User not found");
                            // return null;
                        throw new Error('No user found with this email')
                        
                    }
                    if (!user.isVerified) {
                        // return  Response.json(
                            //     new ApiResponse(false, 400, {}, "User not verified"),
                            //     { status: 400 }
                            // );
                            throw new Error('Please verify your account before login')
                            
                        }
                    } else if (credentials.platform === "foundation") {
                        console.log("ppppppp")
                        user = await DonationModel.findOne({ email: credentials.email });
                        
                        console.log("**********",user)
                        if (!user) {
                            throw new Error('No user found with this email')
                            // return Response.json(
                            //     new ApiResponse(false,500,{},'No user found with this email'),
                            //     {status:500}
                            // )
                        }
                    }

                    console.log("**********",user)
                    // Verify password
                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
                    if (isPasswordCorrect) {
                        return user;
                    }
                       
                    // console.log(isPasswordCorrect)
                    // return Response.json(
                    //     new ApiResponse(false, 400, {}, "Incorrect password"),
                    //     { status: 400 }
                    // );
                    throw new Error('Incorrect Password')
                } catch (error) {
                    // return Response.json(
                    //     new ApiResponse(false, 500, {}, "Error during login"),
                    //     { status: 500 }
                    // );
                    throw new Error("Email or Password is incorrect")                    

                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user, account }) {
            if (user) {
                token._id = user._id?.toString();
                // token.userName = user.userName || user.donorName;
                token.userName = (user as any).userName || (user as any).donorName;
                token.role = user.role;

                // Add platform information to token
                token.platform = account?.provider === 'credentials' && account?.providerAccountId?.includes('ecommerce')
                    ? "ecommerce"
                    : "foundation";
            }
            return token;
        },
        async session({ session, token }) {
            session.user._id = token._id;
            session.user.userName = token.userName;
            session.user.role = token.role;
            session.platform = token.platform;
            return session;
        },
    },
    pages: {
        signIn: '/signin', // Unified sign-in page (you can check the platform on this page)
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};
