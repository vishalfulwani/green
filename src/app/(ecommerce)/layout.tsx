
'use client'

import { store } from "@/cartRedux/store";
import { Provider } from 'react-redux';
import EcommerceNavbar from "@/components/EcommerceNavbar";
import { Toaster } from "@/components/ui/toaster";
import EcommerceFooter from "@/components/EcommerceFooter";
import type { Metadata } from 'next';

// Optional metadata if using on pages that support it
// export const metadata: Metadata = {
//   title: 'Green E-commerce',
//   description: 'Your one-stop shop for sustainable plants, seeds, and tools to nurture a greener world',
// };

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Provider store={store}>
      {/* Wrapping with Provider to manage the Redux state */}
      <div lang="en">
        <EcommerceNavbar />
        {children}
        <EcommerceFooter />
        <Toaster />
      </div>
    </Provider>
  );
};

export default RootLayout;
