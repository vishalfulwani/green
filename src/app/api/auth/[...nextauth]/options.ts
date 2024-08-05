import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt"
import dbConnect from "@/dbconfig/dbConnect";
import UserModel, { IUser } from "@/models/user.models";



export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id:'credentials',
            name:'Credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                // userName: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials:any):Promise<any>{
                await dbConnect()
                console.log("****")
                try {
                    console.log("****")
                    // console.log(credentials.identifier.email,"===")
                    console.log(credentials.email,"===")
                    console.log("***")
                    // console.log(credentials.password,"===")
                    const user = await UserModel.findOne({
                        $or:[
                            {email : credentials.email},
                            // {userName : credentials.identifier.userName},
                        ]
                    })
                    console.log("***")
                    console.log(user,"oooo")
                    if (!user){
                        console.log("***")
                        throw new Error('No user found with this email')
                    }
                    if (!user.isVerified){
                        console.log("***verified")
                        throw new Error('Please verify your account before login')
                    }
                    console.log(credentials.password , "kkkk",user.password)
                    const isPasswordCorrect = await bcrypt.compare(credentials.password,user.password)
                    console.log("correct",isPasswordCorrect)
                    if (isPasswordCorrect){
                        return user
                    }
                    throw new Error('Incorrect Password')
                } 
                catch (error) {
                    throw new Error("Email or Password is incorrect")                    
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user}) {
            if (user){
                token._id = user._id?.toString()
                token.isVerified = user.isVerified
                token.isAcceptingMessage = user.isAcceptingMessage
                token.userName = user.userName
                token.role = user.role

            }
           return token
        },
        async session({ session, token }) {
            if (token){
                session.user._id = token._id
                session.user.isVerified = token.isVerified
                session.user.isAcceptingMessage = token.isAcceptingMessage
                session.user.userName = token.userName
                session.user.role = token.role
                
            }
            
            return session
          },
    },
    pages: {
        signIn: '/signin',
    },
    session:{
        strategy:"jwt"
    },
    secret : process.env.NEXTAUTH_SECRET
}