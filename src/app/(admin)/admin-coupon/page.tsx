'use client'

import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { ApiResponse } from '@/helpers/ApiResponse'
import { ICoupon } from '@/models/coupon.models'
import { ISponsor } from '@/models/sponsor.models'
import axios, { AxiosError } from 'axios'
import { Loader2 } from 'lucide-react'
import mongoose from 'mongoose'
import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

function Page() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [coupons, setCoupons] = useState<ICoupon[]>([])

    const { toast } = useToast()

    // api data fetch
    useEffect(() => {
        const fetchCoupons = async () => {
            setIsSubmitting(true)
            try {
                const allCoupons = await axios.get<ApiResponse>('/api/get-coupon')
                const couponData = allCoupons.data.data as []
                setCoupons(couponData)
            } catch (error) {
                console.error("Error fetching coupons:", error)
            } finally {
                setIsSubmitting(false)
            }
        }

        fetchCoupons()
    }, [])

    return (
        <>
            <Head>
                <title>Admin Coupons</title>
                <meta name="description" content="This is the coupons data page." />
            </Head>
            <div>
                <div className="container mx-auto px-6 mt-16 py-10 ">
                    <h1 className="text-3xl font-bold leading-tight mb-4">Coupons</h1>
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                        </>
                    ) : (
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Code</th>
                                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Discount Percentage</th>
                                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Created At</th>
                                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Expiry Date</th>
                                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Active</th>
                                </tr>
                            </thead>
                            <tbody>
                                {coupons.map((coupon) => (
                                    <tr key={coupon._id.toString()}>
                                        <td className="py-2 px-4 border-b border-gray-200">{coupon.code}</td>
                                        <td className="py-2 px-4 border-b border-gray-200">{coupon.discountPercentage}</td>
                                        <td className="py-2 px-4 border-b border-gray-200">{new Date(coupon.createdAt).toLocaleDateString()}</td>
                                        <td className="py-2 px-4 border-b border-gray-200">{new Date(coupon.expirationDate).toLocaleDateString()}</td>
                                        <td className="py-2 px-4 border-b border-gray-200"> {coupon.isActive ? 'Active' : 'Inactive'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                <div className='container mb-6 '>
                    <Link href="/admin-coupon/add-coupon" className='button-green button'>
                        Add Coupon
                    </Link>
                </div>
            </div>
        </>

    )
}

export default Page
