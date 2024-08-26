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

        const result = await signIn('credentials', {
            redirect: false,
            email: data.email,
            password: data.password
        })
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
            toast({
                title: 'Success',
                description: "Login Successfully",
                className: 'toast-success'
            })
            router.replace('/home')
            setIsSubmitting(false)
        }
    }


    return (
        <>
            <Head>
                <title>Login </title>
                <meta name="description" content="This is the login page." />
            </Head>

            <div className='flex justify-center items-center min-h-screen bg-green-900 text-white'>
                <div className="w-full max-w-md p-8 space-y-8 glass-container rounded-lg shadow-md">
                    <div className="text-center">
                        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                            SignIn to Green Foundation
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
                                            <Input placeholder="email" className="bg-green-800 "
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
                                            <Input placeholder="password" className="bg-green-800 "
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className=" text-gray-900 bg-green-100 hover:bg-green-700 hover:text-white">
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
                            New to Green Foundation .{' '}
                            <Link href="/signup" className="text-green-100 hover:text-green-300">Sign Up</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )

}


export default Page