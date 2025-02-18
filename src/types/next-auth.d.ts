// import "next-auth";
// import { DefaultSession } from "next-auth";

// declare module 'next-auth'{
//     interface User{
//         _id?: string;
//         isVerified?: boolean;
//         // isAcceptingMessage?: boolean;
//         userName?: string;
//         role?:string;
//         platform?:string;
//         address?: {
//             street: string | null;
//             city: string | null;
//             state: string | null;
//             postalCode: string | null;
//         };
//     }
//     interface Session{
//         platform?:string;
//         address?: {
//             street: string | null;
//             city: string | null;
//             state: string | null;
//             postalCode: string | null;
//         };
//         user:{
//             _id?: string;
//             isVerified?: boolean;
//             // isAcceptingMessage?: boolean;
//             userName?: string;
//             role?:string;
//         } & DefaultSession['user']
//     }
// }

// declare module 'next-auth/jwt'{
//     interface JWT{
//         _id?: string;
//         isVerified?: boolean;
//         // isAcceptingMessage?: boolean;
//         userName?: string;
//         role?:string
//         platform?:string;
//         address?: {
//             street: string | null;
//             city: string | null;
//             state: string | null;
//             postalCode: string | null;
//         };
//     }
// }



import { DefaultSession } from "next-auth";

declare module 'next-auth' {
    interface User {
        _id?: string;
        isVerified?: boolean;
        userName?: string;
        role?: string;
        platform?: string;
        address?: {
            street: string | null;
            city: string | null;
            state: string | null;
            postalCode: string | null;
        } | null; // Allow address to be null
        phone?:string;
    }

    interface Session {
        platform?: string;
        address?: {
            street: string | null;
            city: string | null;
            state: string | null;
            postalCode: string | null;
        } | null; // Allow address to be null
        user: {
            _id?: string;
            isVerified?: boolean;
            userName?: string;
            role?: string;
        } & DefaultSession['user'];
        phone?:string;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        _id?: string;
        isVerified?: boolean;
        userName?: string;
        role?: string;
        platform?: string;
        address?: {
            street: string | null;
            city: string | null;
            state: string | null;
            postalCode: string | null;
        } | null; // Allow address to be null
    }
}
