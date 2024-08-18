'use client'

import React from "react"
import Link from "next/link"
import { useSession ,signOut} from "next-auth/react"
import {User} from 'next-auth'
import { Button } from "./ui/button"

const Navbar = () => {

    const {data:session} = useSession()

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

  <Link href="/signup" className="px-5 py-2 bg-white text-green-800 font-bold rounded-full shadow-md hover:bg-green-600 hover:text-white transition duration-300">
    Sign Up
  </Link>
</div>


        </>
    )
}

export default Navbar