'use client'

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


  const handleProductClick = (productCategory: any, productId: any) => {
    router.push(`/shop/${productCategory}/${productId}`);
};

  return (
    <div className="min-h-screen bg-[#9cc09c]   px-4 py-8">
    <div className='container'>

    <h1 className="text-3xl font-bold text-center mb-8">Your Wishlist</h1>
  
    {isLoading ? (
      <p className="text-center text-lg">Loading wishlist...</p>
    ) : wishlistProducts.length === 0 ? (
      <p className="text-center text-lg">Your wishlist is empty.</p>
    ) : (
      <div className="wishlist-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlistProducts.map((product) => (
          <div
            key={product.id}
            className="wishlist-item bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 relative"
          >
            <img
              src={product.images[0]}
              alt={product.productName}
              className="wishlist-item-image w-full h-40 object-cover rounded-t-md"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{product.productName}</h2>
              <p className="text-lg text-green-600 font-bold mb-4">${product.sellingPrice}</p>
              <button
                // onClick={() => removeFromWishlist(product._id.toString())}
                onClick={() => handleProductClick(product.category, product._id)}
                className="remove-button bg-green-600 hover:bg-green-700 mb-2 text-white text-sm font-semibold py-2 px-4 rounded-full transition-colors duration-300"
              >
                Read more
              </button>
              <button
                onClick={() => removeFromWishlist(product._id.toString())}
                className="remove-button bg-red-600 hover:bg-red-700 text-white text-sm font-semibold py-2 px-4 rounded-full transition-colors duration-300"
              >
                Remove from Wishlist
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
  </div>

  
  );
};

export default Page;
