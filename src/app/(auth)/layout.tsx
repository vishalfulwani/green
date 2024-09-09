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
      <html lang="en">
        <body>
      {/* <Navbar/> */}
      {children}</body>
      </html>
    )
  }
  