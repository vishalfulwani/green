'use client'

import AdditionalProducts from '@/components/AdditionalProducts';
import { ApiResponse } from '@/helpers/ApiResponse';
import { IProduct } from '@/models/product.models';
import { useWishlist } from '@/wishlist/useWishlist';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const { wishlist, removeFromWishlist } = useWishlist(); // Get wishlist IDs and remove function
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

  return (
    <div className="min-h-screen mt-16 bg-gray-200   py-12 md:py-14">
    <div className='md:container'>

    <h1 className=" text-2xl sm:text-3xl font-bold text-center px-4 mb-2">Your Wishlist</h1>
    
  
    {isLoading ? (
      <p className="text-center text-lg">Loading wishlist...</p>
    ) : wishlistProducts.length === 0 ? (
      <>
      <p className="text-center pb-8 px-4 text-base md:text-lg">Your wishlist is looking a bit bare! ✨ Check out the fantastic items below and start curating your dream list!</p>
      <AdditionalProducts/>
      </>
    ) : (
      <>
      <p className=" text-base sm:text-lg text-gray-700 max-w-3xl mx-auto mb-10 text-center">
            Keep track of all your must-have items, so you're always just a step away from your next favorite purchase.
            </p>
      <div className=" grid grid-cols-1 mt-8 pt-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {wishlistProducts.map((product) => (
        <div
          key={product.id}
          className="wishlist-item bg-white rounded-lg shadow-md hover:shadow-2xl   relative border-t-4 border-green-600 overflow-hidden transform hover:-translate-y-1 hover:scale-105 transition-transform duration-300"
        >
          <div className="relative overflow-hidden">
            <img
              src={product.images[0]}
              alt={product.productName}
              className="wishlist-item-image w-full h-48 object-cover rounded-t-lg hover:opacity-90 transition-opacity duration-300"
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
              Read more
            </button>
            <button
              onClick={() => removeFromWishlist(product._id.toString())}
              className="remove-button bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 w-full text-white text-sm font-semibold py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 mt-2"
            >
              Remove from Wishlist
            </button>
          </div>
        </div>
      ))}
    </div>
    </>
    
    )}
  </div>
  </div>

  
  );
};

export default Page;
