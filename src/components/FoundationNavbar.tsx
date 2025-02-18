'use client'

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { User } from 'next-auth'
import { Button } from "./ui/button"
import { FaBars, FaTimes, FaUserAlt } from "react-icons/fa"
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

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>


{/* <div className="flex flex-row justify-between items-center py-4 px-8 bg-gradient-to-r from-green-900 to-green-700 fixed z-50 top-0 w-full shadow-lg"> */}
<div className="flex flex-row justify-between items-center text-green-700  bg-[#f2f2f2] text-green py-4 px-4 fixed w-full top-0 left-0 shadow-md z-50">

      <a href="#" className="text-2xl sm:font-bold font-extrabold  hover:text-green-500 transition duration-300">
        Green Foundation
      </a>

      <div className="hidden md:flex gap-8 items-center">
        <Link href="/" className="text-lg font-medium hover:text-green-500 transition duration-300">
          Home
        </Link>
        <Link href="/about" className="text-lg font-medium  hover:text-green-500 transition duration-300">
          About
        </Link>
        <Link href="/contact" className="text-lg font-medium  hover:text-green-500 transition duration-300">
          Contact
        </Link>
        {/* <Link href="/project" className="text-lg font-medium  hover:text-green-500 transition duration-300">
          Project
        </Link> */}
        <Link href="/get-involved" className="text-lg font-medium  hover:text-green-500 transition duration-300">
          Get Involved
        </Link>
      </div>

      <div className="md:hidden flex items-center">
        <button onClick={toggleMobileMenu} className="text-green-800 text-2xl focus:outline-none">
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

     {/* mobile */}
      <div className={`md:hidden flex flex-col  bg-[#f2f2f2] w-full absolute top-full left-0 py-4 transition-transform duration-300 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-8">
      {userSession && (
          <ul className="flex md:hidden justify-end items-center space-x-4">
            <li className="relative">
              <div className="flex items-center cursor-pointer" onClick={toggleRightSidebar}>
                <FaUserAlt className="hover:text-green-600   text-2xl" />
              </div>
              <ul className={`absolute right-0 mt-2 md:w-60 bg-white text-black shadow-lg rounded-md ${rightbarOpen ? 'block' : 'hidden'} transition-transform duration-200 ease-in-out`}>
                <li className="px-4 py-1 border-b">
                  <h6 className="text-lg text-center font-medium">User , {session?.user?.userName}</h6>
                </li>
                <li>
                  <Link href="/foundation-profile" className="flex items-center gap-3 px-4 py-1 pt-2 hover:bg-gray-100">
                    <CgProfile />
                    <Button variant="outline" className="h-8">My Profile</Button>
                  </Link>
                </li>
                <li className="flex items-center px-4 gap-3 py-1 pb-2 hover:bg-gray-100">
                  <GoSignOut />
                  <span>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" className="h-8">Log out</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent  className='border-t-4 border-green-700'>
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-center">
                            Are you sure you want to log out of Foundation Platform?
                          </AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="font-medium text-md">Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleSignOut('foundation')} className="bg-green-600 w-auto text-white font-medium py-2 px-3 rounded-lg shadow-md hover:bg-green-700 transition-colors text-md">
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
        {!userSession && (
          <div className="flex justify-end">

          <Link href="/foundation-signin" className="px-5 py-1  bg-green-700 text-white font-bold rounded-full shadow-md hover:bg-green-800 hover:text-white transition duration-300">
            Sign In
          </Link>
          </div>
        )}
        </div>

        <Link href="/" className="text-lg hover:bg-white px-8 mt-1 font-medium  hover:text-green-600 transition duration-300">
          Home
        </Link>
        <Link href="/about" className="text-lg hover:bg-white px-8 font-medium  hover:text-green-600 transition duration-300">
          About
        </Link>
        <Link href="/contact" className="text-lg hover:bg-white px-8 font-medium  hover:text-green-600 transition duration-300">
          Contact
        </Link>
        <Link href="/get-involved" className="text-lg hover:bg-white px-8 font-medium  hover:text-green-600 transition duration-300">
          Get Involved
        </Link>
    
      {/* </div> */}
      </div>

      <div className="items-center hidden md:flex">
        {userSession && (
          <ul className="hidden md:flex items-center space-x-4">
            <li className="relative">
              <div className="flex items-center cursor-pointer" onClick={toggleRightSidebar}>
                <FaUserAlt className="hover:text-green-600 text-green-700 mr-3 text-2xl" />
              </div>
              <ul className={`absolute right-0 mt-2 w-60 bg-white text-black shadow-lg rounded-md ${rightbarOpen ? 'block' : 'hidden'} transition-transform duration-200 ease-in-out`}>
                <li className="px-4 py-2 border-b">
                  <h6 className="text-lg text-center font-medium">User  ( {session?.user.userName} )</h6>
                </li>
                <li>
                  <Link href="/foundation-profile" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100">
                    <CgProfile />
                    <Button variant="outline">My Profile</Button>
                  </Link>
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
        {!userSession && (
          <Link href="/foundation-signin" className="px-5 py-2 bg-green-700 text-white font-bold rounded-full shadow-md hover:bg-green-800 hover:text-white transition duration-300">
            Sign In
          </Link>
        )}
      </div>

   
    </div>



    </>
  )
}

export default FoundationNavbar