"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { signUpSchema } from "@/schemas/signUpSchema"
import { useState } from "react"
import { ApiResponse } from "@/helpers/ApiResponse"
import axios, { AxiosError } from "axios"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import Link from "next/link"




const Page = () => {
    const [userName, setUserName] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { toast } = useToast()
    const router = useRouter()


    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            userName: '',
            email: '',
            password: '',
        }
    })


    const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
        setIsSubmitting(true)
        try {
            const response = await axios.post<ApiResponse>('/api/signup', data)
            console.log(response.data.message, "************")
            console.log(response, "************")
            toast({
                title: 'Success',
                description: response.data.message,
                className:'toast-success'
            })
            router.replace(`/verify/${userName}`)
            setIsSubmitting(false)
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>
            let errorMessage = axiosError.response?.data.message
            console.log(errorMessage, "8888888888888")
            toast({
                title: "Signup Failed",
                description: errorMessage || "Signup failed",
                className:'toast-error'
            })
            setIsSubmitting(false)
        }
    }



    return (
        <>
            <div className='flex justify-center items-center min-h-screen bg-green-900 text-white'>
                <div className="w-full max-w-md p-8 space-y-8 glass-container rounded-lg shadow-md">
                    <div className="text-center">
                        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                            Join Green Foundation
                        </h1>
                        <p className="mb-4">
                            Sign up to embark on your anonymous adventure
                        </p>
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="userName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input placeholder="username" className="bg-green-800"
                                                {...field}
                                                onChange={(e) => {
                                                    field.onChange(e)
                                                    setUserName(e.target.value)
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type='email' placeholder="email" className="bg-green-800"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl >
                                            <Input type="password" placeholder="password" className="bg-green-800 "
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" disabled={isSubmitting} className=" text-gray-900 bg-green-100 hover:bg-green-700 hover:text-white">
                                {
                                    isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                                        </>
                                    ) : ('Sign Up')
                                }
                            </Button>
                        </form>
                    </Form>
                    <div className="text-center mt-4">
                        <p>
                            Already a member?{' '}
                            <Link href="/signin" className="text-green-100 hover:text-green-300">Sign In</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )


}


export default Page