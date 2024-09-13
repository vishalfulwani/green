'use client'

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { ApiResponse } from "@/helpers/ApiResponse"
import { signInSchema } from "@/schemas/signInSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { AxiosError } from "axios"
import { Loader2 } from "lucide-react"
import { signIn } from "next-auth/react"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"


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
        
        try {
            const email = data.email as string
            const password = data.password as string
            const platform = "foundation" as string
            
    
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password,
                platform,
          
        //    callbackUrl: '/', // Redirect after sign-in
                // baseUrl: '/api/auth/foundation'
            })
            console.log(result,"****")
            if (result?.error) {
                if (result?.error == 'CredentialsSignin') {
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
                console.log(result.url,"****")
                toast({
                    title: 'Success',
                    description: "Login Successfully",
                    className: 'toast-success'
                })
                router.replace('/')
                setIsSubmitting(false)
            }
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>
            let errorMessage = axiosError.response?.data.message
            toast({
                title: "Failed",
                description: errorMessage || "Signin failed",
                className: 'toast-error'
            })
            setIsSubmitting(false)
        }
    }


    return (
        <>
            <Head>
                <title>Login to Green Foundation</title>
                <meta name="description" content="This is the login page of green foundation." />
            </Head>

            <div className="flex flex-col md:flex-row justify-evenly min-h-screen items-center gap-6 p-4 bg-[#4cb495]">
                <div className="w-full md:w-1/2 lg:w-1/3 p-8 space-y-8 glass-container  rounded-lg shadow-slate-600 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border border-white border-opacity-20">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold tracking-tight lg:text-3xl mb-6">
                            SignIn to Green Foundation
                        </h1>
                    </div>
                    <Form {...form} >
                        <form onSubmit={form.handleSubmit(onSubmit)}  className="space-y-6">
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
                            <Button type="submit" className=" w-auto py-3 text-white bg-green-700 hover:bg-green-300 hover:text-gray-800 rounded-lg transition-colors duration-300">
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
                            Please sign in using the email and password you provided during your donation.
                        </p>
                    </div>
                </div>
                <div className="w-[40%]">
                    <img src="signup-planting-tree.png" alt="Planting tree" />
                </div>
            </div>
        </>
    )

}


export default Page