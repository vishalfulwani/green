// 'use client'

// import { store } from "@/cartRedux/store"
// import { Provider } from 'react-redux';
// import EcommerceNavbar from "@/components/EcommerceNavbar"
// import { Toaster } from "@/components/ui/toaster"
// import EcommerceFooter from "@/components/EcommerceFooter";

// import dynamic from "next/dynamic";

// // const EcommerceNavbar = dynamic(()=>import("../../components/EcommerceNavbar"),{
// //   ssr:false
// // })
// // const EcommerceFooter = dynamic(()=>import("../../components/EcommerceFooter"),{
// //   ssr:false
// // })

// import type { Metadata } from 'next'

// // export const metadata: Metadata = {
// //   title: 'Green E-commerce',
// //   description: 'Your one-stop shop for sustainable plants, seeds, and tools to nurture a greener world',
// // }


// const ClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   return <Provider store={store}>{children}</Provider>;
// };
  
//   export default function RootLayout({
//     children,
//   }: {
//     children: React.ReactNode
//   }) {
//     return (
//       <Provider store={store}>
//       <html lang="en">
//         <body>
//           {/* <ClientProvider> */}

//             {/* <EcommerceNavbar/>  */}
//             {children}
//             {/* <EcommerceFooter/> */}
//         <Toaster/>
//           {/* </ClientProvider> */}
//         </body>
//       </html>
//       </Provider>
//     )
//   }
  

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
