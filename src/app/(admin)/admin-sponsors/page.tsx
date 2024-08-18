'use client'

import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { ApiResponse } from '@/helpers/ApiResponse'
import { ISponsor } from '@/models/sponsor.models'
import axios, { AxiosError } from 'axios'
import { Loader2 } from 'lucide-react'
import mongoose from 'mongoose'
import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

function Page() {
    const [isSubmitting, setIsSubmitting] = useState(false)
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
        <>
            <Head>
                <title>Admin Sponsors - Green Foundation</title>
                <meta name="description" content="This is the sponsors data page of green foundation." />
            </Head>
            <div>
                <div className="container mx-auto px-6 mt-16 py-10 ">
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
                                            <Button type="button" disabled={isDeleting} onClick={() => onDelete(sponsor._id)} className="text-white bg-green-500 hover:bg-green-300 hover:text-gray-800">
                                                {isDeleting ? (<>
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

                <div className='container mb-6 '>

                    <Link href="/admin-sponsors/add-sponsor" className='button-green button'>
                        Add Sponsor
                    </Link>
                </div>
            </div>
        </>

    )
}

export default Page
