'use client'

import Image from 'next/image';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { FaDollarSign, FaLeaf, FaRegChartBar, FaShoppingCart, FaUsers } from 'react-icons/fa';
import { LineChart, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { IDonation } from '@/models/donation.models';
import axios from 'axios';
import { IOrder } from '@/models/order.models';
import { ApiResponse } from '@/helpers/ApiResponse';
import { IProduct } from '@/models/product.models';
import { IUser } from '@/models/user.models';

const Page = () => {

    const [donations, setDonations] = useState<IDonation[]>([]);
    const [foundationUser, setFoundationUser] = useState("");
    const [ecommerceUser, setEcommerceUser] = useState("");
    const [ecommerceUserData, setEcommerceUserData] = useState<IUser[]>([]);
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [isLoading, setIsLoading] = useState(true); // Loading state for UX
    const [products, setProducts] = useState<IProduct[]>([])


    const { data: session, status } = useSession()
    let userName;
    if (session) {
        userName = session.user?.userName
    }

    // Donations
    useEffect(() => {
        const fetchDonations = async () => {
            if (status !== "authenticated" || !session?.user?._id) return;

            setIsLoading(true);
            try {
                const response = await axios.get('/api/get-donation', {
                    params: {
                        userId: session?.user?._id, // Pass userId from session
                    },
                });

                const allDonations = response.data.data;
                const user = Array.from(new Set(allDonations.map((donor: any) => donor.donorEmail)));

                setDonations(allDonations);
                setFoundationUser(user.length.toString())
            } catch (error) {
                console.error("Error fetching donations:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDonations();
    }, [status, session]);




    //  orders 
    useEffect(() => {
        const fetchOrders = async () => {

            setIsLoading(true);
            try {
                const response = await axios.get<{ data: IOrder[] }>('/api/get-buy-order', {
                    params: {
                        userId: session?.user?._id, // Pass userId from session
                    },
                });
                const allOrders = response.data.data; // Set orders after fetching
                setOrders(allOrders);


            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();

    }, [status, session]);





    // fetching all products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const allProducts = await axios.get<ApiResponse>('/api/get-products')
                const productData = allProducts.data.data as IProduct[]
                setProducts(productData)
            } catch (error) {
                console.error("Error fetching products:", error)
            }
        }
        fetchProducts()
    }, [orders])



    // Ecommerce user
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const allUsers = await axios.get<ApiResponse>('/api/get-all-users')
                const userData = allUsers.data.data as []
                setEcommerceUser(userData.length.toString())
                setEcommerceUserData(userData)

            } catch (error) {
                console.error("Error fetching users:", error)
            }
        }

        fetchUsers()
    }, [])


    // getting username
    const fetchUsername = (id: any) => {
        const user = ecommerceUserData.find((data) => data._id === id);
        return user ? user.userName : 'User not found'; // Handle case if user is not found
    };





    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Filtered users based on search term
    const filteredOrders = orders.filter(
        (order) =>
            order.razorpayOrderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            fetchUsername(order.userId).toLowerCase().includes(searchTerm.toLowerCase())

    );



    //   pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

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
                <title>Admin </title>
                <meta name="description" content="This is the admin page." />
            </Head>

            <div className="sm:container p-1 sm:mx-auto sm:px-6 my-16 sm:py-16">
                <h1 className="text-3xl font-bold leading-tight mb-4">Buy Orders</h1>

                {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                    </>
                ) : (


                    <div className="p-8 bg-white border-t-4 border-green-700 rounded-xl shadow-xl">
                        {/* Search Input */}
                        <div className="mb-8">
                            <input
                                type="text"
                                placeholder="Search by id or customer"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="px-5 py-3 border border-gray-400 rounded-md w-full focus:outline-none focus:ring-4 focus:ring-[#80a382] focus:border-transparent shadow-lg transition duration-300 ease-in-out text-gray-700"
                            />
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto scrollbar-hide">
                            <table className="min-w-full bg-white rounded-xl shadow-lg overflow-hidden">

                                <thead >
                                    <tr className="bg-green-700 text-white">

                                        <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wide">Order ID</th>
                                        <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wide">Razorpay Order Id</th>
                                        <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wide">Customer</th>
                                        <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wide">Date</th>
                                        <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wide">Status</th>
                                        <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wide">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentOrders.map((order, index) => (

                                        <tr
                                            key={order._id?.toString()}
                                  className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-50'} hover:bg-gray-200 transition duration-200`}
                                        
                                        >
                                            <td className="px-6 py-4">{order._id?.toString()}</td>
                                            <td className="px-6 py-4">{order.razorpayOrderId}</td>
                                            <td className="px-6 py-4">{fetchUsername(order.userId)}</td>
                                            <td className="px-6 py-4">
                                                {new Date(order.createdAt).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </td>
                                            {/* <td className="px-6 py-4 text-green-500">{order.paymentStatus}</td> */}
                                            <td className="px-6 py-4 text-green-500">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${order.paymentStatus === 'completed'
                                                            ? 'bg-green-200 text-green-800'
                                                            : 'bg-red-200 text-red-800'
                                                        }`}
                                                >
                                                {order.paymentStatus}
                                                </span>
                                                </td>
                                            <td className="px-6 py-4">{order.totalAmount}</td>
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
                                className={`px-6 py-2 rounded-full shadow-md font-semibold text-lg ${currentPage === 1
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
                                className={`px-6 py-2 rounded-full shadow-md font-semibold text-lg ${currentPage === totalPages
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

        </>
    );
};

export default Page;
