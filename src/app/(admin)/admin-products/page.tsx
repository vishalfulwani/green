
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
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'



function Page() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isCreated, setIsCreated] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [products, setProducts] = useState<IProduct[]>([])

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
            category:'',
            subCategory:'',
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
        <div>
            <div className="container mx-auto px-6 my-16 py-16">
                <h1 className="text-3xl font-bold leading-tight mb-4">Products</h1>
                {isSubmitting ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                    </>
                ) : (
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
                                        <Button type="button" disabled={isDeleting} onClick={()=>onDelete(product._id)} className="text-white bg-green-500 hover:bg-green-300 hover:text-gray-800">
                                        {isDeleting ? (    <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                                            </>
                                        ) : ('Delete')}
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <div className="container mx-auto px-6 py-16">
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
                                            // {/* // onValueChange={(value) => { */}
                                            // {/* //     field.onChange(value) */}
                                            // {/* //     form.setValue('subCategory', '') // Reset subcategory when category changes */}
                                            // {/* // }} */}
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

                        <Button type="submit" disabled={isCreated} className="text-white bg-green-500 hover:bg-green-300 hover:text-gray-800">
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
    )
}

export default Page

