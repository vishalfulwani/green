
'use client'

import { ApiResponse } from '@/helpers/ApiResponse'
import { IDonation } from '@/models/donation.models'
import axios, { AxiosError } from 'axios'
import { Loader2 } from 'lucide-react'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { useToast } from '@/components/ui/use-toast'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'



function Page() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [donations, setDonations] = useState<IDonation[]>([])
    const [isCreated, setIsCreated] = useState(false)
    const [donationId, setDonationId] = useState("")

    const { toast } = useToast()

    // Api data fetch
    useEffect(() => {
        const fetchDonations = async () => {
            setIsSubmitting(true)
            try {
                const allDonations = await axios.get<ApiResponse>('/api/get-donation')
                const donationData = allDonations.data.data as IDonation[]
                setDonations(donationData)
                console.log("----", donationData)

            } catch (error) {
                console.error("Error fetching donations:", error)
            } finally {
                setIsSubmitting(false)
            }
        }

        fetchDonations()
    }, [])



    
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
  
     // Filtered users based on search term
    const filteredUsers = donations.filter(
      (user) =>
        user.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.donorEmail.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
  
  
  //   pagination
   const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  
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
                <title>Admin Donations - Green Foundation</title>
                <meta name="description" content="This is the donations data page of Green Foundation." />
            </Head>
            <div >
                <div className="container mx-auto px-6 mt-16  py-10 ">
                    <h1 className="text-3xl font-bold leading-tight mb-4">Foundation Users</h1>
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                        </>
                    ) : (
                        <div className="p-8 bg-white rounded-xl shadow-xl border-t-4 border-green-700">
                        {/* Search Input */}
                        <div className="mb-8">
                          <input
                            type="text"
                            placeholder="Search donations by name or email"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="px-5 py-3 border border-gray-400 rounded-md w-full focus:outline-none focus:ring-4  focus:ring-[#80a382] focus:border-transparent shadow-lg transition duration-300 ease-in-out text-gray-700"
                          />
                        </div>
                      
                        {/* Table */}
                        <div className="overflow-x-auto scrollbar-hide py-4">
                          <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
                            <thead>
                              <tr className="bg-green-700 text-white">
                                <th className="py-3 px-5 border-b text-left text-sm font-semibold uppercase tracking-wide">Donor ID</th>
                                <th className="py-3 px-5 border-b text-left text-sm font-semibold uppercase tracking-wide">Donor Name</th>
                                <th className="py-3 px-5 border-b text-left text-sm font-semibold uppercase tracking-wide">Donor Email</th>
                                <th className="py-3 px-5 border-b text-left text-sm font-semibold uppercase tracking-wide">Contact</th>
                                <th className="py-3 px-5 border-b text-left text-sm font-semibold uppercase tracking-wide">Amount</th>
                                <th className="py-3 px-5 border-b text-left text-sm font-semibold uppercase tracking-wide">Status</th>
                                <th className="py-3 px-5 border-b text-left text-sm font-semibold uppercase tracking-wide">Created At</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {filteredUsers.map((donation, index) => (
                                <tr
                                  key={donation._id.toString()}
                                  className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-50'} hover:bg-gray-200 transition duration-200`}
                                >
                                  <td className="py-3 px-5 border-b">{donation.razorpayOrderId}</td>
                                  <td className="py-3 px-5 border-b">{donation.donorName}</td>
                                  <td className="py-3 px-5 border-b">{donation.donorEmail}</td>
                                  <td className="py-3 px-5 border-b">{donation.donorContact}</td>
                                  <td className="py-3 px-5 border-b">{donation.amount}</td>
                                  <td className="py-3 px-5 border-b">
                                    <span
                                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                        donation.status === 'paid'
                                          ? 'bg-green-200 text-green-800'
                                          : 'bg-red-200 text-red-800'
                                      }`}
                                    >
                                      {donation.status}
                                    </span>
                                  </td>
                                  <td className="py-3 px-5 border-b">
                                    {new Date(donation.createdAt).toLocaleDateString('en-US', {
                                      year: 'numeric',
                                      month: 'long',
                                      day: 'numeric',
                                    })}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      
                        {/* Pagination */}
                        <div className="mt-8 flex justify-between items-center">
                          <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            className={`px-6 py-2 rounded-full shadow-md font-semibold text-lg ${
                              currentPage === 1 ? 'bg-gray-300 text-gray-700' : 'bg-green-800 text-white hover:bg-green-700'
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
                            className={`px-6 py-2 rounded-full shadow-md font-semibold text-lg ${
                              currentPage === totalPages ? 'bg-gray-300 text-gray-700' : 'bg-green-800 text-white hover:bg-green-700'
                            } transition duration-200 ease-in-out transform hover:scale-105`}
                          >
                            Next
                          </button>
                        </div>
                      </div>
                      
                    )}
                </div>
            </div>
        </>

    )
}

export default Page

