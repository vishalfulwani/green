'use client'

import Image from 'next/image';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { FaDollarSign, FaLeaf, FaRegChartBar, FaShoppingCart, FaUsers } from 'react-icons/fa';
import { LineChart } from 'lucide-react';

const Page = () => {
  const { data: session } = useSession()
  let userName;
  if (session) {
    userName = session.user?.userName
  }

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
            <p className="text-2xl font-bold text-gray-800">320</p>
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
            <h2 className="text-lg font-semibold text-gray-700">New Users</h2>
            <p className="text-2xl font-bold text-gray-800">1,200</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
          <FaDollarSign className="text-green-700 text-4xl mr-4" />
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Revenue Growth</h2>
            <p className="text-2xl font-bold text-gray-800">15%</p>
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
                <th className="px-6 py-3 text-gray-600">Customer</th>
                <th className="px-6 py-3 text-gray-600">Date</th>
                <th className="px-6 py-3 text-gray-600">Status</th>
                <th className="px-6 py-3 text-gray-600">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-6 py-4">12345</td>
                <td className="px-6 py-4">John Doe</td>
                <td className="px-6 py-4">Aug 28, 2024</td>
                <td className="px-6 py-4 text-green-500">Completed</td>
                <td className="px-6 py-4">$250</td>
              </tr>
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
