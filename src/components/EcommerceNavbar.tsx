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

const categories = [
    { value: 'plants', label: 'Plants' },
    { value: 'tools', label: 'Tools' },
    { value: 'seeds', label: 'Seeds' },
];

// const subCategories: Record<string, { value: string; label: string }[]> = {
//     plants: [
//         { value: 'indoor-plants', label: 'Indoor Plants' },
//         { value: 'outdoor-plants', label: 'Outdoor Plants' },
//         { value: 'herbs', label: 'Herbs' },
//         { value: 'vegetables', label: 'Vegetables' },
//         { value: 'succulents', label: 'Succulents' },
//         { value: 'aquatic-plants', label: 'Aquatic Plants' },
//         { value: 'medicinal-plants', label: 'Medicinal Plants' },
//         { value: 'tropical-plants', label: 'Tropical Plants' },
//     ],
//     tools: [
//         { value: 'hand-tools', label: 'Hand Tools' },
//         { value: 'power-tools', label: 'Power Tools' },
//         { value: 'watering-tools', label: 'Watering Tools' },
//         { value: 'planting-tools', label: 'Planting Tools' },
//         { value: 'garden-maintenance', label: 'Garden Maintenance' },
//     ],
//     seeds: [
//         { value: 'vegetable-seeds', label: 'Vegetable Seeds' },
//         { value: 'flower-seeds', label: 'Flower Seeds' },
//         { value: 'herb-seeds', label: 'Herb Seeds' },
//         { value: 'fruit-seeds', label: 'Fruit Seeds' },
//         { value: 'grass-seeds', label: 'Grass Seeds' },
//     ],
// };

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


    // signout
    const handleSignOut = (platform: any) => {
        signOut({
            callbackUrl: platform === "ecommerce" ? "/ecommerce-signin" : "/foundation-signin",
        });
    };

    return (



        <nav className="bg-green-800 text-white py-4 fixed w-full top-0 left-0 shadow-md z-50">
            <div className="container mx-auto px-1 flex justify-between items-center">
                <div className="text-2xl font-bold">Plant E-commerce</div>

                {/* Hamburger Icon */}
                <div className="md:hidden flex items-center">
                    <button
                        className="outline-none mobile-menu-button"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {/* <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                            />
                        </svg> */}
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

                {userSession && (
                    <ul className="hidden md:flex items-center mr-3 space-x-4">
                        <li className="relative">
                            <div className="flex items-center cursor-pointer" onClick={toggleRightSidebar}>
                                <FaUserAlt className="hover:text-green-600 text-2xl" />
                            </div>
                            <ul className={`absolute right-0 mt-2 w-60 bg-white text-black shadow-lg rounded-md ${rightbarOpen ? 'block' : 'hidden'} transition-transform duration-200 ease-in-out`}>
                                <li className="px-4 py-2 border-b">
                                    <h6 className="text-lg text-center font-medium">User</h6>
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



                <div className="hidden md:flex md:items-center ">
                    <Link href="/signup" className="px-5 py-2 bg-white text-green-800 font-bold rounded-full shadow-md hover:bg-green-600 hover:text-white transition duration-300">
                        Sign Up
                    </Link>
                </div>



            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden ${mobileMenuOpen ? "block" : "hidden"} transition-transform duration-300`}>
                <ul className="bg-green-800 text-white py-2 space-y-2">
                    <li className="px-4 py-2 hover:bg-green-700" onClick={() => handleClick(`/get-involved`)}>
                        Home
                    </li>
                    {categories.map((category) => (
                        <li
                            key={category.value}
                            className="px-4 py-2 hover:bg-green-700"
                            onClick={() => handleClick(`/shop/${category.value}`)}
                        >
                            {category.label}
                        </li>
                    ))}
                    <li className="px-4 py-2 hover:bg-green-700">
                        <Link href="/signup" className="block text-center px-4 py-1 bg-white text-green-800 font-bold rounded-full shadow-md hover:bg-green-600 hover:text-white transition duration-300">
                            Sign Up
                        </Link>
                    </li>
                    <li className="relative px-4 py-2 hover:bg-green-700">
                        <div className="cursor-pointer block text-center px-4 py-1 bg-white text-green-800 font-bold rounded-full shadow-md hover:bg-green-600 hover:text-white transition duration-300" onClick={toggleRightSidebar}>
                            User
                        </div>
                        <ul className={`absolute right-0 mt-2 w-full bg-white text-black shadow-lg rounded-md ${rightbarOpen ? 'block' : 'hidden'} transition-transform duration-200 ease-in-out`}>
                            <li className="px-4 py-2 border-b">
                                <h6 className="text-lg text-center font-medium">User</h6>
                            </li>
                            <li>
                                <Link href="/ecommerce-profile" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100">
                                    <CgProfile />
                                    {/* <span>My Profile</span> */}
                                    <Button variant="outline">Profile</Button>
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
                                            <AlertDialogTitle className='text-center'>
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
            </div>
        </nav>



    );
}

export default EcommerceNavbar