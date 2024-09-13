// 'use client '

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
      <html lang="en">
        <body>
            {/* <AdminNavbar/> */}
            <FoundationNavbar/>
            {children}
        <Toaster/>
        </body>
      </html>
    )
  }
  