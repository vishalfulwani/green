'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { ApiResponse } from '@/helpers/ApiResponse'
import axios, { AxiosError } from 'axios'
import { Loader2 } from 'lucide-react'
import Head from 'next/head'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

function Page() {
    const [isCreated, setIsCreated] = useState(false)

    const { toast } = useToast()


    interface SponserFormValues {
        name: string;
        link?: string;
        image: File[];
    }

    const form = useForm<SponserFormValues>({
        defaultValues: {
            name: '',
            link: '',
            image: [],
        }
    })


    // form submit
    const onSubmit = async (data: any) => {
        setIsCreated(true)
        console.log("-----66666-----", data.image)
        const formData = new FormData()
        formData.append('name', data.name || '')
        formData.append('link', data.link || '')
        formData.append('image', data.image || '')

        console.log(formData.get('image'))
        console.log(formData.get('name'))
        console.log(formData.get('link'))

        try {
            const response = await axios.post('/api/admin/add-sponsor', formData)
            toast({
                title: "Success",
                description: response.data.message,
                className: 'toast-success'
            })
            setIsCreated(false)
            form.reset()
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>
            let errorMessage = axiosError.response?.data.message
            toast({
                title: "Product add failed",
                description: errorMessage || "Product add failed",
                className: 'toast-error'
            })
            setIsCreated(false)
        }
    }

    return (
        <>
            <Head>
                <title>Admin Sponsors - Green Foundation</title>
                <meta name="description" content="This is the sponsors data page of green foundation." />
            </Head>
            <div>
                <div className="container mx-auto px-6 mt-16 py-10">
                    <h1 className="text-3xl font-bold leading-tight mb-4">Add Sponsors</h1>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Sponser Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Product Name" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="link"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Link</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Product Description" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="image"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Image</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="file"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0]; // Get the first selected file
                                                    field.onChange(file); // Update the form state with the file
                                                }}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" disabled={isCreated} className="button button-green hover:bg-transparent">
                                {isCreated ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                                    </>
                                ) : ('Add Sponser')}
                            </Button>
                        </form>
                    </Form>

                </div>
            </div>
        </>

    )
}

export default Page
