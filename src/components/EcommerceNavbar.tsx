'use client'

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useSession, signOut } from "next-auth/react"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useForm } from "react-hook-form"
import { useToast } from "./ui/use-toast"
import axios, { AxiosError } from "axios"
import { ApiResponse } from "@/helpers/ApiResponse"


import { GoSignOut } from "react-icons/go";
import { TbPasswordUser } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { FaUserAlt } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiSearch } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "./ui/input"
import { Loader2 } from "lucide-react"
import { IProduct } from '@/models/product.models';
import { AnyARecord } from 'dns';
import { FaShoppingCart } from "react-icons/fa";


const categories = [
    { value: 'plants', label: 'Plants' },
    { value: 'tools', label: 'Tools' },
    { value: 'seeds', label: 'Seeds' },
];



const EcommerceNavbar = () => {

    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    const [rightbarOpen, setRightbarOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    

    const [userSession, setUserSession] = useState(false)
    const { data: session, status } = useSession();
    console.log(session?.platform)
    useEffect(() => {
        console.log(session)
        if (session?.platform === 'ecommerce') {
            setUserSession(true);
        }
    }, [session]);

    const { toast } = useToast()

    const router = useRouter();



    const handleClick = (href: any) => {
        router.push(href);
    };


    const toggleRightSidebar = () => {
        setRightbarOpen(!rightbarOpen)
    }

    interface ChangePasswordFormValues {
        oldPassword: string;
        newPassword: string;
    }

    const form = useForm<ChangePasswordFormValues>({
        defaultValues: {
            oldPassword: '',
            newPassword: ''
        }
    })

    // password change
    const onSubmit = async (data: any) => {
        setIsSubmitting(true)
        try {
            console.log(data.oldPassword, "===", data.newPassword)
            const response = await axios.post<ApiResponse>('/api/change-password', {
                oldPassword: data.oldPassword,
                newPassword: data.newPassword
            })

            toast({
                title: 'Success',
                description: response.data.message,
                className: 'toast-success'
            })
            setIsSubmitting(false)
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>
            let errorMessage = axiosError.response?.data.message
            toast({
                title: "Failed",
                description: errorMessage || "Password change failed",
                className: 'toast-error'
            })
            setIsSubmitting(false)
        }
    }



    interface ChangeAddressFormValues {
        street: string;
        city: string;
        state: string;
        postalCode: string;
        phone: string
    }

    const addressForm = useForm<ChangeAddressFormValues>({
        defaultValues: {
            street: "",
            city: "",
            state: "",
            postalCode: "",
            phone: "",
        }
    })

    // address change
    const onAddressSubmit = async (data: ChangeAddressFormValues) => {
        setIsSubmitting(true)
        try {
            console.log(data.street, "=jhkuyftrtgyhuhgffygfyguhugguihuguiu=", data.city, data)
            const response = await axios.post<ApiResponse>('/api/change-address',
                {

                    street: data.street,
                    city: data.city,
                    state: data.state,
                    postalCode: data.postalCode,
                    phone: data.phone
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )

            console.log("fatsf", data.street)

            toast({
                title: 'Success',
                description: response.data.message,
                className: 'toast-success'
            })
            setIsSubmitting(false)
            addressForm.reset()
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>
            let errorMessage = axiosError.response?.data.message
            toast({
                title: "Failed",
                description: errorMessage || "Address change failed",
                className: 'toast-error'
            })
            setIsSubmitting(false)
        }
    }


    // signout
    const handleSignOut = (platform: any) => {
        signOut({
            callbackUrl: platform === "ecommerce" ? "/ecommerce-signin" : "/foundation-signin",
        });
    };



    // search bar 

    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [products, setProducts] = useState<IProduct[]>([])
    const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);

    // const router = useRouter();

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

    useEffect(() => {
        if (query === "") {
            setFilteredProducts([])     // corrected
        }
        else if (query.trim()) {
            const results = products.filter((product) =>
                (product.productName?.toLowerCase().includes(query.toLowerCase()) || '') ||
                (product.category?.toLowerCase().includes(query.toLowerCase()) || '')
            );
            setFilteredProducts(results);
        } else {
            setFilteredProducts(products);
        }
    }, [query, products]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim().toLowerCase() === 'tools' || query.trim().toLowerCase() === 'tool') {
            setIsOpen(false)
            router.push(`/shop/tools`);

        }
        else if (query.trim().toLowerCase() === 'seeds' || query.trim().toLowerCase() === 'seed') {
            router.push(`/shop/seeds`);
            setIsOpen(false)
        }
        else if (query.trim().toLowerCase() === 'plants' || query.trim().toLowerCase() === 'plant') {
            setIsOpen(false)
            router.push(`/shop/seeds`);
        }

        else {
            const product = filteredProducts[0]
            if (product) {
                setIsOpen(false)
                router.push(`/shop/${product.category}/${product.id}`)
            }
            else {
                return
            }
        }
    }

    // Navigate to the product details page
    const handleProductClick = (productCategory: any, productId: any) => {
        router.push(`/shop/${productCategory}/${productId}`);
        setIsOpen(false)
    };
    const handleSearchIconClick = () => {
        setIsOpen(true);
        setQuery('')
        setFilteredProducts([])
    }


   

    return (



        <>

            {/*  animate scroll in global.css */}
            {/* <div className="fixed top-0 w-full h-10 bg-green-700 text-white overflow-hidden z-50">
  <div className=" whitespace-nowrap animate-scroll py-2">
    Free delivery on order above 500&nbsp;&nbsp;|&nbsp;&nbsp;New arrivals just in—shop now for the latest trends!
  </div>
</div> */}


{/* 
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center zoom-in-100">
                    <div className="relative w-11/12 md:w-1/2 bg-green-700 text-white p-4 rounded-lg">
                        <div className="text-center animate-scroll whitespace-nowrap">
                            Free delivery on orders above ₹500&nbsp;&nbsp;|&nbsp;&nbsp;New arrivals just in—shop now for the latest trends!
                        </div>
                        <button
                            className="absolute top-2 right-2 text-white hover:text-gray-300"
                            onClick={() => setIsOpen(false)}
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )} */}




            <nav className="bg-green-800 text-white py-4 px-4 fixed w-full top-0 left-0 shadow-md z-50">
                {/* <div className="container mx-auto px-1 flex justify-between items-center"> */}
                <div className={`container mx-auto px-1 flex justify-between  md:flex items-center  space-x-4 ${isOpen ? 'hidden' : 'block'}`}>
                    <div className="text-2xl font-bold">Plant E-commerce</div>

                    {/* Hamburger Icon */}
                    <div className="md:hidden flex my-2 items-center">
                        <button
                            className="outline-none mobile-menu-button"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <GiHamburgerMenu className="w-6 h-6 text-white" />
                        </button>
                    </div>

                    {/* Menu */}
                    <div className="hidden md:flex md:items-center flex-1 justify-center">
                        <ul className="flex space-x-8 items-center">
                            <li className="px-4 py-2 hover:text-green-500 transition-colors duration-200 cursor-pointer" onClick={() => handleClick(`/get-involved`)}>
                                Home
                            </li>
                            {categories.map((category) => (
                                <li
                                    key={category.value}
                                    className="relative group"
                                    onMouseEnter={() => setActiveCategory(category.value)}
                                    onMouseLeave={() => setActiveCategory(null)}
                                    onClick={() => handleClick(`/shop/${category.value}`)}
                                >
                                    <div className="flex items-center cursor-pointer hover:text-green-500 transition-colors duration-200">
                                        {category.label}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>



                    {/* Search*/}
                    <div className="relative hidden md:flex items-center pr-3">
                        <FaSearch
                            className="text-2xl cursor-pointer text-white hover:text-green-600 transition-all"
                            // onClick={() => setIsOpen(true)}
                            onClick={() => handleSearchIconClick()}
                        />
                    </div>

                    {/* wishlist */}
                    <div className="relative hidden md:flex  items-center pr-3">
                        <Link href="/wishlist" >
                            <FaHeart
                                className="text-2xl cursor-pointer text-white hover:text-green-600 transition-all"
                            />
                        </Link>
                    </div>

                    {/* cart */}
                    <div className="relative hidden md:flex  items-center pr-3">
                        <Link href="/cart" >
                            <FaShoppingCart
                                className="text-2xl cursor-pointer text-white hover:text-green-600 transition-all"
                            />
                        </Link>
                    </div>


                    {/* profile  */}
                    {userSession && (
                        <ul className="hidden md:flex items-center mr-3 space-x-4">
                            <li className="relative">
                                <div className="flex items-center cursor-pointer" onClick={toggleRightSidebar}>
                                    <FaUserAlt className="hover:text-green-600 text-2xl" />
                                </div>
                                <ul className={`absolute right-0 mt-2 w-60 bg-white text-black shadow-lg rounded-md ${rightbarOpen ? 'block' : 'hidden'} transition-transform duration-200 ease-in-out`}>
                                    <li className="px-4 py-2 border-b">
                                        <h6 className="text-lg text-center font-medium">User ( {session?.user.userName} )</h6>
                                    </li>
                                    <li>
                                        <Link href="/ecommerce-profile" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100">
                                            <CgProfile />
                                            {/* <span>My Profile</span> */}
                                            <Button variant="outline">My Profile</Button>

                                        </Link>
                                    </li>
                                    <li className="flex items-center px-4 gap-3 py-2 hover:bg-gray-100">
                                        <TbPasswordUser />
                                        <span>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="outline">Change Password</Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogTitle className="text-center">
                                                        <Form {...form}>
                                                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                                                <FormField
                                                                    control={form.control}
                                                                    name="oldPassword"
                                                                    render={({ field }) => (
                                                                        <FormItem>
                                                                            <FormLabel className="flex justify-start text-1xl">Old Password</FormLabel>
                                                                            <FormControl>
                                                                                <Input
                                                                                    type="text"
                                                                                    placeholder="old password"
                                                                                    {...field}
                                                                                />
                                                                            </FormControl>
                                                                            <FormMessage />
                                                                        </FormItem>
                                                                    )}
                                                                />

                                                                <FormField
                                                                    control={form.control}
                                                                    name="newPassword"
                                                                    render={({ field }) => (
                                                                        <FormItem>
                                                                            <FormLabel className="flex justify-start text-1xl">New Password</FormLabel>
                                                                            <FormControl>
                                                                                <Input
                                                                                    type="text"
                                                                                    placeholder="new password"
                                                                                    {...field}
                                                                                />
                                                                            </FormControl>
                                                                            <FormMessage />
                                                                        </FormItem>
                                                                    )}
                                                                />

                                                                <div className="flex gap-2 justify-end">
                                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                    <Button
                                                                        type="submit"
                                                                        disabled={isSubmitting}
                                                                        className="bg-green-600 text-white font-bold py-2 px-3 rounded-lg shadow-md hover:bg-green-700 transition-colors text-sm"
                                                                    >
                                                                        {isSubmitting ? (
                                                                            <>
                                                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                                                                            </>
                                                                        ) : (
                                                                            'Change Password'
                                                                        )}
                                                                    </Button>
                                                                </div>
                                                            </form>
                                                        </Form>
                                                    </AlertDialogTitle>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </span>
                                    </li>
                                    <li className="flex items-center px-4 gap-3 py-2 hover:bg-gray-100">
                                        <TbPasswordUser />
                                        <span>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="outline">Add Address</Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogTitle className="text-center">
                                                        <Form {...addressForm}>
                                                            <form onSubmit={addressForm.handleSubmit(onAddressSubmit)} className="space-y-6">
                                                                {/* Street Field */}
                                                                <FormField
                                                                    control={addressForm.control}
                                                                    name="street"
                                                                    render={({ field }) => (
                                                                        <FormItem>
                                                                            <FormLabel className="flex justify-start text-1xl">Street</FormLabel>
                                                                            <FormControl>
                                                                                <Input
                                                                                    type="text"
                                                                                    required
                                                                                    placeholder="Street"
                                                                                    {...field}
                                                                                />
                                                                            </FormControl>
                                                                            <FormMessage />
                                                                        </FormItem>
                                                                    )}
                                                                />

                                                                {/* City Field */}
                                                                <FormField
                                                                    control={addressForm.control}
                                                                    name="city"
                                                                    render={({ field }) => (
                                                                        <FormItem>
                                                                            <FormLabel className="flex justify-start text-1xl">City</FormLabel>
                                                                            <FormControl>
                                                                                <Input
                                                                                    type="text"
                                                                                    required
                                                                                    placeholder="City"
                                                                                    {...field}
                                                                                />
                                                                            </FormControl>
                                                                            <FormMessage />
                                                                        </FormItem>
                                                                    )}
                                                                />

                                                                {/* State Field */}
                                                                <FormField
                                                                    control={addressForm.control}
                                                                    name="state"
                                                                    render={({ field }) => (
                                                                        <FormItem>
                                                                            <FormLabel className="flex justify-start text-1xl">State</FormLabel>
                                                                            <FormControl>
                                                                                <Input
                                                                                    type="text"
                                                                                    required
                                                                                    placeholder="State"
                                                                                    {...field}
                                                                                />
                                                                            </FormControl>
                                                                            <FormMessage />
                                                                        </FormItem>
                                                                    )}
                                                                />

                                                                {/* Postal Code Field */}
                                                                <FormField
                                                                    control={addressForm.control}
                                                                    name="postalCode"
                                                                    render={({ field }) => (
                                                                        <FormItem>
                                                                            <FormLabel className="flex justify-start text-1xl">Postal Code</FormLabel>
                                                                            <FormControl>
                                                                                <Input
                                                                                    type="text"
                                                                                    required
                                                                                    placeholder="Postal Code"
                                                                                    {...field}
                                                                                />
                                                                            </FormControl>
                                                                            <FormMessage />
                                                                        </FormItem>
                                                                    )}
                                                                />

                                                                {/* phone */}
                                                                <FormField
                                                                    control={addressForm.control}
                                                                    name="phone"
                                                                    render={({ field }) => (
                                                                        <FormItem>
                                                                            <FormLabel className="flex justify-start text-1xl">Phone No.</FormLabel>
                                                                            <FormControl>
                                                                                <Input
                                                                                    type="text"
                                                                                    required
                                                                                    placeholder="Phone no."
                                                                                    {...field}
                                                                                />
                                                                            </FormControl>
                                                                            <FormMessage />
                                                                        </FormItem>
                                                                    )}
                                                                />

                                                                {/* Submit Button */}
                                                                <div className="flex gap-2 justify-end">
                                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                    <Button
                                                                        type="submit"
                                                                        disabled={isSubmitting}
                                                                        className="bg-green-600 text-white font-bold py-2 px-3 rounded-lg shadow-md hover:bg-green-700 transition-colors text-sm"
                                                                    >
                                                                        {isSubmitting ? (
                                                                            <>
                                                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                                                                            </>
                                                                        ) : (
                                                                            'Done'
                                                                        )}
                                                                    </Button>
                                                                </div>
                                                            </form>
                                                        </Form>
                                                    </AlertDialogTitle>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </span>
                                    </li>

                                    <li className="flex items-center px-4 gap-3 py-2 hover:bg-gray-100">
                                        <GoSignOut />
                                        <span>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="outline">Log out</Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle className="text-center">
                                                            Are you sure you want to log out of E-commerce Platform?
                                                        </AlertDialogTitle>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handleSignOut('ecommerce')} className="bg-green-600 text-white font-bold py-2 px-3 rounded-lg shadow-md hover:bg-green-700 transition-colors text-sm">
                                                            Sign Out
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </span>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    )}


                    {/* signup  */}
                    <div className="hidden md:flex md:items-center ">
                        <Link href="/signup" className="px-5 py-2 bg-white text-green-800 font-bold rounded-full shadow-md hover:bg-green-600 hover:text-white transition duration-300">
                            Sign Up
                        </Link>
                    </div>

                    {/* signin  */}
                    <div className="hidden md:flex md:items-center ">
                        <Link href="/ecommerce-signin" className="  text-white font-bold  hover:text-green-600 transition duration-300">
                            Sign In
                        </Link>
                    </div>



                </div>






                {/* Conditional Search Bar */}
                {isOpen && (
                    <div>
                        {/* Search Form */}
                        {isOpen && (
                            <>
                                <form
                                    onSubmit={handleSearch}
                                    className="absolute top-0  left-0 flex items-center justify-between w-[100%] bg-green-800 shadow-lg rounded-lg py-3 px-4 border border-gray-300 z-50 transition-all duration-300"
                                >
                                    <input
                                        type="text"
                                        className="w-full bg-gray-50 border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 shadow-inner text-gray-700"
                                        placeholder="Search for plants, seeds, tools..."
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                    />
                                    <button
                                        type="submit"
                                        className="ml-2 sm:ml-4 bg-white text-green-800 px-2 sm:px-6 py-2 rounded-lg shadow-md font-bold hover:bg-green-600 hover:text-white transition duration-300"
                                    >
                                        Search
                                    </button>
                                    {/* Close button */}
                                    <button
                                        type="button"
                                        onClick={() => setIsOpen(false)}
                                        className="ml-2 text-gray-600 hover:text-red-600 transition-all duration-300"
                                    >
                                        ✖
                                    </button>
                                </form>
                                <div className="p-4">
                                    <h1 className="text-2xl font-bold mb-4">
                                        {query ? `Search Results for "${query}"` : 'All Products'}
                                    </h1>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 overflow-auto max-h-[80vh] p-2 scrollbar-hide">
                                        {filteredProducts.length > 0 ? (
                                            filteredProducts.map((product) => (
                                                <div
                                                    key={product.id}
                                                    className="border cursor-pointer p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                                                    onClick={() => handleProductClick(product.category, product._id)}

                                                >
                                                    <img
                                                        src={product.images[0]}
                                                        alt={product.productName}
                                                        className="w-full h-40 object-cover mb-2 rounded-lg"
                                                    />
                                                    <h2 className="text-lg font-semibold">{product.productName}</h2>
                                                    <p className="text-green-600 font-bold">${product.sellingPrice}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="col-span-full text-center">No results found for "{query}"</p>
                                        )}
                                    </div>
                                </div>

                            </>

                        )}


                    </div>



                )}




                {/* Mobile Menu */}
                <div className={`md:hidden ${mobileMenuOpen ? "block" : "hidden"} ${isOpen ? 'hidden' : 'block'} transition-transform duration-300`}>
                    <div className="flex justify-end items-center py-1">
                        {/* Search*/}
                        <div className="relative flex items-center pr-3">
                            <FaSearch
                                className="text-xl cursor-pointer text-white hover:text-green-600 transition-all"
                                // onClick={() => setIsOpen(true)}
                                onClick={() => handleSearchIconClick()}
                            />
                        </div>

                        {/* wishlist */}
                        <div className="relative flex  items-center pr-3">
                            <Link href="/wishlist" >
                                <FaHeart
                                    className="text-xl cursor-pointer text-white hover:text-green-600 transition-all"
                                />
                            </Link>
                        </div>

                        {/* cart */}
                        <div className="relative flex  items-center pr-3">
                            <Link href="/cart" >
                                <FaShoppingCart
                                    className="text-xl cursor-pointer text-white hover:text-green-600 transition-all"
                                />
                            </Link>
                        </div>
             
                        {userSession && (
                        <ul className="hidden md:flex items-center mr-3 space-x-4">
                            <li className="relative">
                                <div className="flex items-center cursor-pointer" onClick={toggleRightSidebar}>
                                    <FaUserAlt className="hover:text-green-600 text-2xl" />
                                </div>
                                <ul className={`absolute right-0 mt-2 w-60 bg-white text-black shadow-lg rounded-md ${rightbarOpen ? 'block' : 'hidden'} transition-transform duration-200 ease-in-out`}>
                                    <li className="px-4 py-2 border-b">
                                        <h6 className="text-lg text-center font-medium">User ( {session?.user.userName} )</h6>
                                    </li>
                                    <li>
                                        <Link href="/ecommerce-profile" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100">
                                            <CgProfile />
                                            {/* <span>My Profile</span> */}
                                            <Button variant="outline">My Profile</Button>

                                        </Link>
                                    </li>
                                    <li className="flex items-center px-4 gap-3 py-2 hover:bg-gray-100">
                                        <TbPasswordUser />
                                        <span>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="outline">Change Password</Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogTitle className="text-center">
                                                        <Form {...form}>
                                                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                                                <FormField
                                                                    control={form.control}
                                                                    name="oldPassword"
                                                                    render={({ field }) => (
                                                                        <FormItem>
                                                                            <FormLabel className="flex justify-start text-1xl">Old Password</FormLabel>
                                                                            <FormControl>
                                                                                <Input
                                                                                    type="text"
                                                                                    placeholder="old password"
                                                                                    {...field}
                                                                                />
                                                                            </FormControl>
                                                                            <FormMessage />
                                                                        </FormItem>
                                                                    )}
                                                                />

                                                                <FormField
                                                                    control={form.control}
                                                                    name="newPassword"
                                                                    render={({ field }) => (
                                                                        <FormItem>
                                                                            <FormLabel className="flex justify-start text-1xl">New Password</FormLabel>
                                                                            <FormControl>
                                                                                <Input
                                                                                    type="text"
                                                                                    placeholder="new password"
                                                                                    {...field}
                                                                                />
                                                                            </FormControl>
                                                                            <FormMessage />
                                                                        </FormItem>
                                                                    )}
                                                                />

                                                                <div className="flex gap-2 justify-end">
                                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                    <Button
                                                                        type="submit"
                                                                        disabled={isSubmitting}
                                                                        className="bg-green-600 text-white font-bold py-2 px-3 rounded-lg shadow-md hover:bg-green-700 transition-colors text-sm"
                                                                    >
                                                                        {isSubmitting ? (
                                                                            <>
                                                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                                                                            </>
                                                                        ) : (
                                                                            'Change Password'
                                                                        )}
                                                                    </Button>
                                                                </div>
                                                            </form>
                                                        </Form>
                                                    </AlertDialogTitle>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </span>
                                    </li>
                                    <li className="flex items-center px-4 gap-3 py-2 hover:bg-gray-100">
                                        <TbPasswordUser />
                                        <span>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="outline">Add Address</Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogTitle className="text-center">
                                                        <Form {...addressForm}>
                                                            <form onSubmit={addressForm.handleSubmit(onAddressSubmit)} className="space-y-6">
                                                                {/* Street Field */}
                                                                <FormField
                                                                    control={addressForm.control}
                                                                    name="street"
                                                                    render={({ field }) => (
                                                                        <FormItem>
                                                                            <FormLabel className="flex justify-start text-1xl">Street</FormLabel>
                                                                            <FormControl>
                                                                                <Input
                                                                                    type="text"
                                                                                    required
                                                                                    placeholder="Street"
                                                                                    {...field}
                                                                                />
                                                                            </FormControl>
                                                                            <FormMessage />
                                                                        </FormItem>
                                                                    )}
                                                                />

                                                                {/* City Field */}
                                                                <FormField
                                                                    control={addressForm.control}
                                                                    name="city"
                                                                    render={({ field }) => (
                                                                        <FormItem>
                                                                            <FormLabel className="flex justify-start text-1xl">City</FormLabel>
                                                                            <FormControl>
                                                                                <Input
                                                                                    type="text"
                                                                                    required
                                                                                    placeholder="City"
                                                                                    {...field}
                                                                                />
                                                                            </FormControl>
                                                                            <FormMessage />
                                                                        </FormItem>
                                                                    )}
                                                                />

                                                                {/* State Field */}
                                                                <FormField
                                                                    control={addressForm.control}
                                                                    name="state"
                                                                    render={({ field }) => (
                                                                        <FormItem>
                                                                            <FormLabel className="flex justify-start text-1xl">State</FormLabel>
                                                                            <FormControl>
                                                                                <Input
                                                                                    type="text"
                                                                                    required
                                                                                    placeholder="State"
                                                                                    {...field}
                                                                                />
                                                                            </FormControl>
                                                                            <FormMessage />
                                                                        </FormItem>
                                                                    )}
                                                                />

                                                                {/* Postal Code Field */}
                                                                <FormField
                                                                    control={addressForm.control}
                                                                    name="postalCode"
                                                                    render={({ field }) => (
                                                                        <FormItem>
                                                                            <FormLabel className="flex justify-start text-1xl">Postal Code</FormLabel>
                                                                            <FormControl>
                                                                                <Input
                                                                                    type="text"
                                                                                    required
                                                                                    placeholder="Postal Code"
                                                                                    {...field}
                                                                                />
                                                                            </FormControl>
                                                                            <FormMessage />
                                                                        </FormItem>
                                                                    )}
                                                                />

                                                                {/* phone */}
                                                                <FormField
                                                                    control={addressForm.control}
                                                                    name="phone"
                                                                    render={({ field }) => (
                                                                        <FormItem>
                                                                            <FormLabel className="flex justify-start text-1xl">Phone No.</FormLabel>
                                                                            <FormControl>
                                                                                <Input
                                                                                    type="text"
                                                                                    required
                                                                                    placeholder="Phone no."
                                                                                    {...field}
                                                                                />
                                                                            </FormControl>
                                                                            <FormMessage />
                                                                        </FormItem>
                                                                    )}
                                                                />

                                                                {/* Submit Button */}
                                                                <div className="flex gap-2 justify-end">
                                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                    <Button
                                                                        type="submit"
                                                                        disabled={isSubmitting}
                                                                        className="bg-green-600 text-white font-bold py-2 px-3 rounded-lg shadow-md hover:bg-green-700 transition-colors text-sm"
                                                                    >
                                                                        {isSubmitting ? (
                                                                            <>
                                                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                                                                            </>
                                                                        ) : (
                                                                            'Done'
                                                                        )}
                                                                    </Button>
                                                                </div>
                                                            </form>
                                                        </Form>
                                                    </AlertDialogTitle>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </span>
                                    </li>

                                    <li className="flex items-center px-4 gap-3 py-2 hover:bg-gray-100">
                                        <GoSignOut />
                                        <span>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="outline">Log out</Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle className="text-center">
                                                            Are you sure you want to log out of E-commerce Platform?
                                                        </AlertDialogTitle>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handleSignOut('ecommerce')} className="bg-green-600 text-white font-bold py-2 px-3 rounded-lg shadow-md hover:bg-green-700 transition-colors text-sm">
                                                            Sign Out
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </span>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    )}
                        <div className="py-2 px-1 ">
                            <Link href="/signup" className="block text-center px-4 py-1 bg-white text-green-800 font-bold rounded-full shadow-md hover:bg-green-600 hover:text-white transition duration-300">
                                Sign Up
                            </Link>
                        </div>
                        <div className="px-1 py-2">
                            <Link href="/ecommerce-signin" className="  text-white font-bold  hover:text-green-600 transition duration-300">
                                Sign In
                            </Link>
                        </div>

                    </div>
                    <ul className="bg-green-800 text-white py-2 space-y-2">
                        <li className="px-4 mt-2 hover:bg-green-700" onClick={() => handleClick(`/get-involved`)}>
                            Home
                        </li>
                        {categories.map((category) => (
                            <li
                                key={category.value}
                                className="px-4  hover:bg-green-700"
                                onClick={() => handleClick(`/shop/${category.value}`)}
                            >
                                {category.label}
                            </li>
                        ))}
                    
                    </ul>
                </div>
            </nav>


        </>

    );
}

export default EcommerceNavbar