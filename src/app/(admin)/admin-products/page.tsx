
'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'
import { ApiResponse } from '@/helpers/ApiResponse'
import { IProduct } from '@/models/product.models'
import axios, { AxiosError } from 'axios'
import { Loader2 } from 'lucide-react'
import mongoose from 'mongoose'
import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'



function Page() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [products, setProducts] = useState<IProduct[]>([])

    const { toast } = useToast()

    // product delete
    const onDelete = async (productId: mongoose.Types.ObjectId) => {
        try {
            setIsDeleting(true)
            console.log(productId)
            const response = await axios.post<ApiResponse>('/api/admin/delete-product', {
                productId: productId
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


    // Api data fetch
    useEffect(() => {
        const fetchProducts = async () => {
            setIsSubmitting(true)
            try {
                const allProducts = await axios.get<ApiResponse>('/api/get-products')
                const productData = allProducts.data.data as IProduct[]
                setProducts(productData)
            } catch (error) {
                console.error("Error fetching products:", error)
            } finally {
                setIsSubmitting(false)
            }
        }

        fetchProducts()
    }, [])





    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 5; // Change the number based on your needs
    const filteredProducts = products.filter((product) =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.subCategory.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);



    return (
        <>
            <Head>
                <title>Admin Products - Ecommerce</title>
                <meta name="description" content="This is the product data page of Ecommerce." />
            </Head>
            <div >
                <div className="container mx-auto px-6 mt-16  py-10 ">
                    <h1 className="text-3xl font-bold leading-tight mb-4">Products</h1>
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

                                    placeholder="Search by product name, category, or subcategory"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto scrollbar-hide py-4">
                                <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
                                    <thead>
                                        <tr className="bg-green-700 text-white">
                                            <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wide">Product Name</th>
                                            <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wide">Product Description</th>
                                            <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wide">Category</th>
                                            <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wide">Subcategory</th>
                                            <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wide">Images</th>
                                            <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wide">Price</th>
                                            <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wide">Selling Price</th>
                                            <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wide">Rating</th>
                                            <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wide">Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {paginatedProducts.map((product, index) => (
                                            <tr
                                                key={product._id.toString()}
                                                className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-50'} hover:bg-gray-200 transition duration-200`}


                                            >
                                                <td className="py-4 px-6">{product.productName}</td>
                                                <td className="py-4 px-6">{product.productDesc}</td>
                                                <td className="py-4 px-6">{product.category}</td>
                                                <td className="py-4 px-6">{product.subCategory}</td>
                                                <td className="py-4 px-6">
                                                    <div className="flex gap-3 items-center">
                                                        {product.images.map((image, index) => (
                                                            <img src={image} alt={`Product image ${index}`} key={index} className="h-8 w-12 rounded shadow-md" />
                                                        ))}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">{product.price}</td>
                                                <td className="py-4 px-6">{product.sellingPrice}</td>
                                                <td className="py-4 px-6">{product.rating}</td>
                                                <td className="py-4 px-6">
                                                    <button
                                                        type="button"
                                                        disabled={isDeleting}
                                                        onClick={() => onDelete(product._id)}
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
                                        : 'bg-green-800 text-white  hover:bg-green-700'
                                        } transition duration-200 ease-in-out transform hover:scale-105`}
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </button>
                                <span className="font-semibold text-gray-800 text-xl">Page {currentPage} of {totalPages}</span>
                                <button
                                    className={`px-6 py-2 rounded-full shadow-md font-semibold text-lg ${currentPage === totalPages
                                        ? 'bg-gray-300 text-gray-700'
                                        : 'bg-green-800 text-white  hover:bg-green-700'
                                        } transition duration-200 ease-in-out transform hover:scale-105`}
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </button>
                            </div>
                        </div>

                    )}
                </div>

                <div className='container mb-6 flex justify-center'>
                    <Link href="/admin-products/add-product" className='px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-green-500 hover:scale-105'>
                        Add Product
                    </Link>
                </div>

            </div>


        </>

    )
}

export default Page

