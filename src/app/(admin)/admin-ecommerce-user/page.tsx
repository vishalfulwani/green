'use client'

import { ApiResponse } from '@/helpers/ApiResponse'
import { IUser } from '@/models/user.models'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'


function page() {

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [users, setUsers] = useState<IUser[]>([])

    useEffect(() => {
        const fetchUsers = async () => {
            setIsSubmitting(true)
            try {
                const allUsers = await axios.get<ApiResponse>('/api/get-all-users')
                const userData = allUsers.data.data as []
                setUsers(userData)
            } catch (error) {
                console.error("Error fetching users:", error)
            } finally {
                setIsSubmitting(false)
            }
        }

        fetchUsers()
    }, [])




    return (
        <>
            <Head>
                <title>Admin users - Green Foundation</title>
                <meta name="description" content="This is the users data of ecommerce." />
            </Head>
            <div>
                <div className="container mx-auto px-6 my-16 py-16">
                    <h1 className="text-3xl font-bold leading-tight mb-4">Users</h1>
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                        </>
                    ) : (
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">UserName</th>
                                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Email</th>
                                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">IsVerified</th>
                                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Role</th>
                                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Cart</th>
                                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Buy</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id.toString()}>
                                        <td className="py-2 px-4 border-b border-gray-200">{user.userName}</td>
                                        <td className="py-2 px-4 border-b border-gray-200">{user.email}</td>
                                        <td className="py-2 px-4 border-b border-gray-200">{user.isVerified ? "True":"False"}</td>
                                        <td className="py-2 px-4 border-b border-gray-200">{user.role}</td>
                                        <td className="py-2 px-4 border-b border-gray-200">{user.cart.length}</td>
                                        <td className="py-2 px-4 border-b border-gray-200">{user.buy.length}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

        </>

    )
}

export default page
