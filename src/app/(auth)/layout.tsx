import FoundationNavbar from "@/components/FoundationNavbar"
import Navbar from "@/components/FoundationNavbar"

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Auth',
  description: 'Welcome to Auth',
}

  
  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
    
      <div lang="en">

      {/* <Navbar/> */}
      {/* <FoundationNavbar/> */}
      {children}
      </div>
    )
  }
  