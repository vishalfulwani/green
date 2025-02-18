'use client'

import AdditionalProducts from '@/components/AdditionalProducts';
import Breadcrumb from '@/components/BreadCrumb';
import { ApiResponse } from '@/helpers/ApiResponse';
import { IProduct } from '@/models/product.models';
import { useWishlist } from '@/wishlist/useWishlist';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { ImBin2 } from "react-icons/im";

const Page = () => {
  const { wishlist, removeProductFromWishlist } = useWishlist(); // Get wishlist IDs and remove function
  const [wishlistProducts, setWishlistProducts] = useState<IProduct[]>([]); // To store the products data
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();


  // Fetch the wishlist products based on IDs
  useEffect(() => {
    const fetchWishlistProducts = async () => {
      if (wishlist.length === 0) return; // No need to fetch if wishlist is empty
      setIsLoading(true);

      try {
        const response = await axios.get<ApiResponse>('/api/get-products');
        const allProducts = response.data.data as IProduct[];

        // Filter products that are in the wishlist
        const filteredProducts = allProducts.filter((product) =>
          wishlist.includes(product._id.toString())
        );
        setWishlistProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWishlistProducts();
  }, [wishlist]);


  const handleProductClick = (category: string, id: string) => {
    // router.push(`/shop/${productCategory}/${productId}`);
    if (category && id) {
      router.push(`/shop/${category}/${id}`);
  } else {
      console.error("Invalid category or id");
  }
};

const breadcrumbItems = [
  { label: 'Home', href: '/get-involved' },
  // { label: 'Shop', href: '/shop' },
  { label: 'Wishlist', href: '/wishlist' },
];

  return (
    <div className="min-h-screen mt-16 bg-gray-100   py-14 ">
    <div className='md:container'>

    <Breadcrumb items={breadcrumbItems} />

    <h1 className="text-2xl font-bold mb-1 text-green-800 text-center">Your Wishlist</h1>
    
  
    {isLoading ? (
      <p className="text-center text-lg">Loading wishlist...</p>
    ) : wishlistProducts.length === 0 ? (
      <>
      {/* <p className="text-center pb-16 px-4 text-base md:text-lg">Your wishlist is looking a bit bare! ✨ Check out the fantastic items below and start curating your dream list!</p> */}
      <div className="flex flex-col items-center justify-center text-center py-4">
  <h2 className="text-xl font-semibold text-gray-800">Your wishlist is currently empty</h2>
  <p className="text-gray-500 mt-2">
    Looks like you haven't added any products to your wishlist yet. Explore our store and start adding your favorite items!
  </p>
  <button
    onClick={() => window.location.href = '/get-involved'}  // Redirect to homepage
    className="mt-6 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
  >
    Go to Homepage
  </button>
</div>

      </>
    ) : (
      <>
      <p className=" text-base sm:text-lg sm:px-10 px-2 text-gray-700 max-w-3xl mx-auto mb-10 text-center">
            Keep track of all your must-have items, so you're always just a step away from your next favorite purchase.
            </p>
            {/* <div className="flex gap-2"> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

      {wishlistProducts.map((product) => (
        <>
        <div
          key={product._id.toString()}
          className="wishlist-item xs:w-72 sm:w-80 px-4 my-5 bg-white rounded-lg shadow-md hover:shadow-2xl   relative border-t-4 border-green-600 overflow-hidden transform hover:-translate-y-1 sm:hover:scale-105 transition-transform duration-300"
        >
          <div className="relative overflow-hidden">
            <img
              src={product.images[0]}
              alt={product.productName}
              className="wishlist-item-image w-full h-48 object-contain rounded-t-lg hover:opacity-90 transition-opacity duration-300"
            />
            <div className="absolute top-2 right-2 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
              Best Seller
            </div>
           
          </div>
    
          <div className="p-4 text-left">
            <h2 className="text-xl font-semibold text-green-900 mb-2 hover:text-green-600 transition-colors duration-300">
              {product.productName}
            </h2>
            <p className="text-lg text-green-700 font-bold mb-4">
              ${product.sellingPrice}
            </p>
            <button
              onClick={() => handleProductClick(product.category, product._id.toString())}
              className="read-more-button bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 w-full text-white text-sm font-semibold py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              View
            </button>
            <button
              onClick={() => removeProductFromWishlist(product._id.toString())}
              className="remove-button bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 w-full text-white text-sm font-semibold py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 mt-2"
            >
              Remove 
            </button>
          </div>
        </div>
        </>
      ))}
            </div>



{/* <div className="overflow-x-auto border-t-2 border-green-700">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead className="bg-gray-200 text-black text-center">
            <tr>
              <th className="p-4 border border-gray-200 ">Image</th>
              <th className="p-4 border border-gray-200 ">Product</th>
              <th className="p-4 border border-gray-200 ">Price</th>
              <th className="p-4 border border-gray-200 ">View</th>
              <th className="p-4 border border-gray-200 ">Delete</th>
            </tr>
          </thead>
          <tbody>
          {wishlistProducts.map((product) => (
              <tr    key={product._id.toString()} className="text-center bg-white">
                <td className="p-4 border border-gray-200">
                  <img
                    src={product.images[0]}
                    alt={product.productName}
                    className="w-16 h-16 object-cover mx-auto"
                  />
                </td>
                <td className="p-4 border border-gray-200">{product.productName}</td>
                <td className="p-4 border border-gray-200">{product.sellingPrice}</td>
                <td className="p-4 border border-gray-200">
                  <button className="bg-green-700 text-white py-1 px-4 rounded-sm hover:text-white hover:bg-green-800"
                      onClick={() => handleProductClick(product.category, product._id.toString())}
                  >
                    View
                  </button>
                </td>
                <td className="p-4 border border-gray-200">
                  <button className="text-red-500 lg:text-2xl hover:text-red-700"
                        onClick={() => removeProductFromWishlist(product._id.toString())}
                  >
                    <ImBin2/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      
    </div> */}


    </>
    
    )}
  </div>
  </div>

  
  );
};

export default Page;
