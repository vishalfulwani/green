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
        <nav className="px-4 py-4 shadow-md">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <a href="#" className="text-xl font-bold mb-4 md:mb-0 w-40">Green Foundation</a>
                {
                    session ? (
                        <>
                        <div className="flex justify-between items-center ">
                        <Button className="w-15" onClick={()=> signOut}>Logout</Button>
                        </div>
                        </>
                    ):(
                        <Link href='/signin'>
                            <Button className="w-full">Login</Button>
                        </Link>
                    )
                }
            </div>
        </nav>
        </>
    )
}

export default Navbar