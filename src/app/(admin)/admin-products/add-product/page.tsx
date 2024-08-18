
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
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'



function Page() {
    const [isCreated, setIsCreated] = useState(false)

    const { toast } = useToast()


    // category and subcategory
    const categories = [
        { value: 'plants', label: 'Plants' },
        { value: 'tools', label: 'Tools' },
        { value: 'seeds', label: 'seeds' },
    ];

    const subCategories: Record<string, { value: string; label: string }[]> = {
        plants: [
            { value: 'indoor-plants', label: 'Indoor Plants' },
            { value: 'outdoor-plants', label: 'Outdoor Plants' },
            { value: 'herbs', label: 'Herbs' },
            { value: 'vegetables', label: 'Vegetables' },
            { value: 'succulents', label: 'Succulents' },
            { value: 'aquatic-plants', label: 'Aquatic Plants' },
            { value: 'medicinal-plants', label: 'Medicinal Plants' },
            { value: 'tropical-plants', label: 'Tropical Plants' },
        ],
        tools: [
            { value: 'hand-tools', label: 'Hand Tools' },
            { value: 'power-tools', label: 'Power Tools' },
            { value: 'watering-tools', label: 'Watering Tools' },
            { value: 'planting-tools', label: 'Planting Tools' },
            { value: 'garden-maintenance', label: 'Garden Maintenance' },
        ],
        seeds: [
            { value: 'vegetable-seeds', label: 'Vegetable Seeds' },
            { value: 'flower-seeds', label: 'Flower Seeds' },
            { value: 'herb-seeds', label: 'Herb Seeds' },
            { value: 'fruit-seeds', label: 'Fruit Seeds' },
            { value: 'grass-seeds', label: 'Grass Seeds' },
        ],
    };

    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedSubCategory, setSelectedSubCategory] = useState<string>('');

    const handleCategoryChange = (value: string) => {
        setSelectedCategory(value);
        setSelectedSubCategory('');
    };



    interface ProductFormValues {
        productName: string;
        productDesc?: string;
        price: string;
        images: File[];
        sellingPrice: string;
        category: string;
        subCategory: string;
    }



    const form = useForm<ProductFormValues>({
        defaultValues: {
            productName: '',
            productDesc: '',
            price: '',
            images: [],
            category: '',
            subCategory: '',
            sellingPrice: '',

        }
    })

    // product form submit
    const onSubmit = async (data: any) => {
        setIsCreated(true)
        try {
            const formData = new FormData()
            formData.append('productName', data.productName)
            formData.append('productDesc', data.productDesc || '')
            formData.append('price', data.price)
            formData.append('sellingPrice', data.sellingPrice)
            formData.append('category', selectedCategory)
            formData.append('subCategory', selectedSubCategory)

            data.images.forEach((file: File) => {
                formData.append('images', file)
            })


            const response = await axios.post<ApiResponse>('/api/admin/add-product', formData)
            toast({
                title: "Success",
                description: response.data.message,
                className: 'toast-success'
            })
            setIsCreated(false)
            form.reset()
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>
            let errorMessage = axiosError.response?.data.message
            toast({
                title: "Product add failed",
                description: errorMessage || "Product add failed",
                className: 'toast-error'
            })
            setIsCreated(false)
        }
    }

   

    return (
        <>
            <Head>
                <title>Add Products - Ecommerce</title>
                <meta name="description" content="This is the product adding page of Ecommerce." />
            </Head>
            <div>
               

                <div className="container mx-auto px-6 py-10 mt-16">
                    <h1 className="text-3xl font-bold leading-tight mb-4">Add Product</h1>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="productName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Product Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Product Name" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="productDesc"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Product Desc</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Product Description" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />



                            <FormField
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <FormControl>
                                            <Select
                                                value={selectedCategory}
                                                onValueChange={handleCategoryChange}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a category" />
                                                </SelectTrigger>
                                                <SelectContent>

                                                    {categories.map((category) => (
                                                        <SelectItem key={category.value} value={category.value}>
                                                            {category.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            {selectedCategory && (
                                <FormField
                                    name="subCategory"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Subcategory</FormLabel>
                                            <FormControl>
                                                <Select
                                                    value={selectedSubCategory}
                                                    onValueChange={(value) => setSelectedSubCategory(value)}
                                                // {/* onValueChange={field.onChange} */}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a subcategory" />
                                                    </SelectTrigger>
                                                    <SelectContent>

                                                        {subCategories[selectedCategory]?.map((subCategory) => (
                                                            <SelectItem key={subCategory.value} value={subCategory.value}>
                                                                {subCategory.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            )}

                            <FormField
                                control={form.control}
                                name="images"
                                render={({ field }) => (
                                    <FormField
                                        control={form.control}
                                        name="images"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Images</FormLabel>
                                                <FormControl>
                                                    <div className="space-y-2">
                                                        {[0, 1, 2, 3].map((index) => (
                                                            <Input
                                                                key={index}
                                                                type="file"
                                                                onChange={(e) => {
                                                                    const files = e.target.files;
                                                                    if (files && files.length > 0) {
                                                                        const updatedImages = [...(field.value || [])];
                                                                        updatedImages[index] = files[0] || '';
                                                                        form.setValue('images', updatedImages); // Update form state
                                                                    }
                                                                }}
                                                            />
                                                        ))}
                                                    </div>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Price</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Price" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="sellingPrice"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Selling Price</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Selling Price" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" disabled={isCreated} className="button-green button hover:bg-transparent">
                                {isCreated ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                                    </>
                                ) : ('Add Product')}
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </>

    )
}

export default Page

