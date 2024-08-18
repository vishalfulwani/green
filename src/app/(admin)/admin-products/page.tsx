
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
                        <div className="overflow-x-auto">

                        <table className="min-w-full bg-white">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">ProductName</th>
                                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">ProductDesc</th>
                                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Category</th>
                                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">SubCategory</th>
                                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Images</th>
                                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Price</th>
                                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">SellingPrice</th>
                                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Rating</th>
                                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product._id.toString()}>
                                        <td className="py-2 px-4 border-b border-gray-200">{product.productName}</td>
                                        <td className="py-2 px-4 border-b border-gray-200">{product.productDesc}</td>
                                        <td className="py-2 px-4 border-b border-gray-200">{product.category}</td>
                                        <td className="py-2 px-4 border-b border-gray-200">{product.subCategory}</td>
                                        <td className="py-2 px-4 border-b border-gray-200">
                                            <div className='flex gap-3 items-center'>
                                                {product.images.map((image, index) => (
                                                    <img src={image} alt={`Product image ${index}`} key={index} className='h-8 w-12' />
                                                ))}
                                            </div>
                                        </td>
                                        <td className="py-2 px-4 border-b border-gray-200">{product.price}</td>
                                        <td className="py-2 px-4 border-b border-gray-200">{product.sellingPrice}</td>
                                        <td className="py-2 px-4 border-b border-gray-200">{product.rating}</td>
                                        <td className="py-2 px-4 border-b border-gray-200">
                                            <Button type="button" disabled={isDeleting} onClick={() => onDelete(product._id)} className="text-white bg-green-500 hover:bg-green-300 hover:text-gray-800">
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
                        </div>
                    )}
                </div>

                <div className='container mb-6 '>

                    <Link href="/admin-products/add-product" className='button-green button'>
                        Add Product
                    </Link>
                </div>
            </div>

        
        </>

    )
}

export default Page

