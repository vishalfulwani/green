
'use client'

import { ApiResponse } from '@/helpers/ApiResponse'
import { IDonation } from '@/models/donation.models'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'



function Page() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [donations, setDonations] = useState<IDonation[]>([])


    // Api data fetch
    useEffect(() => {
        const fetchDonations = async () => {
            setIsSubmitting(true)
            try {
                const allDonations = await axios.get<ApiResponse>('/api/get-donation')
                const donationData = allDonations.data.data as IDonation[]
                setDonations(donationData)
            } catch (error) {
                console.error("Error fetching donations:", error)
            } finally {
                setIsSubmitting(false)
            }
        }

        fetchDonations()
    }, [])


    return (
        <>
            <Head>
                <title>Admin Donations - Green Foundation</title>
                <meta name="description" content="This is the donations data page of Green Foundation." />
            </Head>
            <div >
                <div className="container mx-auto px-6 mt-16  py-10 ">
                    <h1 className="text-3xl font-bold leading-tight mb-4">Donations</h1>
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                        </>
                    ) : (
                        <div className="overflow-x-auto">

                        <table className="min-w-full bg-white">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Donor Name</th>
                                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Donor Email</th>
                                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Contact</th>
                                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Amount</th>
                                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Status</th>
                                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Created At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {donations.map((donation) => (
                                    <tr key={donation._id.toString()}>
                                        <td className="py-2 px-4 border-b border-gray-200">{donation.donorName}</td>
                                        <td className="py-2 px-4 border-b border-gray-200">{donation.donorEmail}</td>
                                        <td className="py-2 px-4 border-b border-gray-200">{donation.donorContact}</td>
                                        <td className="py-2 px-4 border-b border-gray-200">{donation.amount}</td>
                                        <td className="py-2 px-4 border-b border-gray-200">{donation.status}</td>
                                        <td className="py-2 px-4 border-b border-gray-200">{donation.createdAt.toLocaleDateString()}</td>                                                                   
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        </div>
                    )}
                </div>
            </div> 
        </>

    )
}

export default Page

