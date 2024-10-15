
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


    // -----------------------
    // plantation data 
    // -----------------------

    interface PlantationFormValues {
        id: string;
        plantationImage: File[];
        plantationStatus: string;
    }

    const form = useForm<PlantationFormValues>({
        defaultValues: {
            id: '',
            plantationImage: [],
            plantationStatus: '',
        }
    })


    // plantation status
    const status = [
        { value: 'germination', label: 'Germination' },
        { value: 'growth', label: 'Growth' },
    ];

    const onDonationPlantationDataSubmit = async (data: any) => {
        setIsCreated(true)
        const formData = new FormData()
        formData.append('id', donationId || '')
        formData.append('plantationImage', data.plantationImage || '')
        formData.append('plantationStatus', data.plantationStatus || '')

        try {
            const response = await axios.post('/api/admin/add-plantation-data', formData)
            toast({
                title: 'Success',
                description: response.data.message,
                className: "toast-success"
            })
            setIsCreated(false)
            form.reset()
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>
            let errorMessage = axiosError.response?.data.message
            toast({
                title: "Error",
                description: errorMessage || "Plantation data add failed",
                className: 'toast-error'
            })
            setIsCreated(false)
        }
    }


    interface CertificateFormValues {
        id: string;
        certificate: File[];
    }

    const certificateForm = useForm<CertificateFormValues>({
        defaultValues: {
            id: '',
            certificate: [],
        }
    })

    const onCertificateSubmit = async (data: any) => {
        setIsCreated(true)
        const formData = new FormData()
        formData.append('id', donationId || '')
        formData.append('certificate', data.certificate || '')
        console.log(data.id, "===", formData.get('id'))
        try {
            const response = await axios.post('/api/admin/add-certificate', formData)
            toast({
                title: 'Success',
                description: response.data.message,
                className: "toast-success"
            })
            setIsCreated(false)
            form.reset()
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>
            let errorMessage = axiosError.response?.data.message
            toast({
                title: "Error",
                description: errorMessage || "Certificate add failed",
                className: 'toast-error'
            })
            setIsCreated(false)
        }
    }





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
    const currentUser = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

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
                    <h1 className="text-3xl font-bold leading-tight mb-4">Donations</h1>
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                        </>
                    ) : (



                        <div className="p-8 bg-white border-t-4 border-green-700 rounded-xl shadow-xl">


                            {/* Search Input */}
                            <div className="mb-8">
                                <input
                                    type="text"
                                    placeholder="Search by Donor Name and Email"
                                    className="px-5 py-3 border border-gray-400 rounded-md w-full focus:outline-none focus:ring-4 focus:ring-[#80a382] focus:border-transparent shadow-lg transition duration-300 ease-in-out text-gray-700"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="overflow-x-auto scrollbar-hide">
                                <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
                                    <thead>
                                        <tr className="bg-green-700 text-white">
                                            <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wide">Donor Id</th>
                                            <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wide">Donor Name</th>
                                            <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wide">Donor Email</th>
                                            <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wide">Contact</th>
                                            <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wide">Amount</th>
                                            <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wide">Status</th>
                                            <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wide">Created At</th>
                                            <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wide">Plantation Image</th>
                                            <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wide">Plantation Status</th>
                                            <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wide">Certificate</th>
                                            <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wide">Add Plantation Data</th>
                                            <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wide">Add Certificate</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {currentUser.map((donation, index) => (
                                            <tr key={donation._id.toString()}
                                  className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-50'} hover:bg-gray-200 transition duration-200`}
                                             
                                             >
                                                <td className="py-4 px-6 ">{donation.razorpayOrderId}</td>
                                                <td className="py-4 px-6 ">{donation.donorName}</td>
                                                <td className="py-4 px-6 ">{donation.donorEmail}</td>
                                                <td className="py-4 px-6 ">{donation.donorContact}</td>
                                                <td className="py-4 px-6 ">{donation.amount}</td>
                                                {/* <td className="py-4 px-6 ">{donation.status}</td> */}
                                                <td>

                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${donation.status === 'paid'
                                                            ? 'bg-green-200 text-green-800'
                                                            : 'bg-red-200 text-red-800'
                                                            }`}
                                                    >
                                                        {donation.status}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 ">{new Date(donation.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                                                <td className="py-4 px-6 ">{donation.plantationImage ? <img src={donation.plantationImage} className="h-12 w-12 object-cover rounded-md" alt="Plantation" /> : "add"}</td>
                                                <td className="py-4 px-6 ">{donation.plantationStatus ? donation.plantationStatus : "add"}</td>
                                                <td className="py-4 px-6 ">{donation.certificate ? <img src={donation.certificate} className="h-12 w-12 object-cover rounded-md" alt="Certificate" /> : "add"}</td>
                                                <td className="py-4 px-6 ">
                                                    {/* Add Planta4ion 6aer Button */}
                                                    {/* Popover content goes here */}
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <button className="px-4 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700 transition-colors">Add Plantation</button>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-80 bg-green-50 p-4 rounded-md shadow">
                                                            {/* Plantation form here */}
                                                            <Form {...form}>
                                                                <form onSubmit={form.handleSubmit(onDonationPlantationDataSubmit)} className="space-y-6">
                                                                    <FormField
                                                                        control={form.control}
                                                                        name="id"
                                                                        render={({ field }) => {
                                                                            // Call setDonorId when the component renders
                                                                            useEffect(() => {
                                                                                setDonationId(donation._id.toString());
                                                                            }, [donation._id]); // Run the effect whenever donation._id changes

                                                                            return (
                                                                                <FormItem>
                                                                                    <FormLabel>Donator Id</FormLabel>
                                                                                    <FormControl>
                                                                                        <Input placeholder="" value={donation._id.toString()} readOnly />
                                                                                    </FormControl>
                                                                                </FormItem>
                                                                            );
                                                                        }}
                                                                    />

                                                                    <FormField
                                                                        name="plantationStatus"
                                                                        render={({ field }) => (
                                                                            <FormItem>
                                                                                <FormLabel>Plantation Status</FormLabel>
                                                                                <FormControl>
                                                                                    <Select
                                                                                        value={field.value}
                                                                                        onValueChange={field.onChange}
                                                                                    >
                                                                                        <SelectTrigger>
                                                                                            <SelectValue placeholder="Select a status" />
                                                                                        </SelectTrigger>
                                                                                        <SelectContent>

                                                                                            {status.map((state) => (
                                                                                                <SelectItem key={state.value} value={state.value}>
                                                                                                    {state.label}
                                                                                                </SelectItem>
                                                                                            ))}
                                                                                        </SelectContent>
                                                                                    </Select>
                                                                                </FormControl>
                                                                            </FormItem>
                                                                        )}
                                                                    />

                                                                    <FormField
                                                                        control={form.control}
                                                                        name="plantationImage"
                                                                        render={({ field }) => (
                                                                            <FormItem>
                                                                                <FormLabel>Plantation Image</FormLabel>
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
                                                                        ) : ('Add Plantation Data')}
                                                                    </Button>
                                                                </form>
                                                            </Form>
                                                        </PopoverContent>
                                                    </Popover>
                                                </td>
                                                <td className="py-3 px-5 border-b">
                                                    {/* Add Certificate Popover Button */}
                                                    {/* Popover content goes here */}
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <button className="px-4 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700 transition-colors">Add Certificate</button>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-80 bg-green-50 p-4 rounded-md shadow">
                                                            {/* Certificate form here */}
                                                            <Form {...certificateForm}>
                                                                <form onSubmit={certificateForm.handleSubmit(onCertificateSubmit)} className="space-y-6">
                                                                    <FormField
                                                                        control={certificateForm.control}
                                                                        name="id"
                                                                        render={({ field }) => {
                                                                            // Call setDonorId when the component renders
                                                                            useEffect(() => {
                                                                                setDonationId(donation._id.toString());
                                                                            }, [donation._id]); // Run the effect whenever donation._id changes

                                                                            return (
                                                                                <FormItem>
                                                                                    <FormLabel>Donator Id</FormLabel>
                                                                                    <FormControl>
                                                                                        <Input placeholder="" value={donation._id.toString()} readOnly />
                                                                                    </FormControl>
                                                                                </FormItem>
                                                                            );
                                                                        }}
                                                                    />
                                                                    <FormField
                                                                        control={certificateForm.control}
                                                                        name="certificate"
                                                                        render={({ field }) => (
                                                                            <FormItem>
                                                                                <FormLabel>Certificate</FormLabel>
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
                                                                    <Button type="submit" disabled={isCreated} className="button button-green hover:bg-transparent ">
                                                                        {isCreated ? (
                                                                            <>
                                                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                                                                            </>
                                                                        ) : ('Add Certificate')}
                                                                    </Button>
                                                                </form>
                                                            </Form>
                                                        </PopoverContent>
                                                    </Popover>
                                                </td>
                                            </tr>
                                        ))}
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
            </div>
        </>

    )
}

export default Page

