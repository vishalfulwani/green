
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

    //     const onDonationPlantationDataSubmit = async (data: PlantationFormValues) => {
    //     setIsCreated(true);
    //     const formData = new FormData();
    //     formData.append('id', data.id);
    //     if (data.plantationImage[0]) {
    //         formData.append('plantationImage', data.plantationImage[0]); // Assuming single file upload
    //     }
    //     formData.append('plantationStatus', data.plantationStatus);

    //     try {
    //         const response = await axios.post('/api/admin/add-plantation-data', formData);
    //         toast({
    //             title: 'Success',
    //             description: response.data.message,
    //             className: "toast-success",
    //         });
    //         setIsCreated(false);
    //         form.reset();
    //     } catch (error) {
    //         const axiosError = error as AxiosError<ApiResponse>;
    //         let errorMessage = axiosError.response?.data.message;
    //         toast({
    //             title: "Error",
    //             description: errorMessage || "Plantation data add failed",
    //             className: 'toast-error',
    //         });
    //         setIsCreated(false);
    //     }
    // };

    // -----------------------
    // Certificate
    // -----------------------

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



    // const onCertificateSubmit = async (data: CertificateFormValues) => {
    //     setIsCreated(true);
    //     const formData = new FormData();
    //     formData.append('id', data.id);
    //     if (data.certificate[0]) {
    //         formData.append('certificate', data.certificate[0]); // Assuming single file upload
    //     }

    //     try {
    //         const response = await axios.post('/api/admin/add-certificate', formData);
    //         toast({
    //             title: 'Success',
    //             description: response.data.message,
    //             className: "toast-success",
    //         });
    //         setIsCreated(false);
    //         certificateForm.reset();
    //     } catch (error) {
    //         const axiosError = error as AxiosError<ApiResponse>;
    //         let errorMessage = axiosError.response?.data.message;
    //         toast({
    //             title: "Error",
    //             description: errorMessage || "Certificate add failed",
    //             className: 'toast-error',
    //         });
    //         setIsCreated(false);
    //     }
    // };

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
                        <div className="overflow-x-auto scrollbar-hide">

                            <table className="min-w-full bg-white">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Donor Id</th>
                                        <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Donor Name</th>
                                        <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Donor Email</th>
                                        <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Contact</th>
                                        <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Amount</th>
                                        <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Status</th>
                                        <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Created At</th>

                                        <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Plantation Image</th>
                                        <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Plantation Status</th>
                                        <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Certificate</th>

                                        <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Add Planation Data</th>
                                        <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Add Certificate</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {donations.map((donation) => (
                                        <tr key={donation._id.toString()}>
                                            <td className="py-2 px-4 border-b border-gray-200">{donation.razorpayOrderId}</td>
                                            <td className="py-2 px-4 border-b border-gray-200">{donation.donorName}</td>
                                            <td className="py-2 px-4 border-b border-gray-200">{donation.donorEmail}</td>
                                            <td className="py-2 px-4 border-b border-gray-200">{donation.donorContact}</td>
                                            <td className="py-2 px-4 border-b border-gray-200">{donation.amount}</td>
                                            <td className="py-2 px-4 border-b border-gray-200">{donation.status}</td>
                                            {/* <td className="py-2 px-4 border-b border-gray-200">{donation.createdAt.toLocaleDateString()}</td> */}

                                            {/* <td className="py-2 px-4 border-b border-gray-200">{new Date(donation.createdAt).toLocaleDateString()}</td> */}
                                            <td className="py-2 px-4 border-b border-gray-200">
                                                {new Date(donation.createdAt).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </td>
                                            <td className="py-2 px-4 border-b border-gray-200">{donation.plantationImage ? <img src={donation.plantationImage}></img> : "add"}</td>
                                            <td className="py-2 px-4 border-b border-gray-200">{donation.plantationStatus ? donation.plantationStatus : "add"}</td>
                                            <td className="py-2 px-4 border-b border-gray-200">{donation.certificate ? <img src={donation.certificate}></img> : "add"}</td>

                                            <td className="py-2 px-4 border-b border-gray-200">
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button variant="outline" className='bg-[#7acbac]'>Add Planation</Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-80 bg-[#acd8b3]">
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
                                                        <div className='text-sm pt-4'>Provide plantation data to <span className='txt-1xl text-green-800'>{donation.donorName}</span></div>
                                                    </PopoverContent>
                                                </Popover>
                                            </td>
                                            <td className="py-2 px-4 border-b border-gray-200">
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button variant="outline" className='bg-[#7acbac]'>Add Certificate</Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-80 bg-[#acd8b3]">
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
                                                        <div className='text-sm pt-5'>Provide Certificate to <span className='txt-1xl text-green-800'>{donation.donorName}</span></div>
                                                    </PopoverContent>
                                                </Popover>
                                            </td>
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

