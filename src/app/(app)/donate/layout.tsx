

import FoundationNavbar from "@/components/FoundationNavbar"
import { Toaster } from "@/components/ui/toaster"

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Donate',
  description: 'Donate to our Green Foundation',
}

  
  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div lang="en">
        <div>
            {/* <AdminNavbar/> */}
            {/* <FoundationNavbar/> */}
            {children}
        <Toaster/>
        </div>
      </div>
    )
  }
  