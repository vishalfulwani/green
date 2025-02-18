'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRecentlyViewed } from '@/viewedRecently/useRecentlyViewed';
import axios from 'axios';
import { ApiResponse } from '@/helpers/ApiResponse';
import { IProduct } from './ProductCard';
import WishlistButton from "./wishlistButton"; // Adjust the import path as needed
import Rating from './Rating';


const RecentlyViewed = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { recentlyViewed } = useRecentlyViewed(); // Destructure to get the recently viewed product IDs

  useEffect(() => {
    const fetchProducts = async () => {
      setIsSubmitting(true);
      try {
        const allProducts = await axios.get<ApiResponse>('/api/get-products');
        console.log("Fetched all products:", allProducts);
        const productData = allProducts.data.data as IProduct[];
        const recentlyViewedProducts = productData.filter((product) =>
          recentlyViewed.includes(product._id.toString())
        );
        // Set the products only after the fetch is complete
        setProducts(recentlyViewedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsSubmitting(false);
      }
    };

    // Ensure fetchProducts runs only when recentlyViewed is updated
    if (recentlyViewed.length > 0) {
      fetchProducts();
    }
  }, [recentlyViewed]); // Only re-run the effect when recentlyViewed changes

  if (isSubmitting) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (products.length === 0) {
    return <p className="text-center text-gray-500">No recently viewed items.</p>;
  }

  return (
    <section className="recently-viewed-section py-28 bg-transparent">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">Recently Viewed Products</h2>
        <p className="text-center text-base md:text-lg lg:text-xl mt-2 mb-8 md:mb-12">
          Here are the products you've recently checked out. Take another look and make your decision!
        </p>
      </div>

      <div className="container recently-viewed grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4">
        {products.map((product) => (
          <div
            key={product._id.toString()}
            className="product-card border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105 bg-white overflow-hidden"
          >
            <div className="relative">
              <img
                src={product.images[0]}
                alt={product.productName}
                className="h-64 w-full object-contain"
              />
                   <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold py-1 px-3 rounded-full shadow-lg">
            {product.sellingPrice && product.price
              ? `${Math.round(((parseInt(product.price) - parseInt(product.sellingPrice)) / parseInt(product.price)) * 100)}% OFF`
              : "Best Seller"}
          </div>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 text-center">{product.productName}</h3>
              {/* <p className="text-gray-600 mt-2">Price: <span className="font-bold text-green-600">${product.price}</span></p> */}
              <div className="flex justify-center items-center mb-4">
            <span className="text-lg font-bold text-green-700 mr-2">
            ₹{product.sellingPrice}
            </span>
            <span className="text-sm line-through text-gray-500">
            ₹{product.price}
            </span>
          </div>
          <div className="flex justify-center items-center text-gray-500">
            <Rating rating={parseFloat(product.rating)} />
          </div>

              <div className='flex justify-between mt-0 items-center'>
              <Link
                href={`/shop/${product.category}/${product._id}`}
                className=" text-lg font-semibold inline-block text-green-600 hover:underline transition"
                >
                View
              </Link>
            <WishlistButton productId={product._id.toString()} />
                  </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentlyViewed;
