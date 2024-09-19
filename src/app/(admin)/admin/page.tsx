'use client'

import Image from 'next/image';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { FaDollarSign, FaLeaf, FaRegChartBar, FaShoppingCart, FaUsers } from 'react-icons/fa';
import { LineChart } from 'lucide-react';
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
  



  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Revenue',
        data: [3000, 4500, 3200, 5000, 6200, 7100, 8000],
        borderColor: 'rgba(34, 197, 94, 1)', // green color
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Admin </title>
        <meta name="description" content="This is the admin page." />
      </Head>

      <div className="p-4 min-h-screen mt-16">


        <section className="">





          <div className="flex-1 p-6 space-y-6">
            <header className="mb-8">
              <h1 className="text-3xl font-semibold text-gray-800">Dashboard Overview</h1>
            </header>
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Sales Card */}
                <div className="col-span-2 md:col-span-1">
                  <div className="card info-card sales-card p-4 bg-white shadow rounded-lg">

                    <div className="card-body w-auto">
                      <h5 className="card-title text-xl font-semibold">Welcome To the Dashboard</h5>
                      <div className="profile-card flex items-center mt-4">
                        <Image
                          src="/img/profile-img.jpg"
                          alt="Profile"
                          className="rounded-full"
                          width={50}
                          height={50}
                        />
                        <div className="ml-4">
                          <h4 className="font-bold text-blue-800">{userName}</h4>
                          <h5 className="text-sm text-gray-500">Web Designer</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


              </div>
            </div>

            {/* Dashboard Cards */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
                <FaLeaf className="text-green-700 text-4xl mr-4" />
                <div>
                  <h2 className="text-lg font-semibold text-gray-700">Total Products</h2>
                  <p className="text-2xl font-bold text-gray-800">{products.length}</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
                <FaShoppingCart className="text-green-700 text-4xl mr-4" />
                <div>
                  <h2 className="text-lg font-semibold text-gray-700">Total Sales</h2>
                  <p className="text-2xl font-bold text-gray-800">$45,000</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
                <FaUsers className="text-green-700 text-4xl mr-4" />
                <div>
                  <h2 className="text-lg font-semibold text-gray-700">Foundation Users</h2>
                  <p className="text-2xl font-bold text-gray-800">{foundationUser}</p>
                  {/* <h2 className="text-lg font-semibold text-gray-700">Ecommerce Users</h2>
                  <p className="text-2xl font-bold text-gray-800">{orders.length}</p> */}
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
                {/* <FaDollarSign className="text-green-700 text-4xl mr-4" /> */}
                <FaUsers className="text-green-700 text-4xl mr-4" />

                <div>
                  <h2 className="text-lg font-semibold text-gray-700">Ecommerce Users</h2>
                  <p className="text-2xl font-bold text-gray-800">{ecommerceUser}</p>
                </div>
              </div>
            </section>

            {/* Line Chart Section */}
            {/* <section className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Revenue Trend</h2>
        <Line data={data} />
      </section> */}

            {/* Recent Orders Section */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Orders</h2>
              <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                <table className="min-w-full">
                  <thead className="bg-gray-100 text-left">
                    <tr>
                      <th className="px-6 py-3 text-gray-600">Order ID</th>
                      <th className="px-6 py-3 text-gray-600">Razorpay Order Id</th>
                      <th className="px-6 py-3 text-gray-600">Customer</th>
                      <th className="px-6 py-3 text-gray-600">Date</th>
                      <th className="px-6 py-3 text-gray-600">Status</th>
                      <th className="px-6 py-3 text-gray-600">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (

                      <tr className="border-b">
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
                        <td className="px-6 py-4 text-green-500">{order.paymentStatus}</td>
                        <td className="px-6 py-4">{order.totalAmount}</td>
                      </tr>
                    ))}
                    {/* Add more rows as needed */}
                  </tbody>
                </table>
              </div>
            </section>

            {/* User Activity Section */}
            <section className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">User Activity</h2>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FaRegChartBar className="text-green-700 text-3xl mr-4" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">Active Users</h3>
                    <p className="text-2xl font-bold text-gray-800">320</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaUsers className="text-green-700 text-3xl mr-4" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
                    <p className="text-2xl font-bold text-gray-800">1,500</p>
                  </div>
                </div>
              </div>
            </section>
          </div>





        </section>
      </ div>
    </>
  );
};

export default Page;
