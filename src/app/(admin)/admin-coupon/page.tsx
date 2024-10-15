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



    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Filtered users based on search term
    const filteredCoupons = coupons.filter(
        (user) =>
            user.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.discountPercentage.toLowerCase().includes(searchTerm.toLowerCase())
    );



    //   pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCoupons = filteredCoupons.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredCoupons.length / itemsPerPage);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };


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
                        <div className="p-8 bg-white border-t-4 border-green-700 rounded-xl shadow-xl">
                            {/* Search Bar */}
                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder="Search by Code"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="px-5 py-3 border border-gray-400 rounded-md w-full focus:outline-none focus:ring-4 focus:ring-[#80a382] focus:border-transparent shadow-lg transition duration-300 ease-in-out text-gray-700"

                                />
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto scrollbar-hide">


                                <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
                                    <thead>
                                        <tr className="bg-green-700 text-white">
                                            <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wide">Code</th>
                                            <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wide">Discount Percentage</th>
                                            <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wide">Limit</th>
                                            <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wide">Applied By</th>
                                            <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wide">Created At</th>
                                            <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wide">Expiry Date</th>
                                            <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wide">Active</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            currentCoupons.map((coupon, index) => (
                                                <tr key={coupon._id.toString()} 
                                  className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-50'} hover:bg-gray-200 transition duration-200`}
                                                
                                                >
                                                    <td className="py-4 px-6 ">{coupon.code}</td>
                                                    <td className="py-4 px-6 ">{coupon.discountPercentage}</td>
                                                    <td className="py-4 px-6 ">{coupon.limit}</td>
                                                    <td className="py-4 px-6 ">{coupon.appliedBy.length}</td>
                                                    <td className="py-4 px-6 ">{new Date(coupon.createdAt).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                    })}</td>
                                                    <td className="py-4 px-6 ">{new Date(coupon.expirationDate).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                    })}</td>
                                                    <td className="py-4 px-6 ">{coupon.isActive ? 'Active' : 'Inactive'}</td>
                                                </tr>
                                            ))
                                        }

                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-8 flex justify-between items-center space-x-4">
                                <button
                                    onClick={handlePrevPage}
                                    disabled={currentPage === 1}
                                    className={`px-6 py-2 rounded-full shadow-md font-semibold text-lg ${currentPage === 1
                                            ? 'bg-gray-300 text-gray-700'
                                            : 'bg-green-800 text-white  hover:bg-green-700'
                                        } transition duration-200 ease-in-out transform hover:scale-105`}
                                >
                                    Previous
                                </button>
                                <span className="font-semibold text-gray-800 text-xl">
                                    Page {currentPage} of {totalPages}
                                </span>
                                <button
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPages}
                                    className={`px-6 py-2 rounded-full shadow-md font-semibold text-lg ${currentPage === totalPages
                                            ? 'bg-gray-300 text-gray-700'
                                            : 'bg-green-800 text-white  hover:bg-green-700'
                                        } transition duration-200 ease-in-out transform hover:scale-105`}
                                >
                                    Next
                                </button>
                            </div>

                        </div>

                    )}
                </div>

                <div className='container mb-6 flex justify-center'>
                    <Link href="/admin-coupon/add-coupon" className='px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-green-500 hover:scale-105'>
                        Add Coupon
                    </Link>
                </div>
            </div>
        </>

    )
}

export default Page
