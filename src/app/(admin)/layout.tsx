'use client';

import AdminNavbar from "@/components/AdminNavbar";
import { Toaster } from "@/components/ui/toaster";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MdDashboard } from "react-icons/md";
import { FaTable } from "react-icons/fa";
import { FaBoxOpen } from "react-icons/fa";
import { SiGithubsponsors } from "react-icons/si";
import { MdShoppingCart } from "react-icons/md";
import { FaDonate } from "react-icons/fa";
import { MdOutlineFoundation } from "react-icons/md";
import { FaShop } from "react-icons/fa6";
import { GiFountain } from "react-icons/gi";
import { GiHamburgerMenu } from "react-icons/gi";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sideMargin, setSideMargin] = useState('ml-0')
  const [rightbarOpen, setRightbarOpen] = useState(false)
  const [subPartOpen, setSubPartOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    if (sidebarOpen) {
      setSideMargin('ml-0')
    } else {
      setSideMargin('ml-60')
    }
  };
  const toggleRightSidebar = () => {
    setRightbarOpen(!rightbarOpen)
  }

  // Used in left menu
  const toggleSubPart = () => {
    setSubPartOpen(!subPartOpen)
  }

  return (
    <>
      <header id="header" className="fixed top-0 w-full flex px-6 py-2 items-center bg-green-800 text-white shadow-md z-50">
        <div className="flex items-center w-full pr-4">
          <Link href="/">
            <div className="flex items-center">
             <h1 className="text-2xl font-bold ">Green Foundation</h1>
            </div>
          </Link>
          <button onClick={toggleSidebar} className="2xl ml-2 focus:outline-none">
            <GiHamburgerMenu size={24}/>
          </button>
        </div>

        <nav className="ml-auto py-4">
          <ul className="flex items-center space-x-4">
            <li className="relative">
              <Link href="#">
                <div className="flex items-center" onClick={toggleRightSidebar}>
                  <Image src="/img/profile-img.jpg" alt="Profile" className="rounded-full" width={30} height={30} />
                  <span className="ml-2 hidden md:inline-block">Admin</span>
                </div>
              </Link>
              <ul className={` absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-md transform ${rightbarOpen ? 'block' : 'hidden'} transition-transform duration-200 ease-in-out`}>
                <li className="px-4 py-2 border-b">
                  <h6 className="text-lg text-center font-medium">Admin</h6>
                </li>
                <li>
                  <Link href="/users-profile">
                    <div className="flex items-center px-4 py-2">
                      <i className="bi bi-person mr-2"></i>
                      <span>My Profile</span>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href="/faq">
                    <div className="flex items-center px-4 py-2">
                      <i className="bi bi-question-circle mr-2"></i>
                      <span>Need Help?</span>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <div className="flex items-center px-4 py-2">
                      <i className="bi bi-box-arrow-right mr-2"></i>
                      <span>Sign Out</span>
                    </div>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </header>


{/* side bar */}
      <div className={`fixed top-0 pt-20 left-0 w-64 bg-green-800 text-white h-full shadow-md transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-200 ease-in-out `}>
        <ul className=" py-4">
          <li>
            <Link href="/">
              <div className="flex px-4 py-2 gap-2 items-center  hover:bg-green-900">
                <MdDashboard />
                <span>Dashboard</span>
              </div>
            </Link>
          </li>

          <li>
            <div className="flex px-4 py-2 gap-2 items-center  hover:bg-green-900" onClick={toggleSubPart}>
              <FaTable />
              <span>User Data</span>
            </div>
            <ul className={` ${subPartOpen ? "visible" : "hidden"}`}>
              <li>
                <Link href="/tables-data/foundation-user-data">
                  <div className="flex pl-10 pr-4 py-2 gap-2 items-center  hover:bg-green-900">
                    <GiFountain/>
                    <span>Foundation</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/admin-ecommerce-user">
                  <div className="flex pl-10 pr-4 py-2 gap-2 items-center  hover:bg-green-900">
                    <FaShop/>
                    <span>E-commerce</span>
                  </div>
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link href="/admin-products">
              <div className="flex px-4 py-2 gap-2 items-center  hover:bg-green-900">
                <FaBoxOpen />
                <span>Product</span>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/admin-sponsors">
              <div className="flex px-4 py-2 gap-2 items-center  hover:bg-green-900">
                <SiGithubsponsors />
                <span>Sponsor</span>
              </div>
            </Link>
          </li>
          <li >
            <Link href="/register">
              <div className="flex px-4 py-2 gap-2 items-center hover:bg-green-900">
                <MdShoppingCart />
                <span>Buyed Data</span>
              </div>
            </Link>
          </li>
          <li >
            <Link href="/login">
              <div className="flex px-4 py-2 gap-2  items-center hover:bg-green-900">
                <FaDonate />
                <span>Donate</span>
              </div>
            </Link>
          </li>
        </ul>
      </div>

      <main  className={`min-h-screen p-4 bg-[#accbb7] ${sideMargin}`}>
        {children}
      </main>
    </>
  );
}
