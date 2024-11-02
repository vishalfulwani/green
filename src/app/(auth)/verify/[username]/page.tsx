'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { ApiResponse } from '@/helpers/ApiResponse'
import { verifySchema } from '@/schemas/verifySchema'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { Loader2 } from 'lucide-react'
import Head from 'next/head'
import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'





const Page = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()
    const params = useParams<{ username: string }>()
    const { toast } = useToast()

    const form = useForm<z.infer<typeof verifySchema>>({
        resolver: zodResolver(verifySchema)
    })

    const onSubmit = async (data: z.infer<typeof verifySchema>) => {
        setIsSubmitting(true)
        try {
            const response = await axios.post<ApiResponse>('/api/verify-code', {
                userName: params.username,
                code: data.code
            })
            toast({
                title: 'success',
                description: response.data.message,
                className: 'toast-success'
            })
            router.replace('/ecommerce-signin')
            setIsSubmitting(false)
        }
        catch (error) {
            const axiosError = error as AxiosError<ApiResponse>
            let errorMessage = axiosError.response?.data.message
            toast({
                title: "Error",
                description: errorMessage,
                className: 'toast-error'
            })
            setIsSubmitting(false)
        }
    }



    return (
        <>
            <Head>
                <title>Verify </title>
                <meta name="description" content="This is the verify page." />
            </Head>
           
        <div className="absolute z-50">
            <div className="flex flex-col md:flex-row justify-evenly min-h-screen items-center gap-6 p-4 bg-[#4cb495]">
                <div className="w-full md:w-1/2 lg:w-1/3 p-8 space-y-8 glass-container  rounded-lg shadow-slate-600 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border border-white border-opacity-20">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold tracking-tight lg:text-3xl mb-6">
                            Verify Your Account
                        </h1>
                        <p className="mb-4">
                            Please enter the verification code that was sent to your email.
                        </p>
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                            <FormField
                                control={form.control}
                                name="code"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Verification Code</FormLabel>
                                        <FormControl>
                                            <Input placeholder='code'  {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" disabled={isSubmitting} className="w-auto py-3 text-white bg-green-700 hover:bg-green-300 hover:text-gray-800 rounded-lg transition-colors duration-300">
                                {
                                    isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                                        </>
                                    ) : ('Submit')
                                }
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
        </>
    )
}


export default Page