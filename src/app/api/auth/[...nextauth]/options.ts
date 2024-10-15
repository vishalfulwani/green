
// import { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcrypt";
// import dbConnect from "@/dbconfig/dbConnect";
// import UserModel from "@/models/user.models";
// import DonationModel from "@/models/donation.models";
// import { ApiResponse } from "@/helpers/ApiResponse";

// // Unified Authentication Options
// export const authOptions: NextAuthOptions = {
//     providers: [
//         CredentialsProvider({
//             id: 'credentials',
//             name: 'Credentials',
//             credentials: {
//                 email: { label: "Email", type: "text" },
//                 password: { label: "Password", type: "password" },
//                 platform: { label: "Platform", type: "text" } // Add platform to differentiate between E-commerce and Foundation
//             },
//             async authorize(credentials: any): Promise<any> {
//                 await dbConnect();
//                 console.log(credentials.platform, "======")

//                 try {
//                     // let user;

//                     // Check the platform to decide where to find the user
//                     if (credentials.platform === "ecommerce") {
//                         const user = await UserModel.findOne({ email: credentials.email });
//                         if (!user) {
//                             // return Response.json(
//                             //     new ApiResponse(false, 400, {}, "User not found"),
//                             //     { status: 400 }
//                             // )
//                             // console.log("User not found");
//                             // return null;
//                             throw new Error('No user found with this email')

//                         }
//                         if (!user.isVerified) {
//                             // return  Response.json(
//                             //     new ApiResponse(false, 400, {}, "User not verified"),
//                             //     { status: 400 }
//                             // );
//                             throw new Error('Please verify your account before login')

//                         }
//                         const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
//                         if (isPasswordCorrect) {
//                             return user;
//                         }
//                         throw new Error('Incorrect Password')

//                     } else if (credentials.platform === "foundation") {
//                         console.log("ppppppp", credentials.email)
//                         console.log("ppppppp", credentials.password)
//                         console.log("ppppppp", credentials.platform)
//                         const user = await DonationModel.findOne({ donorEmail: credentials.email });

//                         console.log("**********", user)
//                         if (!user) {
//                             throw new Error('No user found with this email')
//                             // return Response.json(
//                             //     new ApiResponse(false,500,{},'No user found with this email'),
//                             //     {status:500}
//                             // )
//                         }
//                         const isPasswordCorrect = await bcrypt.compare(credentials.password, user.donorEmailPassword);
//                         console.log(isPasswordCorrect)
//                         if (isPasswordCorrect) {
//                             return user;
//                             // return { ...user.toObject(), platform: credentials.platform };
//                         }
//                         throw new Error('Incorrect Password')

//                     }
//                 } catch (error) {
//                     throw new Error("Email or Password is incorrect")

//                 }
//             }
//         })
//     ],
//     callbacks: {
//         async jwt({ token, user, account }) {
//             if (user) {
//                 token._id = user._id?.toString();
//                 // token.userName = user.userName || user.donorName;
//                 token.userName = (user as any).userName || (user as any).donorName;
//                 token.role = user.role;
//                 token.email = (user as any).email || (user as any).donorEmail
//                 // Add platform information to token

//                 // token.platform = account?.provider === 'credentials' && account?.providerAccountId?.includes('ecommerce')
//                 //     ? "ecommerce"
//                 //     : "foundation";
//                 token.platform = user.platform;


//                 token.address = (user as any).address ? {
//                     street: (user as any).address.street,
//                     city: (user as any).address.city,
//                     state: (user as any).address.state,
//                     postalCode: (user as any).address.postalCode
//                   } : null;
//             }
//             return token;
//         },
//         async session({ session, token }) {
//             session.user._id = token._id;
//             session.user.userName = token.userName;
//             session.user.email = token.email;
//             session.user.role = token.role;
//             session.platform = token.platform;

//             session.user.address = token.address || {
//                 street: null,
//                 city: null,
//                 state: null,
//                 postalCode: null,
//               };
//             return session;
//         },
//     },
//     pages: {
//         signIn: '/signin', // Unified sign-in page (you can check the platform on this page)
//     },
//     session: {
//         strategy: "jwt",
//     },
//     secret: process.env.NEXTAUTH_SECRET,
// };





import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import dbConnect from "@/dbconfig/dbConnect";
import UserModel from "@/models/user.models";
import DonationModel from "@/models/donation.models";

// Unified Authentication Options
export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
                platform: { label: "Platform", type: "text" } // To differentiate between E-commerce and Foundation
            },
            async authorize(credentials: any): Promise<any> {
                await dbConnect();
                console.log(credentials.platform, "======");

                try {
                    let user;
                    // Check the platform to decide where to find the user
                    if (credentials.platform === "ecommerce") {
                        user = await UserModel.findOne({ email: credentials.email });
                        
                        console.log("",user)
                        if (!user) {
                            throw new Error('No user found with this email');
                        }
                        if (!user.isVerified) {
                            throw new Error('Please verify your account before login');
                        }
                        
                        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
                        if (!isPasswordCorrect) {
                            throw new Error('Incorrect Password');
                        }
                        
                        // Add platform to user object for JWT and session use
                        // return { ...user.toObject(), platform: 'ecommerce' };
                        const userWithAddress = {
                            ...user.toObject(),
                            platform: 'ecommerce',
                            address: user.address || {
                                street: null,
                                city: null,
                                state: null,
                                postalCode: null,
                            }
                        };
                        
                        return userWithAddress;

                    } else if (credentials.platform === "foundation") {
                        user = await DonationModel.findOne({ donorEmail: credentials.email });

                        console.log("userrrrrrrrrrrr",user)
                        if (!user) {
                            throw new Error('No user found with this email');
                        }
                        
                        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.donorEmailPassword);
                        console.log("***",isPasswordCorrect)
                        if (!isPasswordCorrect) {
                            throw new Error('Incorrect Password');
                        }

                        // Add platform to user object for JWT and session use
                        // console.log("----",user)
                        return { ...user.toObject(), platform: 'foundation' };
                    }
                } catch (error) {
                    throw new Error("Email or Password is incorrect");
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id?.toString();
                token.userName = user.userName || (user as any).donorName;
                token.role = user.role;
                token.email = user.email ||  (user as any).donorEmail;
                token.platform = user.platform;

                // Include address if it exists
                token.address =  (user as any).address ? {
                    street:  (user as any).address.street,
                    city:  (user as any).address.city,
                    state:  (user as any).address.state,
                    postalCode:  (user as any).address.postalCode
                } : null;
            }
            return token;
        },

        async session({ session, token }) {
            session.user._id = token._id;
            session.user.userName = token.userName;
            session.user.email = token.email;
            session.user.role = token.role;
            session.platform = token.platform;

            // Include address if it exists
            session.address = token.address || {
                street: null,
                city: null,
                state: null,
                postalCode: null,
            };

            return session;
        },
    },
    pages: {
        signIn: '/signin', // Unified sign-in page
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};
