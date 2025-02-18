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
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { useForm } from "react-hook-form"
import { useToast } from "./ui/use-toast"
import axios, { AxiosError } from "axios"
import { ApiResponse } from "@/helpers/ApiResponse"


import { GoSignOut } from "react-icons/go";
import { TbPasswordUser } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { FaBars, FaTimes, FaUserAlt } from "react-icons/fa";
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
import { FaAddressBook } from "react-icons/fa";
import HolidaySlider from './HolidaySaleSlider';
import ScrollingText from './HolidaySaleSlider';
import { useWishlist } from '@/wishlist/useWishlist';
import { RootState } from '@/cartRedux/store';
import { useSelector } from 'react-redux';


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


    const { wishlist } = useWishlist(); // Get wishlist IDs and remove function
    const cartLength = useSelector((state: RootState) => state.cart.cart.length);

    return (
        <>
            <nav className="bg-[#f2f2f2] text-green-800 py-4  pt-0 fixed w-full top-0 left-0 shadow-md z-50 ">
                <ScrollingText />
                <div className={`container mx-auto  flex pt-4 px-4 justify-between  md:flex items-center  space-x-4 ${isOpen ? 'hidden' : 'block'}`}>
                    <div className="text-2xl font-bold cursor-pointer">Plant E-commerce</div>

                    {/* Hamburger Icon */}
                    <div className="lg:hidden flex my-2 items-center">
                        <button
                            className="outline-none mobile-menu-button w-6 h-6 text-xl text-green-800"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {/* <GiHamburgerMenu className="w-6 h-6 text-green-800" /> */}
                            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>

                    {/* Menu */}
                    <div className="hidden lg:flex md:items-center flex-1 justify-center">
                        <ul className="flex space-x-8 items-center  font-semibold">
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

                    <div className="relative hidden lg:flex items-center pr-3">
                        {!isOpen ? (
                            // Search Icon
                            <FaSearch
                                className="xl:text-xl text-xl cursor-pointer text-green-700 hover:text-green-800 transition-all"
                                onClick={handleSearchIconClick}
                            />
                        ) : (
                            // Search Box
                            <form
                                onSubmit={handleSearch}
                                className="relative flex items-center"
                            >
                                <input
                                    type="text"
                                    className="border-b border-gray-400 focus:border-gray-800 bg-transparent px-2 py-1 focus:outline-none text-gray-700 placeholder-gray-400 transition-all duration-300"
                                    placeholder="Search"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                                <button
                                    type="submit"
                                    className="mx-2  transition duration-300"
                                >
                                    <FaSearch
                                        className="text-md cursor-pointer text-gray-600 hover:text-green-700 transition-all"
                                    //   onClick={handleSearchIconClick}
                                    />
                                </button>
                                {/* Close Button */}
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="ml-0 text-gray-600 hover:text-red-600 w-6 h-6 transition-all duration-300 text-lg"
                                >
                                    <FaTimes
                                        className="text-md cursor-pointer text-gray-600 hover:text-green-700 transition-all"
                                    />

                                </button>
                            </form>
                        )}
                    </div>

                    {/* wishlist */}
                    <div className="relative hidden lg:flex  items-center pr-3">
                        <Link href="/wishlist" >
                            <FaHeart
                                className="xl:text-xl text-xl cursor-pointer text-green-700 hover:text-green-800 transition-all"
                            />
                            {wishlist.length > 0 && (
                                <span className="absolute top-[-5px] p-2 right-0 block w-3 h-3 text-xs text-white bg-green-600 rounded-full flex items-center justify-center">
                                    {wishlist.length}
                                </span>
                            )}
                        </Link>
                    </div>

                    {/* cart */}
                    <div className="relative hidden lg:flex  items-center pr-3">
                        <Link href="/cart" >
                            <FaShoppingCart
                                className="xl:text-xl text-xl cursor-pointer text-green-700 hover:text-green-800 transition-all"
                            />
                            {cartLength > 0 && (
                                <span className="absolute top-[-5px] p-2 right-0 block w-3 h-3 text-xs text-white bg-green-600 rounded-full flex items-center justify-center">
                                    {cartLength}
                                </span>
                            )}
                        </Link>
                    </div>

                    {/* profile  */}
                    {userSession && (
                        <ul className="hidden lg:flex items-center mr-3 space-x-4">
                            <li className="relative">
                                <div className="flex items-center cursor-pointer" onClick={toggleRightSidebar}>
                                    <FaUserAlt className="text-green-700 hover:text-green-800 xl:text-xl text-xl" />
                                </div>
                                <ul className={`absolute right-0 mt-2 w-60 bg-white text-black shadow-lg rounded-md ${rightbarOpen ? 'block' : 'hidden'} transition-transform duration-200 ease-in-out`}>
                                    <li className="px-4 py-2 border-b">
                                        <h6 className="text-lg text-center font-medium">User ( {session?.user.userName} )</h6>
                                    </li>
                                    <li>
                                        <Link href="/ecommerce-profile" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100">
                                            <CgProfile />
                                            {/* <span>My Profile</span> */}
                                            <Button variant="outline" className="h-8">My Profile</Button>

                                        </Link>
                                    </li>
                                    <li className="flex items-center px-4 gap-3 py-1 hover:bg-gray-100">
                                        <TbPasswordUser />
                                        <span>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="outline" className="h-8">
                                                        Change Password
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent className="border-t-4 border-green-700">
                                                    <div className="relative z-50">
                                                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                                            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg max-h-screen overflow-y-auto scrollbar-hide">
                                                                <div className="flex justify-between  px-6 py-4 items-center  bg-green-700 text-white">

                                                                    <div></div>
                                                                    {/* <h2 className="text-center text-lg font-bold mb-0">Password</h2> */}
                                                                    <AlertDialogTitle>Change Password</AlertDialogTitle>
                                                                    <div>
                                                                        <AlertDialogCancel asChild>
                                                                            <button
                                                                                type="button"
                                                                                className="px-4 py-2 text-white text-5xl mt-0  border bg-green-700 transition"
                                                                            >
                                                                                X
                                                                            </button>
                                                                        </AlertDialogCancel>
                                                                    </div>
                                                                </div>


                                                                <div className="p-6">
                                                                    <Form {...form}>
                                                                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                                                            {/* Old Password Field */}
                                                                            <FormField
                                                                                control={form.control}
                                                                                name="oldPassword"
                                                                                render={({ field }) => (
                                                                                    <FormItem>
                                                                                        <FormLabel className="text-sm">Old Password</FormLabel>
                                                                                        <FormControl>
                                                                                            <Input
                                                                                                type="password"
                                                                                                placeholder="Enter old password"
                                                                                                {...field}
                                                                                            />
                                                                                        </FormControl>
                                                                                        <FormMessage />
                                                                                    </FormItem>
                                                                                )}
                                                                            />
                                                                            {/* New Password Field */}
                                                                            <FormField
                                                                                control={form.control}
                                                                                name="newPassword"
                                                                                render={({ field }) => (
                                                                                    <FormItem>
                                                                                        <FormLabel className="text-sm">New Password</FormLabel>
                                                                                        <FormControl>
                                                                                            <Input
                                                                                                type="password"
                                                                                                placeholder="Enter new password"
                                                                                                {...field}
                                                                                            />
                                                                                        </FormControl>
                                                                                        <FormMessage />
                                                                                    </FormItem>
                                                                                )}
                                                                            />
                                                                            {/* Action Buttons */}
                                                                            <div className="flex justify-end gap-2">
                                                                                <AlertDialogCancel asChild>
                                                                                    <Button variant="outline">Cancel</Button>
                                                                                </AlertDialogCancel>
                                                                                <Button
                                                                                    type="submit"
                                                                                    disabled={isSubmitting}
                                                                                    className="bg-green-600 text-white font-bold px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition text-sm"
                                                                                >
                                                                                    {isSubmitting ? (
                                                                                        <>
                                                                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                                                            Please Wait
                                                                                        </>
                                                                                    ) : (
                                                                                        'Change Password'
                                                                                    )}
                                                                                </Button>
                                                                            </div>
                                                                        </form>
                                                                    </Form>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </span>
                                    </li>

                                    <li className="flex items-center px-4 gap-3 py-1 hover:bg-gray-100">
                                        <FaAddressBook />
                                        {/* <span> */}
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild >
                                                <Button variant="outline" className="h-8">
                                                    Add Address
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent className="border-t-4 border-green-700">
                                                <div className="relative z-50">
                                                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                                        <div className="bg-white rounded-lg shadow-lg w-full max-w-lg max-h-screen overflow-y-auto scrollbar-hide">
                                                            <div className="">
                                                                <div className="flex justify-between  px-6 py-4 items-center  bg-green-700 text-white">

                                                                    <div></div>
                                                                    {/* <h2 className="text-center text-lg font-bold mb-0">Add Address</h2> */}
                                                                    <AlertDialogTitle>Add Address</AlertDialogTitle>
                                                                    <div>
                                                                        <AlertDialogCancel asChild>
                                                                            <button
                                                                                type="button"
                                                                                className="px-4 py-2 text-white text-5xl mt-0  border bg-green-700 transition"
                                                                            >
                                                                                X
                                                                            </button>
                                                                        </AlertDialogCancel>
                                                                    </div>
                                                                </div>

                                                                <div className="p-6">

                                                                    <Form {...addressForm}>
                                                                        <form
                                                                            onSubmit={addressForm.handleSubmit(onAddressSubmit)}
                                                                            className="space-y-6"
                                                                        >
                                                                            <FormField
                                                                                control={addressForm.control}
                                                                                name="street"
                                                                                render={({ field }) => (
                                                                                    <FormItem>
                                                                                        <FormLabel className="flex justify-start text-1xl">
                                                                                            Street
                                                                                        </FormLabel>
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
                                                                            <FormField
                                                                                control={addressForm.control}
                                                                                name="city"
                                                                                render={({ field }) => (
                                                                                    <FormItem>
                                                                                        <FormLabel className="flex justify-start text-1xl">
                                                                                            City
                                                                                        </FormLabel>
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
                                                                            <FormField
                                                                                control={addressForm.control}
                                                                                name="state"
                                                                                render={({ field }) => (
                                                                                    <FormItem>
                                                                                        <FormLabel className="flex justify-start text-1xl">
                                                                                            State
                                                                                        </FormLabel>
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
                                                                            <FormField
                                                                                control={addressForm.control}
                                                                                name="postalCode"
                                                                                render={({ field }) => (
                                                                                    <FormItem>
                                                                                        <FormLabel className="flex justify-start text-1xl">
                                                                                            Postal Code
                                                                                        </FormLabel>
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
                                                                            <FormField
                                                                                control={addressForm.control}
                                                                                name="phone"
                                                                                render={({ field }) => (
                                                                                    <FormItem>
                                                                                        <FormLabel className="flex justify-start text-1xl">
                                                                                            Phone No.
                                                                                        </FormLabel>
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
                                                                            <div className="flex gap-2 item-center justify-end">
                                                                                <AlertDialogCancel asChild>
                                                                                    <button
                                                                                        type="button"
                                                                                        className="px-4 py-2 text-gray-700 mt-0 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition"
                                                                                    >
                                                                                        Cancel
                                                                                    </button>
                                                                                </AlertDialogCancel>
                                                                                <Button
                                                                                    type="submit"
                                                                                    disabled={isSubmitting}
                                                                                    className="bg-green-600 text-white font-bold py-2 px-5 w-40 rounded-lg shadow-md hover:bg-green-700 transition-colors text-sm"
                                                                                >
                                                                                    {isSubmitting ? (
                                                                                        <>
                                                                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                                                                                            Wait
                                                                                        </>
                                                                                    ) : (
                                                                                        "Add Address"
                                                                                    )}
                                                                                </Button>
                                                                            </div>
                                                                        </form>
                                                                    </Form>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </AlertDialogContent>
                                        </AlertDialog>

                                        {/* </span> */}
                                    </li>

                                    <li className="flex items-center px-4 gap-3 py-2 hover:bg-gray-100">
                                        <GoSignOut />
                                        <span>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="outline" className="h-8">Log out</Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent className='border-t-4 border-green-700'>
                                                    <AlertDialogHeader >
                                                        <AlertDialogTitle className="text-center">
                                                            Are you sure you want to log out of E-commerce Platform?
                                                        </AlertDialogTitle>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handleSignOut('ecommerce')} className="bg-green-600 text-white font-bold py-2 px-3 rounded-lg shadow-md hover:bg-green-700 transition-colors text-sm">
                                                            Log Out
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
                    <div className="hidden lg:flex md:items-center ">
                        <Link href="/signup" className="px-5 py-2 text-white hover:text-white font-bold rounded-full shadow-md bg-green-700 hover:bg-green-800  transition duration-300">
                            Sign Up
                        </Link>
                    </div>

                    {/* signin  */}
                    <div className="hidden lg:flex md:items-center ">
                        <Link href="/ecommerce-signin" className="   font-bold  text-green-700 hover:text-green-800 transition duration-300">
                            Sign In
                        </Link>
                    </div>
                </div>


                {/* Mobile Menu */}
                <div className={`lg:hidden ${mobileMenuOpen ? "block" : "hidden"}  transition-transform duration-300`}>
                    <div className={`flex justify-end items-center py-1  ${isOpen ? "flex-col-reverse sm:flex-row" : "flex"}`}>
                        <div>
                            <div className="relative flex  items-center pr-3">
                                {!isOpen ? (
                                    // Search Icon
                                    <FaSearch
                                        className="text-xl cursor-pointer text-green-700 hover:text-green-800 transition-all"
                                        onClick={handleSearchIconClick}
                                    />
                                ) : (
                                    // Search Box
                                    <form
                                        onSubmit={handleSearch}
                                        className="relative flex items-center"
                                    >
                                        <input
                                            type="text"
                                            className="border-b border-gray-400 focus:border-gray-800 bg-transparent px-2 py-1 focus:outline-none text-gray-700 placeholder-gray-400 transition-all duration-300"
                                            placeholder="Search"
                                            value={query}
                                            onChange={(e) => setQuery(e.target.value)}
                                        />
                                        <button
                                            type="submit"
                                            className="mx-2  transition duration-300"
                                        >
                                            <FaSearch
                                                className="text-md cursor-pointer text-gray-600 hover:text-green-700 transition-all"
                                            //   onClick={handleSearchIconClick}
                                            />
                                        </button>
                                        {/* Close Button */}
                                        <button
                                            type="button"
                                            onClick={() => setIsOpen(false)}
                                            className="ml-0 text-gray-600 hover:text-red-600 w-6 h-6 transition-all duration-300 text-lg"
                                        >
                                            <FaTimes />

                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>

                        <div className='flex justify-end items-center pr-3'>
                            {/* wishlist */}
                            <div className="relative flex  items-center pr-3">
                                <Link href="/wishlist" >
                                    <>
                                        <FaHeart
                                            className="text-xl cursor-pointer text-green-700 hover:text-green-800  transition-all"
                                        />
                                        {wishlist.length > 0 && (
                                            <span className="absolute top-0 right-0 block w-5 h-5 text-xs text-white bg-green-600 rounded-full flex items-center justify-center">
                                                {wishlist.length}
                                            </span>
                                        )}
                                    </>

                                </Link>
                            </div>


                            {/* cart */}
                            <div className="relative flex  items-center pr-3">
                                <Link href="/cart" >
                                    <>
                                        <FaShoppingCart
                                            className="text-xl cursor-pointer text-green-700 hover:text-green-800  transition-all"
                                        />
                                        {cartLength > 0 && (
                                            <span className="absolute top-0 right-0 block w-5 h-5 text-xs text-white bg-green-600 rounded-full flex items-center justify-center">
                                                {cartLength}
                                            </span>
                                        )}
                                    </>

                                </Link>
                            </div>

                            {/* profile  */}
                            {userSession && (
                                <ul className="flex lg:hidden items-center  mr-3 space-x-4">
                                    <li className="relative">
                                        <div className="flex items-center cursor-pointer" onClick={toggleRightSidebar}>
                                            <FaUserAlt className="text-green-700 hover:text-green-700 xl:text-2xl text-xl" />
                                        </div>
                                        <ul className={`absolute right-0 mt-2 w-60 bg-white text-black shadow-lg rounded-md ${rightbarOpen ? 'block' : 'hidden'} transition-transform duration-200 ease-in-out`}>
                                            <li className="px-4 py-2 border-b">
                                                <h6 className="text-lg text-center font-medium">User ( {session?.user.userName} )</h6>
                                            </li>
                                            <li>
                                                <Link href="/ecommerce-profile" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100">
                                                    <CgProfile />
                                                    {/* <span>My Profile</span> */}
                                                    <Button variant="outline" className="h-8">My Profile</Button>

                                                </Link>
                                            </li>
                                            <li className="flex items-center px-4 gap-3 py-1 hover:bg-gray-100">
                                                <TbPasswordUser />
                                                <span>
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <Button variant="outline" className="h-8">
                                                                Change Password
                                                            </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent className="border-t-4 border-green-700">
                                                            <div className="relative z-50">
                                                                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                                                    <div className="bg-white rounded-lg shadow-lg w-full max-w-lg max-h-screen overflow-y-auto scrollbar-hide">
                                                                        <div className="flex justify-between  px-6 py-2 items-center  bg-green-700 text-white">

                                                                            <div></div>
                                                                            {/* <h2 className="text-center text-lg font-bold mb-0">Password</h2> */}
                                                                            <AlertDialogTitle>Change Password</AlertDialogTitle>
                                                                            <div>
                                                                                <AlertDialogCancel asChild>
                                                                                    <button
                                                                                        type="button"
                                                                                        className="px-4 py-2 text-white text-5xl mt-0  border bg-green-700 transition"
                                                                                    >
                                                                                        X
                                                                                    </button>
                                                                                </AlertDialogCancel>
                                                                            </div>
                                                                        </div>
                                                                        <div className="p-6">
                                                                            <Form {...form}>
                                                                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                                                                    {/* Old Password Field */}
                                                                                    <FormField
                                                                                        control={form.control}
                                                                                        name="oldPassword"
                                                                                        render={({ field }) => (
                                                                                            <FormItem>
                                                                                                <FormLabel className="text-sm">Old Password</FormLabel>
                                                                                                <FormControl>
                                                                                                    <Input
                                                                                                        type="password"
                                                                                                        placeholder="Enter old password"
                                                                                                        {...field}
                                                                                                    />
                                                                                                </FormControl>
                                                                                                <FormMessage />
                                                                                            </FormItem>
                                                                                        )}
                                                                                    />
                                                                                    {/* New Password Field */}
                                                                                    <FormField
                                                                                        control={form.control}
                                                                                        name="newPassword"
                                                                                        render={({ field }) => (
                                                                                            <FormItem>
                                                                                                <FormLabel className="text-sm">New Password</FormLabel>
                                                                                                <FormControl>
                                                                                                    <Input
                                                                                                        type="password"
                                                                                                        placeholder="Enter new password"
                                                                                                        {...field}
                                                                                                    />
                                                                                                </FormControl>
                                                                                                <FormMessage />
                                                                                            </FormItem>
                                                                                        )}
                                                                                    />
                                                                                    {/* Action Buttons */}
                                                                                    <div className="flex justify-end gap-2">
                                                                                        <AlertDialogCancel asChild className='mt-0'>
                                                                                            <Button variant="outline">Cancel</Button>
                                                                                        </AlertDialogCancel>
                                                                                        <Button
                                                                                            type="submit"
                                                                                            disabled={isSubmitting}
                                                                                            className="bg-green-600 text-white font-bold px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition text-sm"
                                                                                        >
                                                                                            {isSubmitting ? (
                                                                                                <>
                                                                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                                                                    Please Wait
                                                                                                </>
                                                                                            ) : (
                                                                                                'Change Password'
                                                                                            )}
                                                                                        </Button>
                                                                                    </div>
                                                                                </form>
                                                                            </Form>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </span>
                                            </li>

                                            <li className="flex items-center px-4 gap-3 py-1 hover:bg-gray-100">
                                                <FaAddressBook />
                                                {/* <span> */}
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild >
                                                        <Button variant="outline" className="h-8">
                                                            Add Address
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent className="border-t-4 border-green-700">
                                                        <div className="relative z-50">
                                                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                                                <div className="bg-white rounded-lg shadow-lg w-full max-w-lg max-h-screen overflow-y-auto scrollbar-hide">
                                                                    <div className="">
                                                                        <div className="flex justify-between  px-6 py-2 items-center  bg-green-700 text-white">

                                                                            <div></div>
                                                                            {/* <h2 className="text-center text-lg font-bold mb-0">Add Address</h2> */}
                                                                            <AlertDialogTitle>Change Password</AlertDialogTitle>
                                                                            <div>
                                                                                <AlertDialogCancel asChild>
                                                                                    <button
                                                                                        type="button"
                                                                                        className="px-4 py-2 text-white text-5xl mt-0  border bg-green-700 transition"
                                                                                    >
                                                                                        X
                                                                                    </button>
                                                                                </AlertDialogCancel>
                                                                            </div>
                                                                        </div>

                                                                        <div className="p-6">

                                                                            <Form {...addressForm}>
                                                                                <form
                                                                                    onSubmit={addressForm.handleSubmit(onAddressSubmit)}
                                                                                    className="space-y-6"
                                                                                >
                                                                                    <FormField
                                                                                        control={addressForm.control}
                                                                                        name="street"
                                                                                        render={({ field }) => (
                                                                                            <FormItem>
                                                                                                <FormLabel className="flex justify-start text-1xl">
                                                                                                    Street
                                                                                                </FormLabel>
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
                                                                                    <FormField
                                                                                        control={addressForm.control}
                                                                                        name="city"
                                                                                        render={({ field }) => (
                                                                                            <FormItem>
                                                                                                <FormLabel className="flex justify-start text-1xl">
                                                                                                    City
                                                                                                </FormLabel>
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
                                                                                    <FormField
                                                                                        control={addressForm.control}
                                                                                        name="state"
                                                                                        render={({ field }) => (
                                                                                            <FormItem>
                                                                                                <FormLabel className="flex justify-start text-1xl">
                                                                                                    State
                                                                                                </FormLabel>
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
                                                                                    <FormField
                                                                                        control={addressForm.control}
                                                                                        name="postalCode"
                                                                                        render={({ field }) => (
                                                                                            <FormItem>
                                                                                                <FormLabel className="flex justify-start text-1xl">
                                                                                                    Postal Code
                                                                                                </FormLabel>
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
                                                                                    <FormField
                                                                                        control={addressForm.control}
                                                                                        name="phone"
                                                                                        render={({ field }) => (
                                                                                            <FormItem>
                                                                                                <FormLabel className="flex justify-start text-1xl">
                                                                                                    Phone No.
                                                                                                </FormLabel>
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
                                                                                    <div className="flex gap-2 item-center justify-end">
                                                                                        <AlertDialogCancel asChild>
                                                                                            <button
                                                                                                type="button"
                                                                                                className="px-4 py-2 text-gray-700 mt-0 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition"
                                                                                            >
                                                                                                Cancel
                                                                                            </button>
                                                                                        </AlertDialogCancel>
                                                                                        <Button
                                                                                            type="submit"
                                                                                            disabled={isSubmitting}
                                                                                            className="bg-green-600 text-white font-bold py-2 px-5 w-40 rounded-lg shadow-md hover:bg-green-700 transition-colors text-sm"
                                                                                        >
                                                                                            {isSubmitting ? (
                                                                                                <>
                                                                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                                                                                                    Wait
                                                                                                </>
                                                                                            ) : (
                                                                                                "Add Address"
                                                                                            )}
                                                                                        </Button>
                                                                                    </div>
                                                                                </form>
                                                                            </Form>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </AlertDialogContent>
                                                </AlertDialog>

                                                {/* </span> */}
                                            </li>

                                            <li className="flex items-center px-4 gap-3 py-2 hover:bg-gray-100">
                                                <GoSignOut />
                                                <span>
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <Button variant="outline" className="h-8">Log out</Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent className='border-t-4 border-green-700'>
                                                            <AlertDialogHeader >
                                                                <AlertDialogTitle className="text-center">
                                                                    Are you sure you want to log out of E-commerce Platform?
                                                                </AlertDialogTitle>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                <AlertDialogAction onClick={() => handleSignOut('ecommerce')} className="bg-green-600 text-white font-bold py-2 px-3 rounded-lg shadow-md hover:bg-green-700 transition-colors text-sm">
                                                                    Log Out
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
                                <Link href="/signup" className="block text-center px-4 py-1  text-white bg-green-700 hover:bg-green-800 font-bold rounded-full shadow-md hover:bg-green-600 hover:text-white transition duration-300">
                                    Sign Up
                                </Link>
                            </div>
                            <div className="px-1 py-2">
                                <Link href="/ecommerce-signin" className="  text-green-700 font-bold  hover:text-green-800 transition duration-300">
                                    Sign In
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className={` ${isOpen ? 'h-screen ' : 'h-[155px]'}`}>
                        <div className={` ${isOpen ? 'h-full ' : 'h-[155px]'} overflow-y-auto`}>
                            <div>

                                <ul className="text-green-800 bg-[#f2f2f2] py-2 space-y-2">
                                    <li className="px-4 mt-2 hover:bg-white" onClick={() => handleClick(`/get-involved`)}>
                                        Home
                                    </li>

                                    {categories.map((category) => (
                                        <li
                                            key={category.value}
                                            className="px-4  hover:bg-white"
                                            onClick={() => handleClick(`/shop/${category.value}`)}
                                        >
                                            {category.label}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Search Form */}
                            {isOpen && (
                                <>
                                    <div className=" lg:hidden  py-4   w-100">
                                        <div className=' p-4  '>

                                            <h1 className="text-xl font-semibold mb-4">
                                                {query ? `Search Results for "${query}"` : 'All Products'}
                                            </h1>

                                            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4  mb-[110px] ">
                                                {filteredProducts.length > 0 ? (
                                                    filteredProducts.map((product) => (
                                                        <div
                                                            key={product.id}
                                                            className="border cursor-pointer rounded-lg shadow-md hover:shadow-lg transition-shadow"
                                                            onClick={() => handleProductClick(product.category, product._id)}

                                                        >
                                                            <div className='sm:p-4 p-3 bg-white'>

                                                                <img
                                                                    src={product.images[0]}
                                                                    alt={product.productName}
                                                                    className="w-full h-40 object-contain mb-2 rounded-lg"
                                                                />
                                                            </div>
                                                            <div className='sm:p-4 p-3'>
                                                                <h2 className="text-lg font-semibold">{product.productName}</h2>
                                                                <p className="text-green-600 font-bold">₹{product.sellingPrice}</p>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p className="col-span-full text-center">No results found for "{query}"</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                </div>

                {/* Conditional Search Bar desktop*/}
                {isOpen && (
                    <div>
                        {/* Search Form */}
                        {isOpen && (
                            <>
                                <div className='py-1'>

                                    <div className={` ${isOpen ? 'h-full ' : 'h-[155px]'}`}>
                                        <div className={` ${isOpen ? 'h-full max-h-[400px] ' : 'h-[155px]'} overflow-y-auto`}>
                                            <div className="hidden lg:flex container w-full py-4 px-4 mx-auto h-full max-h-[500px]">
                                                <div className='overflow-y-auto w-full scrollbar-hide '>

                                                    <h1 className="text-xl font-semibold pl-1 mb-4">
                                                        {query ? `Search Results for "${query}"` : 'All Products'}
                                                    </h1>

                                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 overflow-auto  p-2 scrollbar-hide">
                                                        {filteredProducts.length > 0 ? (
                                                            filteredProducts.map((product) => (
                                                                <div
                                                                    key={product.id}
                                                                    className=" cursor-pointer border-green-700 border-t-2   rounded-lg shadow-md hover:shadow-lg transition-shadow"
                                                                    onClick={() => handleProductClick(product.category, product._id)}

                                                                >
                                                                    <div className='bg-white p-4'>

                                                                        <img
                                                                            src={product.images[0]}
                                                                            alt={product.productName}
                                                                            className="w-full h-40 object-contain mb-2 rounded-lg"
                                                                        />
                                                                    </div>
                                                                    <div className='p-4'>
                                                                        <h2 className="text-lg font-semibold">{product.productName}</h2>
                                                                        <p className="text-green-600 font-bold">₹{product.sellingPrice}</p>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <p className="col-span-full text-center">No results found for "{query}"</p>
                                                        )}
                                                    </div>
                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </nav>
        </>

    );
}

export default EcommerceNavbar