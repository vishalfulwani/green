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




    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Filtered users based on search term
    const filteredUsers = sponsors.filter(
        (user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.link.toLowerCase().includes(searchTerm.toLowerCase())
    );



    //   pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentSponsors = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

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
                <title>Admin Sponsors - Green Foundation</title>
                <meta name="description" content="This is the sponsors data page of green foundation." />
            </Head>
            <div>
                <div className="sm:container p-1 sm:mx-auto sm:px-6 my-16 sm:py-16 ">
                    <h1 className="text-3xl font-bold leading-tight mb-4">Sponsors</h1>
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                        </>
                    ) : (
                        <div className="p-8 bg-white border-t-4 border-green-700 rounded-xl shadow-xl">
                            {/* Search bar */}
                            <div className="mb-8">
                                <input
                                    type="text"
                                    className="px-5 py-3 border border-gray-400 rounded-md w-full focus:outline-none focus:ring-4 focus:ring-[#80a382] focus:border-transparent shadow-lg transition duration-300 ease-in-out text-gray-700"
                                    placeholder="Search by sponsor name or link"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto scrollbar-hide py-4">
                                <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
                                    <thead>
                                        <tr className="bg-green-700 text-white">
                                            <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wide">Name</th>
                                            <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wide">Link</th>
                                            <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wide">Image</th>
                                            <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wide">Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {currentSponsors
                                            .map((sponsor, index) => (
                                                <tr key={sponsor._id.toString()}
                                                    className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-50'} hover:bg-gray-200 transition duration-200`}

                                                >
                                                    <td className="py-4 px-6 border-b border-gray-200">{sponsor.name}</td>
                                                    <td className="py-4 px-6 border-b border-gray-200">{sponsor.link}</td>
                                                    <td className="py-4 px-6 border-b border-gray-200">
                                                        <img src={sponsor.image} alt={sponsor.name} className="h-8 w-12 rounded shadow-md" />
                                                    </td>
                                                    <td className="py-4 px-6 border-b border-gray-200">
                                                        <button
                                                            type="button"
                                                            disabled={isDeleting}
                                                            onClick={() => onDelete(sponsor._id)}
                                                            className={`px-4 py-2 rounded-full shadow-md font-semibold text-sm transition duration-300 ease-in-out ${isDeleting
                                                                ? 'bg-gray-300 text-gray-600'
                                                                : 'bg-red-600 text-white hover:bg-red-400 hover:scale-105'
                                                                }`}
                                                        >
                                                            {isDeleting ? (
                                                                <>
                                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                                                                </>
                                                            ) : (
                                                                'Delete'
                                                            )}
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="mt-8 flex justify-between items-center space-x-4 text-lg">
                                <button
                                    className={`px-6 py-2 rounded-full shadow-md font-semibold text-lg ${currentPage === 1
                                        ? 'bg-gray-300 text-gray-700'
                                        : 'bg-green-800 text-white hover:bg-green-700'
                                        } transition duration-200 ease-in-out transform hover:scale-105`}
                                    onClick={handlePrevPage}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </button>
                                <span className="font-semibold text-gray-800 text-xl">Page {currentPage} of {totalPages}</span>
                                <button
                                    className={`px-6 py-2 rounded-full shadow-md font-semibold text-lg ${currentPage === totalPages
                                        ? 'bg-gray-300 text-gray-700'
                                        : 'bg-green-800 text-white hover:bg-green-700'
                                        } transition duration-200 ease-in-out transform hover:scale-105`}
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </button>
                            </div>
                        </div>

                    )}
                </div>

                <div className='container mb-6 flex justify-center'>

                    <Link href="/admin-sponsors/add-sponsor" className='px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-green-500 hover:scale-105'>
                        Add Sponsor
                    </Link>
                </div>
            </div>
        </>

    )
}

export default Page
