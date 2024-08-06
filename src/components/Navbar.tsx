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
        <nav className="px-4 py-4 shadow-md bg-mixed-color text-white">
            <div className="container  flex flex-row justify-between items-center">
                <a href="#" className="text-xl font-bold  ">Green Foundation</a>

                <div className="flex gap-5 items-center">
                    <Link href="/">Home</Link>
                    <Link href="/about">About</Link>
                    <Link href="/project">Project</Link>
                    <Link href="/getinvolved">Get Involved</Link>
                </div>
                {
                    // session ? (
                    //     <>
                    //     <div className="flex justify-center items-center ">
                    //     <a className="button button-green" onClick={()=> signOut}>Logout</a>
                    //     </div>
                    //     </>
                    // ):(
                            <Link href='/signup' className="button button-green">Sign Up</Link>
                    // )
                }
            </div>
        </nav>
        </>
    )
}

export default Navbar