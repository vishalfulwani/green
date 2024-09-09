'use client'

import React from "react"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { User } from 'next-auth'
// import { Button } from "./ui/button"



// import AdminNavbar from "@/components/AdminNavbar";
import { Toaster } from "@/components/ui/toaster";
import Image from "next/image";
// import Link from "next/link";
import { useState } from "react";
import { MdDashboard } from "react-icons/md";
import { FaTable } from "react-icons/fa";
import { FaBoxOpen } from "react-icons/fa";
import { SiGithubsponsors } from "react-icons/si";
import { MdShoppingCart } from "react-icons/md";
import { FaDonate } from "react-icons/fa";
import { MdOutlineFoundation } from "react-icons/md";
import { FaShop } from "react-icons/fa6";
import { GiFountain } from "react-icons/gi";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiCoupon2Fill } from "react-icons/ri";
import { GoSignOut } from "react-icons/go";
import { TbPasswordUser } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";

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


const AdminNavbar = ({
  children,
}: { children: React.ReactNode }) => {

  const { data: session } = useSession()


  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sideMargin, setSideMargin] = useState('ml-0')
  const [rightbarOpen, setRightbarOpen] = useState(false)
  const [subPartOpen, setSubPartOpen] = useState(false)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    if (sidebarOpen) {
      setSideMargin('ml-0')
    } else {
      setSideMargin('ml-60')
    }
  };
  const toggleRightSidebar = () => {
    setRightbarOpen(!rightbarOpen)
  }

  // Used in left menu
  const toggleSubPart = () => {
    setSubPartOpen(!subPartOpen)
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
  const handleSignOut = async (platform: any) => {
    try {
      const response = await axios.post("/api/session-handle", {}, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const sessionData = response.data;

      if (sessionData.success) {
        if (sessionData.platform === "ecommerce") {
          signOut({
            callbackUrl: platform === "ecommerce" ? "/ecommerce-signin" : "/foundation-signin",
          });
        }
      }
    }
    catch (error) {
      console.log("error::", error)
    }

  }

  return (
    <>
      <header id="header" className="fixed top-0 w-full flex px-6 py-2 items-center bg-green-800 text-white shadow-md z-50">
        <div className="flex items-center w-full pr-4">
          <Link href="/">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold ">Green Foundation</h1>
            </div>
          </Link>
          <button onClick={toggleSidebar} className="2xl ml-2 focus:outline-none">
            <GiHamburgerMenu size={24} />
          </button>
        </div>

        <nav className="ml-auto py-4">
          <ul className="flex items-center space-x-4">
            <li className="relative">
              {/* <Link href="#"> */}
              <div className="flex items-center" onClick={toggleRightSidebar}>
                <Image src="/img/profile-img.jpg" alt="Profile" className="rounded-full" width={30} height={30} />
                <span className="ml-2 hidden md:inline-block">Admin</span>
              </div>
              {/* </Link> */}
              <ul className={` absolute right-0 mt-2 cursor-pointer w-60 bg-white text-black shadow-lg rounded-md transform ${rightbarOpen ? 'block' : 'hidden'} transition-transform duration-200 ease-in-out`}>
                <li className="px-4 py-2 border-b">
                  <h6 className="text-lg text-center font-medium">Admin</h6>
                </li>
                <li>
                  <Link href="/users-profile">
                    <div className="flex items-center gap-3 px-4  py-2">
                      <CgProfile />
                      <span>My Profile</span>
                    </div>
                  </Link>
                </li>
                <li>
                  <div className="flex items-center px-4 gap-3 py-2">
                    <TbPasswordUser />
                    <span>
                      <AlertDialog  >
                        <AlertDialogTrigger asChild>
                          <Button variant="outline"  >Change Password</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle className='text-center'>
                              <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
                                  <FormField
                                    control={form.control}
                                    name="oldPassword"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel className="flex justify-start  text-1xl">Old Password</FormLabel>
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
                                        <FormLabel className="flex justify-start  text-1xl">New Password</FormLabel>
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
                                      className=" bg-green-600 text-white font-bold py-2 px-3 rounded-lg shadow-md hover:bg-green-700 transition-colors text-sm"
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
                          </AlertDialogHeader>
                        </AlertDialogContent>
                      </AlertDialog>
                    </span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center px-4 gap-3 py-2">
                    <GoSignOut />
                    <span>
                      <AlertDialog  >
                        <AlertDialogTrigger asChild>
                          <Button variant="outline"  >Log out</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle className='text-center'>
                              Are you sure you want to log out  of E-commerce Platform ?
                            </AlertDialogTitle>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleSignOut('ecommerce')} className=" bg-green-600 text-white font-bold py-2 px-3 rounded-lg shadow-md hover:bg-green-700 transition-colors text-sm">Sign Out</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </span>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </header>


      {/* side bar */}
      <div className={`fixed top-0 pt-20 left-0 w-64 bg-green-800 text-white h-full shadow-md transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-200 ease-in-out `}>
        <ul className=" py-4">
          <li>
            <Link href="/admin">
              <div className="flex px-4 py-2 gap-2 items-center  hover:bg-green-900">
                <MdDashboard />
                <span>Dashboard</span>
              </div>
            </Link>
          </li>

          <li>
            <div className="flex px-4 py-2 gap-2 items-center  hover:bg-green-900" onClick={toggleSubPart}>
              <FaTable />
              <span>User Data</span>
            </div>
            <ul className={` ${subPartOpen ? "visible" : "hidden"}`}>
              <li>
                <Link href="/admin-donations">
                  <div className="flex pl-10 pr-4 py-2 gap-2 items-center  hover:bg-green-900">
                    <GiFountain />
                    <span>Foundation</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/admin-ecommerce-user">
                  <div className="flex pl-10 pr-4 py-2 gap-2 items-center  hover:bg-green-900">
                    <FaShop />
                    <span>E-commerce</span>
                  </div>
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link href="/admin-products">
              <div className="flex px-4 py-2 gap-2 items-center  hover:bg-green-900">
                <FaBoxOpen />
                <span>Product</span>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/admin-sponsors">
              <div className="flex px-4 py-2 gap-2 items-center  hover:bg-green-900">
                <SiGithubsponsors />
                <span>Sponsor</span>
              </div>
            </Link>
          </li>
          <li >
            <Link href="/register">
              <div className="flex px-4 py-2 gap-2 items-center hover:bg-green-900">
                <MdShoppingCart />
                <span>Buyed Data</span>
              </div>
            </Link>
          </li>
          <li >
            <Link href="/admin-donations">
              <div className="flex px-4 py-2 gap-2  items-center hover:bg-green-900">
                <FaDonate />
                <span>Donate</span>
              </div>
            </Link>
          </li>
          <li >
            <Link href="/admin-coupon">
              <div className="flex px-4 py-2 gap-2  items-center hover:bg-green-900">
                <RiCoupon2Fill />
                <span>Coupon</span>
              </div>
            </Link>
          </li>
        </ul>
      </div>

      <main className={`min-h-screen p-4 bg-[#accbb7] ${sideMargin}`}>
        {children}
      </main>
    </>
  )
}

export default AdminNavbar