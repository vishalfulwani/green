'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { ApiResponse } from '@/helpers/ApiResponse'
import { ISponsor } from '@/models/sponsor.models'
import { sponsorSchema } from '@/schemas/sponsorSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { Loader2 } from 'lucide-react'
import mongoose from 'mongoose'
import React, { useEffect, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { z } from 'zod'

function Page() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isCreated, setIsCreated] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [sponsors, setSponsors] = useState<ISponsor[]>([])

    const { toast } = useToast()

    // api data fetch
    useEffect(() => {
        const fetchSponsors = async () => {
            setIsSubmitting(true)
            try {
                const allSponsors = await axios.get<ApiResponse>('/api/get-sponsor')
                const sponsorData = allSponsors.data.data as []
                setSponsors(sponsorData)
            } catch (error) {
                console.error("Error fetching sponsors:", error)
            } finally {
                setIsSubmitting(false)
            }
        }

        fetchSponsors()
    }, [])


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

    // delete sponsor
    const onDelete = async (sponsorId: mongoose.Types.ObjectId) => {
        try {
            setIsDeleting(true)
            console.log(sponsorId)
            const response = await axios.post<ApiResponse>('/api/admin/delete-sponsor', {
                sponsorId: sponsorId
            })
            toast({
                title: "Success",
                description: response.data.message,
                className: 'toast-success'
            })
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>
            let errorMessage = axiosError.response?.data.message
            toast({
                title: "Sponsor delete failed",
                description: errorMessage || "Sponsor delete failed",
                className: 'toast-error'
            })
        }
        finally {
            setIsDeleting(false)
        }
    }

    return (
        <div>
            <div className="container mx-auto px-6 my-16 py-16">
                <h1 className="text-3xl font-bold leading-tight mb-4">Sponsors</h1>
                {isSubmitting ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                    </>
                ) : (
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Name</th>
                                <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Link</th>
                                <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Image</th>
                                <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sponsors.map((sponsor) => (
                                <tr key={sponsor._id.toString()}>
                                    <td className="py-2 px-4 border-b border-gray-200">{sponsor.name}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{sponsor.link}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">
                                        <img src={sponsor.image} alt={sponsor.name} className='h-8 w-12' />
                                    </td>
                                    <td className="py-2 px-4 border-b border-gray-200">              
                                        <Button type="button" disabled={isDeleting} onClick={()=>onDelete(sponsor._id)} className="text-white bg-green-500 hover:bg-green-300 hover:text-gray-800">
                                        {isDeleting ? (    <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                                            </>
                                        ) : ('Delete')}
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <div className="container mx-auto px-6 py-16">
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








                        <Button type="submit" disabled={isCreated} className="text-white bg-green-500 hover:bg-green-300 hover:text-gray-800">
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
    )
}

export default Page
