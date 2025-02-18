'use client'

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { signInSchema } from "@/schemas/signInSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { signIn } from "next-auth/react"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { parseCookies, setCookie } from 'nookies';


const Page = () => {

    const [isSubmitting, setIsSubmitting] = useState(false)
    const { toast } = useToast()
    const router = useRouter()

    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    })

    const onSubmit = async (data: z.infer<typeof signInSchema>) => {

        setIsSubmitting(true)
        
        const platform = 'ecommerce'; 
        const result = await signIn('credentials', {
            redirect: false,
            email: data.email,
            password: data.password, 
            platform:'ecommerce'   ,
                //  callbackUrl: `/api/auth/signin?platform=${platform}`
        })

        // console.log('Existing Cookies****************************:', parseCookies());

        // Set a cookie with the platform name

        // console.log("==========", result)
        if (result?.error) {
            // console.log("==========")
            if (result?.error == 'CredentialsSignin') {
                console.log("=********=")
                toast({
                    title: 'Login Failed',
                    description: 'Incorrect username or password',
                    className: 'toast-error'
                })
                setIsSubmitting(false)
            }
            else {
                toast({
                    title: "Error",
                    description: result.error,
                    className: 'toast-error'
                })
                setIsSubmitting(false)
            }
        }
        if (result?.url) {
            toast({
                title: 'Success',
                description: "Login Successfully",
                className: 'toast-success'
            })
            router.replace('/get-involved')
            setIsSubmitting(false)
        }
    }


    return (
        <>
            <Head>
                <title>Login for Green E-commerce </title>
                <meta name="description" content="This is the login page for Green E-commerce." />
            </Head>

<div className="absolute z-50 w-full">

            <div className="flex flex-col md:flex-row justify-evenly min-h-screen items-center gap-6 p-4 bg-[#f4f6f5]">
                {/* {/* <div className="w-full md:w-1/2 lg:w-1/3 p-8 space-y-8 glass-container  rounded-lg shadow-slate-600 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border border-white border-opacity-20"> */}
                <div className="w-full md:w-1/2 lg:w-1/3 p-8 space-y-8 glass-container border-0 border-t-4 border-green-700  rounded-lg shadow-slate-600 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg  border-opacity-100">


                    <div className="text-center">
                        <h1 className="text-3xl font-bold tracking-tight lg:text-3xl mb-6">
                            SignIn to Green E-commerce
                        </h1>
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name='email'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="email"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='password'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" disabled={isSubmitting} className=" w-auto py-3 text-white bg-green-700 hover:bg-green-800 hover:text-white rounded-lg transition-colors duration-300">
                                {
                                    isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />Please Wait
                                        </>
                                    ) : ('Sign In')
                                }
                            </Button>
                        </form>
                    </Form>
                    <div className="text-center mt-4">
                        <p>
                            New to Green E-commerce.{' '}
                            <Link href="/signup" className="text-green-700 hover:text-green-800 hover:underline">Sign Up</Link>
                        </p>
                    </div>
                </div>
                <div className="hidden md:flex w-[40%]">
                    <img src="signup-planting-tree.png" alt="Planting tree" />
                </div>
            </div>
</div>

        </>
    )

}


export default Page





// 'use client'
// import { signIn } from "next-auth/react";
// import { useState } from "react";

// export default function EcommerceSignIn() {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState("");

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         // Perform sign-in using NextAuth and append platform query
//         const result = await signIn('credentials', {
//             redirect: false,  // don't redirect immediately, we handle it manually
//             email,
//             password,
//             platform: 'ecommerce',  // platform parameter
//         });

//         if (result?.error) {
//             setError(result.error);
//         } else {
//             // Redirect to dashboard, appending platform
//             window.location.href = `/api/auth/callback/credentials?platform=ecommerce&callbackUrl=/get-involved`;
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <input 
//                 type="email" 
//                 placeholder="Email" 
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)} 
//             />
//             <input 
//                 type="password" 
//                 placeholder="Password" 
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)} 
//             />
//             <button type="submit">Sign in</button>
//             {error && <p>{error}</p>}
//         </form>
//     );
// }
