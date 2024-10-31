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



     const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

   // Filtered users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );



//   pagination
 const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };


    return (
        <>
            <Head>
                <title>Admin users - Green Foundation</title>
                <meta name="description" content="This is the users data of ecommerce." />
            </Head>
            <div>
                <div className="sm:container p-1 sm:mx-auto sm:px-6 my-16 sm:py-16">
                    <h1 className="text-3xl font-bold leading-tight mb-4">Ecommerce Users</h1>
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                        </>
                    ) : (
                        <div className="p-8  bg-white border-t-4 border-green-700 rounded-xl shadow-xl">
                        {/* Search Input */}
                        <div className="mb-8">
                          <input
                            type="text"
                            placeholder="Search by username or email"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="px-5 py-3 border border-gray-400 rounded-md w-full focus:outline-none focus:ring-4 focus:ring-[#80a382] focus:border-transparent shadow-lg transition duration-300 ease-in-out text-gray-700"
                          />
                        </div>
                      
                        {/* Table */}
                        <div className="overflow-x-auto scrollbar-hide">
                          <table className="min-w-full bg-white rounded-xl shadow-lg overflow-hidden">
                            <thead>
                              <tr className="bg-green-700 text-white">
                                <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wide">Username</th>
                                <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wide">Email</th>
                                <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wide">Is Verified</th>
                                <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wide">Role</th>
                                {/* <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wide">Cart Items</th>
                                <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wide">Purchase History</th> */}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {currentUsers.map((user, index) => (
                                <tr
                                  key={user._id.toString()}
                                  className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-50'} hover:bg-gray-200 transition duration-200`}
                                 
                                >
                                  <td className="py-4 px-6">{user.userName}</td>
                                  <td className="py-4 px-6">{user.email}</td>
                                  <td className="py-4 px-6">
                                    <span
                                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                        user.isVerified ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                                      }`}
                                    >
                                      {user.isVerified ? 'True' : 'False'}
                                    </span>
                                  </td>
                                  <td className="py-4 px-6">{user.role}</td>
                                  {/* <td className="py-4 px-6">{user.cart.length}</td> */}
                                  {/* <td className="py-4 px-6">{user.buy.length}</td> */}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      
                        {/* Pagination */}
                        <div className="mt-8 flex justify-between items-center space-x-4">
                          <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            className={`px-6 py-2 rounded-full shadow-md font-semibold text-lg ${
                              currentPage === 1
                                ? 'bg-gray-300 text-gray-700'
                                : 'bg-green-800 text-white  hover:bg-green-700'
                            } transition duration-200 ease-in-out transform hover:scale-105`}
                          >
                            Previous
                          </button>
                          <span className="font-semibold text-gray-800 text-xl">
                            Page {currentPage} of {totalPages}
                          </span>
                          <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className={`px-6 py-2 rounded-full shadow-md font-semibold text-lg ${
                              currentPage === totalPages
                                ? 'bg-gray-300 text-gray-700'
                                : 'bg-green-800 text-white  hover:bg-green-700'
                            } transition duration-200 ease-in-out transform hover:scale-105`}
                          >
                            Next
                          </button>
                        </div>
                      </div>
                      
                      
                      
                    )}
                </div>
            </div>

        </>

    )
}

export default page
