'use client'

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { User } from 'next-auth'
import { Button } from "./ui/button"
import { FaUserAlt } from "react-icons/fa"
import { CgProfile } from "react-icons/cg"
import { TbPasswordUser } from "react-icons/tb"
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
import { GoSignOut } from "react-icons/go"



const FoundationNavbar = () => {

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [rightbarOpen, setRightbarOpen] = useState(false)



  const [userSession, setUserSession] = useState(false)
  const { data: session, status } = useSession();
  console.log(session?.platform)
  useEffect(() => {
    if (session?.platform === 'foundation') {
        setUserSession(true);
    }
}, [session]);


  const toggleRightSidebar = () => {
    setRightbarOpen(!rightbarOpen)
}
  

  // signout
  const handleSignOut = (platform: any) => {
    signOut({
      callbackUrl: platform === "ecommerce" ? "/ecommerce-signin" : "/foundation-signin",
    });
  };

  return (
    <>


      <div className="flex flex-row justify-between items-center py-4 px-8 bg-gradient-to-r from-green-900 to-green-700 fixed z-50 top-0 w-full shadow-lg ">
        <a href="#" className="text-3xl font-extrabold text-white hover:text-green-500 transition duration-300">
          Green Foundation
        </a>

        <div className="flex gap-8 items-center">
          <Link href="/" className="text-lg font-medium text-white hover:text-green-500 transition duration-300">
            Home
          </Link>
          <Link href="/about" className="text-lg font-medium text-white hover:text-green-500 transition duration-300">
            About
          </Link>
          <Link href="/project" className="text-lg font-medium text-white hover:text-green-500 transition duration-300">
            Project
          </Link>
          <Link href="/get-involved" className="text-lg font-medium text-white hover:text-green-500 transition duration-300">
            Get Involved
          </Link>
        </div>



<div className="items-center flex">
  
        {userSession && (
          <ul className="hidden md:flex items-center  space-x-4">
            <li className="relative">
              <div className="flex items-center  cursor-pointer" onClick={toggleRightSidebar}>
                <FaUserAlt className="hover:text-green-600 text-white mr-3 text-2xl" />
              </div>
              <ul className={`absolute right-0 mt-2 w-60 bg-white text-black shadow-lg rounded-md ${rightbarOpen ? 'block' : 'hidden'} transition-transform duration-200 ease-in-out`}>
                <li className="px-4 py-2 border-b">
                  <h6 className="text-lg text-center font-medium">User</h6>
                </li>
                <li>
                  <Link href="/foundation-profile" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100">
                    <CgProfile />
                    {/* <span>My Profile</span> */}
                    <Button variant="outline">My Profile</Button>

                  </Link>
                </li>
                {/* <li className="flex items-center px-4 gap-3 py-2 hover:bg-gray-100">
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
                </li> */}
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
                            Are you sure you want to log out of Foundation Platform?
                          </AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleSignOut('foundation')} className="bg-green-600 text-white font-bold py-2 px-3 rounded-lg shadow-md hover:bg-green-700 transition-colors text-sm">
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
        <Link href="/foundation-signin" className="px-5 py-2 bg-white text-green-800 font-bold rounded-full shadow-md hover:bg-green-600 hover:text-white transition duration-300">
          Sign In
        </Link>
      </div>
      </div>


    </>
  )
}

export default FoundationNavbar